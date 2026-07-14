import Service from '../models/Service.js';
import { deleteFromCloudinary } from './upload.service.js';

const getAll = async (query = {}) => {
  return await Service.find(query).sort({ displayOrder: 1 });
};

const getById = async (id) => {
  return await Service.findById(id);
};

const create = async (data) => {
  return await Service.create(data);
};

const update = async (id, data) => {
  return await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  const service = await Service.findById(id);
  if (!service) return null;
  if (service.public_id) {
    await deleteFromCloudinary(service.public_id);
  }
  return await Service.findByIdAndDelete(id);
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
