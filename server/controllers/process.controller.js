import processService from '../services/process.service.js';
import { uploadToCloudinary } from '../services/upload.service.js';
import ApiResponse from '../common/ApiResponse.js';
import ApiError from '../common/ApiError.js';

const getAll = async (req, res, next) => {
  try {
    const list = await processService.getAll(req.query);
    res.status(200).json(new ApiResponse(200, list, 'Processes retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const item = await processService.getById(req.params.id);
    if (!item) throw new ApiError(404, 'Process not found');
    res.status(200).json(new ApiResponse(200, item, 'Process retrieved successfully'));
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
        const item = await processService.create(itemPayload);
        createdItems.push(item);
      }
      const responseData = createdItems.length === 1 ? createdItems[0] : createdItems;
      res.status(201).json(new ApiResponse(201, responseData, 'Process created successfully'));
    } else {
      const item = await processService.create(payload);
      res.status(201).json(new ApiResponse(201, item, 'Process created successfully'));
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const current = await processService.getById(req.params.id);
    if (!current) throw new ApiError(404, 'Process not found');

    const files = req.files || (req.file ? [req.file] : []);
    if (files.length > 0) {
      const file = files[0];
      const resourceType = req.body.resourceType || current.resourceType || (file.mimetype.startsWith('video/') ? 'video' : 'image');
      const result = await uploadToCloudinary(file.buffer, resourceType);
      payload.mediaUrl = result.secure_url;
      payload.public_id = result.public_id;
      payload.resourceType = resourceType;
    }

    const item = await processService.update(req.params.id, payload);
    res.status(200).json(new ApiResponse(200, item, 'Process updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await processService.remove(req.params.id);
    if (!item) throw new ApiError(404, 'Process not found');
    res.status(200).json(new ApiResponse(200, null, 'Process deleted successfully'));
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
