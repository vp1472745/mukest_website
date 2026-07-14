import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      default: 'global',
      unique: true
    },
    metaTitle: {
      type: String,
      required: true
    },
    metaDescription: {
      type: String,
      required: true
    },
    keywords: {
      type: String, // Comma-separated list of keywords
      default: ''
    }
  },
  { timestamps: true }
);

export default mongoose.model('Seo', seoSchema);
