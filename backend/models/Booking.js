const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    organization: { type: String, trim: true },
    eventType: {
      type: String,
      enum: [
        'Concert / Live Performance',
        'Speaking Engagement',
        'Book Signing',
        'Private Event',
        'Corporate Event',
        'Community Event',
        'Other',
      ],
      required: true,
    },
    eventDate: { type: Date },
    preferredTime: { type: String, trim: true },
    venueName: { type: String, trim: true },
    venueAddress: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    audienceSize: { type: String, trim: true },
    budgetRange: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    notes: [
      {
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

bookingSchema.index({ status: 1 });
bookingSchema.index({ email: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
