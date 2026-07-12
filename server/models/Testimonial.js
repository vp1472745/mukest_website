const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    imageUrl: String,
    public_id: String,
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    review: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
