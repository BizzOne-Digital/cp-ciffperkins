const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary, hasCloudinaryConfig } = require('../config/cloudinary');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

/**
 * Create a multer uploader instance targeting a specific Cloudinary folder.
 * Falls back to in-memory storage (no Cloudinary persistence) when Cloudinary
 * env vars are missing, so the server can still boot and accept requests
 * during local review. In that case controllers should use req.file.buffer
 * with config/cloudinary.uploadFromBuffer, or simply skip persisting the file.
 */
const createUploader = (folderName = 'cliff-perkins') => {
  let storage;

  if (hasCloudinaryConfig) {
    storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: folderName,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      },
    });
  } else {
    storage = multer.memoryStorage();
  }

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter,
  });
};

// Default reusable uploader (generic folder), for routes that don't need a
// custom folder name.
const upload = createUploader('cliff-perkins');

/**
 * Uploader for the generic /api/upload endpoint where the target folder is
 * decided per-request (via body.folder or query.folder).
 */
const dynamicUpload = (() => {
  let storage;
  if (hasCloudinaryConfig) {
    storage = new CloudinaryStorage({
      cloudinary,
      params: (req) => ({
        folder: (req.body && req.body.folder) || (req.query && req.query.folder) || 'cliff-perkins/misc',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      }),
    });
  } else {
    storage = multer.memoryStorage();
  }
  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter });
})();

module.exports = { upload, createUploader, dynamicUpload };
