const Testimonial = require('../models/Testimonial');
const { uploadFromBuffer, deleteAsset, hasCloudinaryConfig } = require('../config/cloudinary');

const resolveImage = async (file) => {
  if (!file) return null;
  if (file.path) return { url: file.path, publicId: file.filename };
  if (file.buffer && hasCloudinaryConfig) return uploadFromBuffer(file.buffer, 'cliff-perkins/testimonials');
  return null;
};

// @desc  Get testimonials (public: active only)
// @route GET /api/testimonials
const getTestimonials = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { active: true };
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// @desc  Create testimonial (admin)
// @route POST /api/testimonials
const createTestimonial = async (req, res, next) => {
  try {
    const { name, role, review, rating, active } = req.body;
    if (!name || !review) {
      return res.status(400).json({ success: false, message: 'Name and review are required' });
    }

    const uploadedPhoto = await resolveImage(req.file);
    const photo = uploadedPhoto || (req.body.photo ? { url: req.body.photo, publicId: '' } : undefined);

    const testimonial = await Testimonial.create({
      name,
      role,
      review,
      photo,
      rating: rating || 5,
      active: active !== undefined ? active === 'true' || active === true : true,
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc  Update testimonial (admin)
// @route PUT /api/testimonials/:id
const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });

    const { name, role, review, rating, active } = req.body;
    if (name !== undefined) testimonial.name = name;
    if (role !== undefined) testimonial.role = role;
    if (review !== undefined) testimonial.review = review;
    if (rating !== undefined) testimonial.rating = rating;
    if (active !== undefined) testimonial.active = active === 'true' || active === true;

    if (req.file) {
      const newPhoto = await resolveImage(req.file);
      if (newPhoto) {
        if (testimonial.photo && testimonial.photo.publicId) await deleteAsset(testimonial.photo.publicId);
        testimonial.photo = newPhoto;
      }
    } else if (req.body.photo !== undefined && req.body.photo !== testimonial.photo?.url) {
      if (testimonial.photo && testimonial.photo.publicId) await deleteAsset(testimonial.photo.publicId);
      testimonial.photo = req.body.photo ? { url: req.body.photo, publicId: '' } : { url: '', publicId: '' };
    }

    await testimonial.save();
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete testimonial (admin)
// @route DELETE /api/testimonials/:id
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    if (testimonial.photo && testimonial.photo.publicId) await deleteAsset(testimonial.photo.publicId);
    await testimonial.deleteOne();
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
