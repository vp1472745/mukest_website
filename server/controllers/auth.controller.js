import userService from '../services/user.service.js';
import ApiResponse from '../common/ApiResponse.js';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await userService.login(email, password);
    res.status(200).json(new ApiResponse(200, data, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const data = await userService.updateProfile(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, data, 'Profile updated successfully'));
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.status(200).json(new ApiResponse(200, req.user, 'Profile retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export {

  login,
  updateProfile,
  getProfile

};
export default {

  login,
  updateProfile,
  getProfile

};
