const ProcessModel = require('../models/Process');
const { deleteFromCloudinary } = require('./upload.service');

const getAll = async (query = {}) => {
  return await ProcessModel.find(query).sort({ stepNumber: 1 });
};

const getById = async (id) => {
  return await ProcessModel.findById(id);
};

const create = async (data) => {
  return await ProcessModel.create(data);
};

const update = async (id, data) => {
  return await ProcessModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  const item = await ProcessModel.findById(id);
  if (!item) return null;
  if (item.public_id) {
    await deleteFromCloudinary(item.public_id, item.resourceType || 'image');
  }
  return await ProcessModel.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
