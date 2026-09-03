const cloudinary = require('cloudinary').v2;

const hasCloudinaryConfig =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo';

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('Cloudinary env vars not fully set — uploads will use memory fallback (no persistence).');
}

/**
 * Upload a buffer (from multer memoryStorage) to Cloudinary.
 * @param {Buffer} buffer
 * @param {string} folder
 * @returns {Promise<{url: string, publicId: string}>}
 */
const uploadFromBuffer = (buffer, folder = 'cliff-perkins') => {
  return new Promise((resolve, reject) => {
    if (!hasCloudinaryConfig) {
      return reject(new Error('Cloudinary is not configured.'));
    }
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

/**
 * Delete an asset from Cloudinary by its public id.
 * @param {string} publicId
 */
const deleteAsset = async (publicId) => {
  if (!publicId || !hasCloudinaryConfig) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
    return null;
  }
};

module.exports = { cloudinary, uploadFromBuffer, deleteAsset, hasCloudinaryConfig };
