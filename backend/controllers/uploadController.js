const { uploadFromBuffer, hasCloudinaryConfig } = require('../config/cloudinary');

// @desc  Generic ad-hoc single file upload (admin)
// @route POST /api/upload
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    if (req.file.path) {
      return res.json({ success: true, data: { url: req.file.path, publicId: req.file.filename } });
    }

    if (req.file.buffer && hasCloudinaryConfig) {
      const folder = req.body.folder || req.query.folder || 'cliff-perkins/misc';
      const result = await uploadFromBuffer(req.file.buffer, folder);
      return res.json({ success: true, data: result });
    }

    return res.status(503).json({
      success: false,
      message: 'Cloudinary is not configured; file could not be persisted.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };
