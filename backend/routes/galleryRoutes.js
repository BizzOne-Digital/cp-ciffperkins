const express = require('express');
const router = express.Router();
const {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const { createUploader } = require('../middleware/uploadMiddleware');

const uploadGalleryImages = createUploader('cliff-perkins/gallery');

router.get('/', getGallery);
router.post('/', protectAdmin, uploadGalleryImages.array('images', 20), createGalleryItem);
router.put('/:id', protectAdmin, uploadGalleryImages.single('image'), updateGalleryItem);
router.delete('/:id', protectAdmin, deleteGalleryItem);

module.exports = router;
