const express = require('express');
const router = express.Router();
const {
  getTimeline,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
} = require('../controllers/timelineController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const { createUploader } = require('../middleware/uploadMiddleware');

const uploadTimelineImage = createUploader('cliff-perkins/timeline');

router.get('/', getTimeline);
router.post('/', protectAdmin, uploadTimelineImage.single('image'), createTimelineItem);
router.put('/:id', protectAdmin, uploadTimelineImage.single('image'), updateTimelineItem);
router.delete('/:id', protectAdmin, deleteTimelineItem);

module.exports = router;
