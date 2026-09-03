const Gallery = require('../models/Gallery');
const { uploadFromBuffer, deleteAsset, hasCloudinaryConfig } = require('../config/cloudinary');

const resolveImage = async (file) => {
  if (!file) return null;
  if (file.path) return { url: file.path, publicId: file.filename };
  if (file.buffer && hasCloudinaryConfig) return uploadFromBuffer(file.buffer, 'cliff-perkins/gallery');
  return null;
};

// @desc  Get gallery items (public)
// @route GET /api/gallery
const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const items = await Gallery.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// @desc  Create gallery item(s) (admin, multi-image upload)
// @route POST /api/gallery
const createGalleryItem = async (req, res, next) => {
  try {
    const files = req.files && req.files.length ? req.files : req.file ? [req.file] : [];

    if (!files.length) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    const body = req.body;
    const created = [];

    for (const file of files) {
      const image = await resolveImage(file);
      const item = await Gallery.create({
        image: image || undefined,
        title: body.title,
        caption: body.caption,
        category: body.category,
        featured: body.featured === 'true' || body.featured === true,
        displayOrder: body.displayOrder || 0,
      });
      created.push(item);
    }

    res.status(201).json({ success: true, data: created.length === 1 ? created[0] : created });
  } catch (error) {
    next(error);
  }
};

// @desc  Update gallery item (admin)
// @route PUT /api/gallery/:id
const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    const body = req.body;
    if (body.title !== undefined) item.title = body.title;
    if (body.caption !== undefined) item.caption = body.caption;
    if (body.category !== undefined) item.category = body.category;
    if (body.featured !== undefined) item.featured = body.featured === 'true' || body.featured === true;
    if (body.displayOrder !== undefined) item.displayOrder = body.displayOrder;

    const file = req.file || (req.files && req.files[0]);
    if (file) {
      const newImage = await resolveImage(file);
      if (newImage) {
        if (item.image && item.image.publicId) await deleteAsset(item.image.publicId);
        item.image = newImage;
      }
    }

    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete gallery item (admin)
// @route DELETE /api/gallery/:id
const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    if (item.image && item.image.publicId) await deleteAsset(item.image.publicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem };
