import serviceService from '../services/service.service.js';
import { uploadToCloudinary } from '../services/upload.service.js';
import ApiResponse from '../common/ApiResponse.js';
import ApiError from '../common/ApiError.js';

const getAll = async (req, res, next) => {
  try {
    const list = await serviceService.getAll(req.query);
    res.status(200).json(new ApiResponse(200, list, 'Services retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const item = await serviceService.getById(req.params.id);
    if (!item) throw new ApiError(404, 'Service not found');
    res.status(200).json(new ApiResponse(200, item, 'Service retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      payload.imageUrl = result.secure_url;
      payload.public_id = result.public_id;
    } else {
      throw new ApiError(400, 'Image is required for services');
    }
    const item = await serviceService.create(payload);
    res.status(201).json(new ApiResponse(201, item, 'Service created successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      payload.imageUrl = result.secure_url;
      payload.public_id = result.public_id;
    }
    const item = await serviceService.update(req.params.id, payload);
    res.status(200).json(new ApiResponse(200, item, 'Service updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await serviceService.remove(req.params.id);
    if (!item) throw new ApiError(404, 'Service not found');
    res.status(200).json(new ApiResponse(200, null, 'Service deleted successfully'));
  } catch (error) {
    next(error);
  }
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
