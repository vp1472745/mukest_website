import Testimonial from '../models/Testimonial.js';
import { deleteFromCloudinary } from './upload.service.js';

const getAll = async (query = {}) => {
  return await Testimonial.find(query).sort({ displayOrder: 1 });
};

const getById = async (id) => {
  return await Testimonial.findById(id);
};

const create = async (data) => {
  return await Testimonial.create(data);
};

const update = async (id, data) => {
  return await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  const item = await Testimonial.findById(id);
  if (!item) return null;
  if (item.public_id) {
    await deleteFromCloudinary(item.public_id);
  }
  return await Testimonial.findByIdAndDelete(id);
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
