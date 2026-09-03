const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

siteContentSchema.statics.getByKey = function (key) {
  return this.findOne({ key });
};

siteContentSchema.statics.upsert = function (key, data) {
  return this.findOneAndUpdate(
    { key },
    { key, data },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

module.exports = mongoose.model('SiteContent', siteContentSchema);
