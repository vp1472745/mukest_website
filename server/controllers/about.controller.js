import aboutService from '../services/about.service.js';
import { uploadToCloudinary } from '../services/upload.service.js';
import ApiResponse from '../common/ApiResponse.js';

const get = async (req, res, next) => {
  try {
    const data = await aboutService.get();
    res.status(200).json(new ApiResponse(200, data, 'About retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        const imageResult = await uploadToCloudinary(req.files.image[0].buffer);
        payload.imageUrl = imageResult.secure_url;
        payload.image_public_id = imageResult.public_id;
      }
      if (req.files.banner && req.files.banner[0]) {
        const bannerResult = await uploadToCloudinary(req.files.banner[0].buffer);
        payload.bannerUrl = bannerResult.secure_url;
        payload.banner_public_id = bannerResult.public_id;
      }
    }

    const data = await aboutService.update(payload);
    res.status(200).json(new ApiResponse(200, data, 'About updated successfully'));
  } catch (error) {
    next(error);
  }
};

export {

  get,
  update

};
export default {

  get,
  update

};
