import heroService from '../services/hero.service.js';
import { uploadToCloudinary } from '../services/upload.service.js';
import ApiResponse from '../common/ApiResponse.js';
import ApiError from '../common/ApiError.js';

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
    const files = req.files || (req.file ? [req.file] : []);
    
    if (files.length > 0) {
      const createdItems = [];
      for (const file of files) {
        const resourceType = req.body.resourceType || (file.mimetype.startsWith('video/') ? 'video' : 'image');
        const result = await uploadToCloudinary(file.buffer, resourceType);
        const itemPayload = {
          ...payload,
          mediaUrl: result.secure_url,
          public_id: result.public_id,
          resourceType
        };
        const item = await heroService.create(itemPayload);
        createdItems.push(item);
      }
      const responseData = createdItems.length === 1 ? createdItems[0] : createdItems;
      res.status(201).json(new ApiResponse(201, responseData, 'Slider created successfully'));
    } else {
      throw new ApiError(400, 'Media file is required');
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const current = await heroService.getById(req.params.id);
    if (!current) throw new ApiError(404, 'Slider not found');

    const files = req.files || (req.file ? [req.file] : []);
    if (files.length > 0) {
      const file = files[0];
      const resourceType = req.body.resourceType || current.resourceType || (file.mimetype.startsWith('video/') ? 'video' : 'image');
      const result = await uploadToCloudinary(file.buffer, resourceType);
      payload.mediaUrl = result.secure_url;
      payload.public_id = result.public_id;
      payload.resourceType = resourceType;
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
