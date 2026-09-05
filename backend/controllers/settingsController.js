const SiteSettings = require('../models/SiteSettings');

// @desc  Get site settings (public safe subset)
// @route GET /api/settings
const getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.getSingleton();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc  Update site settings (admin)
// @route PUT /api/settings
const updateSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.getSingleton();
    const body = req.body;

    const fields = [
      'businessName',
      'email',
      'phone',
      'amazonStoreUrl',
      'cdBabyUrl',
      'websiteUrl',
      'facebook',
      'instagram',
      'youtube',
      'spotify',
    ];
    fields.forEach((field) => {
      if (body[field] !== undefined) settings[field] = body[field];
    });

    if (body.seo) {
      settings.seo = { ...settings.seo.toObject(), ...body.seo };
    }

    await settings.save();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings };
