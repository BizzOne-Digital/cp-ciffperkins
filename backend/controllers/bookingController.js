const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');
const {
  bookingConfirmationCustomer,
  bookingNotificationAdmin,
  bookingStatusUpdate,
} = require('../utils/emailTemplates');

// @desc  Create booking (public)
// @route POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const body = req.body;
    const required = ['firstName', 'lastName', 'email', 'eventType'];
    for (const field of required) {
      if (!body[field]) {
        return res.status(400).json({ success: false, message: `${field} is required` });
      }
    }

    const booking = await Booking.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      organization: body.organization,
      eventType: body.eventType,
      eventDate: body.eventDate,
      preferredTime: body.preferredTime,
      venueName: body.venueName,
      venueAddress: body.venueAddress,
      city: body.city,
      state: body.state,
      audienceSize: body.audienceSize,
      budgetRange: body.budgetRange,
      message: body.message,
      user: req.user ? req.user._id : undefined,
    });

    sendEmail({
      to: booking.email,
      subject: 'Booking Request Received',
      html: bookingConfirmationCustomer(booking),
    }).catch((err) => console.error('booking confirmation email failed:', err.message));

    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Booking Request',
        html: bookingNotificationAdmin(booking),
      }).catch((err) => console.error('booking admin notification failed:', err.message));
    }

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all bookings (admin, filters by status/search)
// @route GET /api/bookings
const getBookings = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } },
      ];
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// @desc  Get bookings for logged-in customer
// @route GET /api/bookings/mine
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      $or: [{ user: req.user._id }, { email: req.user.email }],
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single booking
// @route GET /api/bookings/:id
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc  Update booking status (admin)
// @route PUT /api/bookings/:id/status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    sendEmail({
      to: booking.email,
      subject: 'Booking Status Update',
      html: bookingStatusUpdate(booking),
    }).catch((err) => console.error('booking status email failed:', err.message));

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc  Add note to booking (admin)
// @route POST /api/bookings/:id/notes
const addBookingNote = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.notes.push({ text });
    await booking.save();

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete booking (admin)
// @route DELETE /api/bookings/:id
const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    await booking.deleteOne();
    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  addBookingNote,
  deleteBooking,
};
