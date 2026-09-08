const nodemailer = require('nodemailer');

// Lazily required to avoid a require-cycle at module load time.
const logEmail = async (entry) => {
  try {
    const EmailLog = require('../models/EmailLog');
    await EmailLog.create(entry);
  } catch (err) {
    // Never let logging itself break email sending.
    console.error('EmailLog write failed:', err.message);
  }
};

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_APP_PASSWORD) {
    console.warn('Email env vars not fully set — emails will be logged to console instead of sent.');
    transporter = null;
    return null;
  }

  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  return transporter;
};

/**
 * Send an email. Falls back to console logging if transporter isn't configured
 * so the app never crashes in dev/review environments.
 */
const sendMail = async ({ to, subject, html }) => {
  const t = getTransporter();

  if (!t) {
    console.log('--- [DEV EMAIL FALLBACK] ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('----------------------------');
    await logEmail({ to, subject, status: 'skipped', error: 'Email not configured' });
    return { fallback: true };
  }

  try {
    const info = await t.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log(`Email sent -> ${to} | "${subject}" | id: ${info.messageId}`);
    await logEmail({ to, subject, status: 'sent', messageId: info.messageId || '' });
    return info;
  } catch (error) {
    console.error(`Email FAILED -> ${to} | "${subject}" | ${error.message}`);
    await logEmail({ to, subject, status: 'failed', error: error.message });
    throw error;
  }
};

module.exports = { sendMail, getTransporter };
