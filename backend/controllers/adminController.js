const Product = require('../models/Product');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Gallery = require('../models/Gallery');

// @desc  Get dashboard stats (admin)
// @route GET /api/admin/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalBooks,
      totalCds,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalCustomers,
      totalMessages,
      newMessages,
      totalGalleryImages,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ type: 'book' }),
      Product.countDocuments({ type: 'cd' }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'Pending' }),
      Booking.countDocuments({ status: 'Confirmed' }),
      User.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'New' }),
      Gallery.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        products: { total: totalProducts, books: totalBooks, cds: totalCds },
        bookings: { total: totalBookings, pending: pendingBookings, confirmed: confirmedBookings },
        customers: totalCustomers,
        messages: { total: totalMessages, new: newMessages },
        galleryImages: totalGalleryImages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRecentBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

const getRecentMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

// @desc  Combined dashboard: stats + recent bookings + recent messages
// @route GET /api/admin/dashboard
const getDashboard = async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalBooks,
      totalCds,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalCustomers,
      totalMessages,
      newMessages,
      totalGalleryImages,
      recentBookings,
      recentMessages,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ type: 'book' }),
      Product.countDocuments({ type: 'cd' }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'Pending' }),
      Booking.countDocuments({ status: 'Confirmed' }),
      User.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'New' }),
      Gallery.countDocuments(),
      Booking.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          products: { total: totalProducts, books: totalBooks, cds: totalCds },
          bookings: { total: totalBookings, pending: pendingBookings, confirmed: confirmedBookings },
          customers: totalCustomers,
          messages: { total: totalMessages, new: newMessages },
          galleryImages: totalGalleryImages,
        },
        recentBookings,
        recentMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc  List customers (admin)
// @route GET /api/admin/customers
const getCustomers = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }
    const customers = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats, getRecentBookings, getRecentMessages, getDashboard, getCustomers };
