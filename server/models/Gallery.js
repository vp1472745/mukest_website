import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    images: [
      {
        secure_url: String,
        public_id: String
      }
    ],
    // Primary fallback image for simpler integrations
    imageUrl: String,
    public_id: String,
    videoUrl: String,
    category: {
      type: String, // String category ID or name matching Categories
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    paragraph: String,
    date: String,
    location: String,
    featured: {
      type: Boolean,
      default: false
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

export default mongoose.model('Gallery', gallerySchema);
