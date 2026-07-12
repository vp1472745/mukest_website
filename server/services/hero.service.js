const Hero = require('../models/Hero');
const { deleteFromCloudinary } = require('./upload.service');

const getAll = async (query = {}) => {
  return await Hero.find(query).sort({ sliderOrder: 1 });
};

const getById = async (id) => {
  return await Hero.findById(id);
};

const create = async (data) => {
  return await Hero.create(data);
};

const update = async (id, data) => {
  return await Hero.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  const hero = await Hero.findById(id);
  if (!hero) return null;
  
  if (hero.public_id) {
    await deleteFromCloudinary(hero.public_id, hero.resourceType || 'image');
  }
  return await Hero.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
