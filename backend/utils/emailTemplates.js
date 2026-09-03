// Branded HTML email templates for Cliff Perkins.
// Palette: brown #4B1F0E, gold #C58A32, cream #F8F2E8

const COLORS = {
  brown: '#4B1F0E',
  gold: '#C58A32',
  cream: '#F8F2E8',
};

const layout = (title, bodyHtml) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLORS.cream}; font-family: Georgia, 'Times New Roman', serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream}; padding: 24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            <tr>
              <td style="background-color:${COLORS.brown}; padding: 28px 32px;">
                <h1 style="margin:0; color:${COLORS.gold}; font-size:24px; letter-spacing:1px;">Cliff Perkins</h1>
                <p style="margin:4px 0 0; color:${COLORS.cream}; font-size:13px; opacity:0.85;">Author &amp; Musician</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px; color:${COLORS.brown}; font-size:15px; line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLORS.cream}; padding: 18px 32px; text-align:center; font-size:12px; color:#8a7a6a;">
                &copy; ${new Date().getFullYear()} Cliff Perkins. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const button = (url, text) => `
  <a href="${url}" style="display:inline-block; margin-top:16px; padding:12px 28px; background-color:${COLORS.gold}; color:#ffffff; text-decoration:none; border-radius:4px; font-weight:bold;">${text}</a>
`;

const contactReceived = ({ name }) =>
  layout(
    'We received your message',
    `
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to Cliff Perkins. We've received your message and will get back to you as soon as possible.</p>
    <p style="margin-top:24px;">Warm regards,<br/>The Cliff Perkins Team</p>
  `
  );

const bookingConfirmationCustomer = ({ firstName, eventType, eventDate }) =>
  layout(
    'Booking Request Received',
    `
    <p>Hi ${firstName},</p>
    <p>Thank you for submitting a booking request for <strong>${eventType}</strong>${
      eventDate ? ` on <strong>${new Date(eventDate).toLocaleDateString()}</strong>` : ''
    }.</p>
    <p>Our team will review your request and reach out within 1-2 business days to confirm details.</p>
    <p style="margin-top:24px;">Warm regards,<br/>The Cliff Perkins Team</p>
  `
  );

const bookingNotificationAdmin = ({ firstName, lastName, email, phone, eventType, eventDate, city, state, message }) =>
  layout(
    'New Booking Request',
    `
    <p>A new booking request has been submitted.</p>
    <table style="width:100%; border-collapse:collapse; margin-top:12px;">
      <tr><td style="padding:6px 0; font-weight:bold;">Name:</td><td>${firstName} ${lastName}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Email:</td><td>${email}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Phone:</td><td>${phone || '-'}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Event Type:</td><td>${eventType}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Event Date:</td><td>${eventDate ? new Date(eventDate).toLocaleDateString() : '-'}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Location:</td><td>${city || '-'}, ${state || '-'}</td></tr>
    </table>
    <p style="margin-top:16px;"><strong>Message:</strong><br/>${message || '-'}</p>
  `
  );

const bookingStatusUpdate = ({ firstName, status, eventType }) =>
  layout(
    'Booking Status Update',
    `
    <p>Hi ${firstName},</p>
    <p>Your booking request for <strong>${eventType}</strong> has been updated to: <strong>${status}</strong>.</p>
    <p>If you have any questions, feel free to reply to this email.</p>
    <p style="margin-top:24px;">Warm regards,<br/>The Cliff Perkins Team</p>
  `
  );

const welcomeCustomer = ({ name }) =>
  layout(
    'Welcome to Cliff Perkins',
    `
    <p>Hi ${name},</p>
    <p>Welcome! Your account has been created successfully. Explore the latest books, music, and upcoming events.</p>
    <p style="margin-top:24px;">Warm regards,<br/>The Cliff Perkins Team</p>
  `
  );

const passwordReset = ({ name, resetUrl }) =>
  layout(
    'Reset Your Password',
    `
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Click the button below to choose a new password. This link expires in 30 minutes.</p>
    ${button(resetUrl, 'Reset Password')}
    <p style="margin-top:24px; font-size:13px; color:#8a7a6a;">If you did not request this, you can safely ignore this email.</p>
  `
  );

module.exports = {
  contactReceived,
  bookingConfirmationCustomer,
  bookingNotificationAdmin,
  bookingStatusUpdate,
  welcomeCustomer,
  passwordReset,
};
