const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const { createUploader } = require('../middleware/uploadMiddleware');

const uploadTestimonialPhoto = createUploader('cliff-perkins/testimonials');

router.get('/', getTestimonials);
router.post('/', protectAdmin, uploadTestimonialPhoto.single('photo'), createTestimonial);
router.put('/:id', protectAdmin, uploadTestimonialPhoto.single('photo'), updateTestimonial);
router.delete('/:id', protectAdmin, deleteTestimonial);

module.exports = router;
