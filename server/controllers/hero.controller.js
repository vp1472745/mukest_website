const heroService = require('../services/hero.service');
const { uploadToCloudinary } = require('../services/upload.service');
const ApiResponse = require('../common/ApiResponse');
const ApiError = require('../common/ApiError');

const getAll = async (req, res, next) => {
  try {
    const list = await heroService.getAll(req.query);
    res.status(200).json(new ApiResponse(200, list, 'Sliders retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const item = await heroService.getById(req.params.id);
    if (!item) throw new ApiError(404, 'Slider not found');
    res.status(200).json(new ApiResponse(200, item, 'Slider retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    
    if (req.file) {
      const resourceType = req.body.resourceType || 'image';
      const result = await uploadToCloudinary(req.file.buffer, resourceType);
      payload.mediaUrl = result.secure_url;
      payload.public_id = result.public_id;
    } else {
      throw new ApiError(400, 'Media file is required');
    }

    const item = await heroService.create(payload);
    res.status(201).json(new ApiResponse(201, item, 'Slider created successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const current = await heroService.getById(req.params.id);
    if (!current) throw new ApiError(404, 'Slider not found');

    if (req.file) {
      const resourceType = req.body.resourceType || current.resourceType || 'image';
      const result = await uploadToCloudinary(req.file.buffer, resourceType);
      payload.mediaUrl = result.secure_url;
      payload.public_id = result.public_id;
    }

    const item = await heroService.update(req.params.id, payload);
    res.status(200).json(new ApiResponse(200, item, 'Slider updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await heroService.remove(req.params.id);
    if (!item) throw new ApiError(404, 'Slider not found');
    res.status(200).json(new ApiResponse(200, null, 'Slider deleted successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
