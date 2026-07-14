import Category from '../models/Category.js';
import { deleteFromCloudinary } from './upload.service.js';

const getAll = async (query = {}) => {
  return await Category.find(query).sort({ displayOrder: 1 });
};

const getById = async (id) => {
  return await Category.findById(id);
};

const create = async (data) => {
  return await Category.create(data);
};

const update = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  const category = await Category.findById(id);
  if (!category) return null;
  if (category.public_id) {
    await deleteFromCloudinary(category.public_id);
  }
  return await Category.findByIdAndDelete(id);
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
