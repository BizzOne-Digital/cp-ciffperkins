const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const { contactReceived } = require('../utils/emailTemplates');

// @desc  Create contact message (public)
// @route POST /api/contact
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });

    // Awaited (not fire-and-forget): on serverless platforms the function
    // execution can be frozen the instant the response is sent, which would
    // otherwise kill these sends and their log writes mid-flight.
    const emailTasks = [
      sendEmail({
        to: email,
        subject: 'We received your message',
        html: contactReceived({ name }),
      }).catch((err) => console.error('contact ack email failed:', err.message)),
    ];

    if (process.env.ADMIN_EMAIL) {
      emailTasks.push(
        sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Contact Message: ${subject || 'General Inquiry'}`,
          html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Phone:</strong> ${phone || '-'}</p><p>${message}</p>`,
        }).catch((err) => console.error('contact admin email failed:', err.message))
      );
    }

    await Promise.allSettled(emailTasks);

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all contacts (admin)
// @route GET /api/contact
const getContacts = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
};

// @desc  Mark contact as read (admin)
// @route PUT /api/contact/:id/read
const markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }
    contact.status = 'Read';
    await contact.save();
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete contact (admin)
// @route DELETE /api/contact/:id
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }
    await contact.deleteOne();
    res.json({ success: true, message: 'Contact message deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createContact, getContacts, markContactRead, deleteContact };
