import Standard from '../models/Standard.js';

const getAll = async (query = {}) => {
  return await Standard.find(query).sort({ displayOrder: 1 });
};

const getById = async (id) => {
  return await Standard.findById(id);
};

const create = async (data) => {
  return await Standard.create(data);
};

const update = async (id, data) => {
  return await Standard.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  return await Standard.findByIdAndDelete(id);
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
