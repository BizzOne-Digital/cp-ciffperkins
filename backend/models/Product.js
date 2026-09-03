const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: { type: String, enum: ['book', 'cd'], required: true },
    category: { type: String, trim: true },
    shortDescription: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, default: 0 },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    gallery: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    externalUrl: { type: String, trim: true },
    amazonUrl: { type: String, trim: true },
    cdBabyUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ type: 1, active: 1 });

module.exports = mongoose.model('Product', productSchema);
