const SiteContent = require('../models/SiteContent');

// @desc  Get content by key (public)
// @route GET /api/content/:key
const getContent = async (req, res, next) => {
  try {
    const content = await SiteContent.getByKey(req.params.key);
    if (!content) {
      return res.json({ success: true, data: null });
    }
    res.json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all content entries (admin)
// @route GET /api/content
const getAllContent = async (req, res, next) => {
  try {
    const content = await SiteContent.find().sort({ key: 1 });
    res.json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

// @desc  Upsert content by key (admin)
// @route PUT /api/content/:key
const upsertContent = async (req, res, next) => {
  try {
    const data = req.body;
    const content = await SiteContent.upsert(req.params.key, data);
    res.json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContent, getAllContent, upsertContent };
