const Timeline = require('../models/Timeline');
const { uploadFromBuffer, deleteAsset, hasCloudinaryConfig } = require('../config/cloudinary');

const resolveImage = async (file) => {
  if (!file) return null;
  if (file.path) return { url: file.path, publicId: file.filename };
  if (file.buffer && hasCloudinaryConfig) return uploadFromBuffer(file.buffer, 'cliff-perkins/timeline');
  return null;
};

// @desc  Get timeline (public, sorted by displayOrder/year)
// @route GET /api/timeline
const getTimeline = async (req, res, next) => {
  try {
    const items = await Timeline.find().sort({ displayOrder: 1, year: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// @desc  Create timeline item (admin)
// @route POST /api/timeline
const createTimelineItem = async (req, res, next) => {
  try {
    const { year, title, description, category, displayOrder } = req.body;
    if (!year || !title) {
      return res.status(400).json({ success: false, message: 'Year and title are required' });
    }

    const uploadedImage = await resolveImage(req.file);
    const image = uploadedImage || (req.body.image ? { url: req.body.image, publicId: '' } : undefined);

    const item = await Timeline.create({
      year,
      title,
      description,
      category,
      image,
      displayOrder: displayOrder || 0,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// @desc  Update timeline item (admin)
// @route PUT /api/timeline/:id
const updateTimelineItem = async (req, res, next) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Timeline item not found' });

    const { year, title, description, category, displayOrder } = req.body;
    if (year !== undefined) item.year = year;
    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description;
    if (category !== undefined) item.category = category;
    if (displayOrder !== undefined) item.displayOrder = displayOrder;

    if (req.file) {
      const newImage = await resolveImage(req.file);
      if (newImage) {
        if (item.image && item.image.publicId) await deleteAsset(item.image.publicId);
        item.image = newImage;
      }
    } else if (req.body.image !== undefined && req.body.image !== item.image?.url) {
      if (item.image && item.image.publicId) await deleteAsset(item.image.publicId);
      item.image = req.body.image ? { url: req.body.image, publicId: '' } : { url: '', publicId: '' };
    }

    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete timeline item (admin)
// @route DELETE /api/timeline/:id
const deleteTimelineItem = async (req, res, next) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Timeline item not found' });
    if (item.image && item.image.publicId) await deleteAsset(item.image.publicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Timeline item deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTimeline, createTimelineItem, updateTimelineItem, deleteTimelineItem };
