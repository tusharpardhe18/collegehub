import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['events', 'noticeboard', 'exchange', 'requests'],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    posterUrl: { type: String, default: '' }, // Event image
    location: { type: String, default: '' },  // Location or venue
    price: { type: String, default: '' },     // ₹499 onwards
    date: { type: String, default: '' },      // e.g., "Sat, 5 Jul"
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
