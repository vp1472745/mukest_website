import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    googleMap: String,
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);
