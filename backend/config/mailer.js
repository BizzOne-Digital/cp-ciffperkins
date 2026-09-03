const nodemailer = require('nodemailer');

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
    return { fallback: true };
  }

  try {
    const info = await t.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error('sendMail error:', error.message);
    throw error;
  }
};

module.exports = { sendMail, getTransporter };
