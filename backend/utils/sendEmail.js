const { sendMail } = require('../config/mailer');

/**
 * Thin wrapper around config/mailer.sendMail so controllers have a stable
 * import path under utils/.
 */
const sendEmail = async ({ to, subject, html }) => {
  return sendMail({ to, subject, html });
};

module.exports = sendEmail;
