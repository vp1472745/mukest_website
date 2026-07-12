const mongoose = require('mongoose');

const processSchema = new mongoose.Schema(
  {
    mediaUrl: String,
    public_id: String,
    resourceType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    stepNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    paragraph: {
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

module.exports = mongoose.model('Process', processSchema);
