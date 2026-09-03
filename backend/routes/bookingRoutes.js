const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  addBookingNote,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { protectAdmin } = require('../middleware/adminMiddleware');

router.post('/', createBooking);
router.get('/', protectAdmin, getBookings);
router.get('/mine', protect, getMyBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', protectAdmin, updateBookingStatus);
router.post('/:id/notes', protectAdmin, addBookingNote);
router.delete('/:id', protectAdmin, deleteBooking);

module.exports = router;
