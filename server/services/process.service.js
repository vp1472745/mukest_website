import ProcessModel from '../models/Process.js';
import { deleteFromCloudinary } from './upload.service.js';

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

export {

  getAll,
  getById,
  create,
  update,
  remove

};
export default {

  getAll,
  getById,
  create,
  update,
  remove

};
