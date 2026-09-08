const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, default: '' },
    status: { type: String, enum: ['sent', 'failed', 'skipped'], required: true },
    error: { type: String, default: '' },
    messageId: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmailLog', emailLogSchema);
