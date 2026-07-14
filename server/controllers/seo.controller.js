import seoService from '../services/seo.service.js';
import ApiResponse from '../common/ApiResponse.js';
import ApiError from '../common/ApiError.js';

const getByPage = async (req, res, next) => {
  try {
    const page = req.query.page || 'global';
    const data = await seoService.getByPage(page);
    res.status(200).json(new ApiResponse(200, data, `SEO retrieved for ${page}`));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const page = req.body.page || 'global';
    const data = await seoService.update(page, req.body);
    res.status(200).json(new ApiResponse(200, data, `SEO updated for ${page}`));
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const list = await seoService.getAll();
    res.status(200).json(new ApiResponse(200, list, 'All SEO list retrieved'));
  } catch (error) {
    next(error);
  }
};

export {

  getByPage,
  update,
  getAll

};
export default {

  getByPage,
  update,
  getAll

};
