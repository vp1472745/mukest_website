import galleryService from '../services/gallery.service.js';
import { uploadToCloudinary } from '../services/upload.service.js';
import ApiResponse from '../common/ApiResponse.js';
import ApiError from '../common/ApiError.js';

const getAll = async (req, res, next) => {
  try {
    const list = await galleryService.getAll(req.query);
    res.status(200).json(new ApiResponse(200, list, 'Gallery items retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const item = await galleryService.getById(req.params.id);
    if (!item) throw new ApiError(404, 'Gallery item not found');
    res.status(200).json(new ApiResponse(200, item, 'Gallery item retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    payload.images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        payload.images.push({
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      }
      payload.imageUrl = payload.images[0].secure_url;
      payload.public_id = payload.images[0].public_id;
    }

    const item = await galleryService.create(payload);
    res.status(201).json(new ApiResponse(201, item, 'Gallery item created successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const current = await galleryService.getById(req.params.id);
    if (!current) throw new ApiError(404, 'Gallery item not found');

    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        newImages.push({
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      }
      payload.images = newImages;
      payload.imageUrl = newImages[0].secure_url;
      payload.public_id = newImages[0].public_id;
    }

    const item = await galleryService.update(req.params.id, payload);
    res.status(200).json(new ApiResponse(200, item, 'Gallery item updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await galleryService.remove(req.params.id);
    if (!item) throw new ApiError(404, 'Gallery item not found');
    res.status(200).json(new ApiResponse(200, null, 'Gallery item deleted successfully'));
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
