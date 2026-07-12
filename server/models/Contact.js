const mongoose = require('mongoose');

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

module.exports = mongoose.model('Contact', contactSchema);
