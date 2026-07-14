import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema(
  {
    mediaUrl: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    },
    resourceType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    paragraph: String,
    primaryButtonText: String,
    primaryButtonLink: String,
    secondaryButtonText: String,
    secondaryButtonLink: String,
    backgroundOverlay: {
      type: Number, // Opacity value, e.g. 0.65
      default: 0.65
    },
    sliderOrder: {
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

export default mongoose.model('Hero', heroSchema);
