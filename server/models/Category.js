const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      default: 'Camera'
    },
    imageUrl: String,
    public_id: String,
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    description: String,
    displayOrder: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
