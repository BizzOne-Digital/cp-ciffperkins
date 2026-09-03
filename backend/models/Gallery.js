const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, default: '' },
    },
    title: { type: String, trim: true },
    caption: { type: String, trim: true },
    category: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
