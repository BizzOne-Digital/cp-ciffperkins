const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Cliff Perkins' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    amazonStoreUrl: { type: String, default: '' },
    cdBabyUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    spotify: { type: String, default: '' },
    seo: {
      siteTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: { type: String, default: '' },
      ogImage: { type: String, default: '' },
      favicon: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

siteSettingsSchema.statics.getSingleton = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
