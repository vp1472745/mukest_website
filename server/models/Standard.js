import mongoose from 'mongoose';

const standardSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      default: 'Heart'
    },
    title: {
      type: String,
      required: true
    },
    description: {
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

export default mongoose.model('Standard', standardSchema);
