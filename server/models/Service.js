import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    },
    icon: String,
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

export default mongoose.model('Service', serviceSchema);
