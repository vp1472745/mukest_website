const standardService = require('../services/standard.service');
const ApiResponse = require('../common/ApiResponse');
const ApiError = require('../common/ApiError');

const getAll = async (req, res, next) => {
  try {
    const list = await standardService.getAll(req.query);
    res.status(200).json(new ApiResponse(200, list, 'Studio standards retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const item = await standardService.getById(req.params.id);
    if (!item) throw new ApiError(404, 'Standard not found');
    res.status(200).json(new ApiResponse(200, item, 'Standard retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const item = await standardService.create(req.body);
    res.status(201).json(new ApiResponse(201, item, 'Standard created successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const item = await standardService.update(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, item, 'Standard updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await standardService.remove(req.params.id);
    if (!item) throw new ApiError(404, 'Standard not found');
    res.status(200).json(new ApiResponse(200, null, 'Standard deleted successfully'));
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
