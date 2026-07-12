const Gallery = require('../models/Gallery');
const { deleteFromCloudinary } = require('./upload.service');

const getAll = async (query = {}) => {
  return await Gallery.find(query).sort({ displayOrder: 1 });
};

const getById = async (id) => {
  return await Gallery.findById(id);
};

const create = async (data) => {
  return await Gallery.create(data);
};

const update = async (id, data) => {
  return await Gallery.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  const item = await Gallery.findById(id);
  if (!item) return null;
  
  if (item.images && item.images.length > 0) {
    for (const image of item.images) {
      if (image.public_id) {
        await deleteFromCloudinary(image.public_id);
      }
    }
  }
  return await Gallery.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
