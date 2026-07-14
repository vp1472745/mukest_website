import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    bannerUrl: String,
    banner_public_id: String,
    imageUrl: String,
    image_public_id: String,
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
    }
  },
  { timestamps: true }
);

export default mongoose.model('About', aboutSchema);
