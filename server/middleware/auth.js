import jwt from 'jsonwebtoken';
import ApiError from '../common/ApiError.js';
import User from '../models/User.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(401, 'Unauthorized request. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error.message || 'Invalid Access Token'));
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'Admin') {
    return next(new ApiError(403, 'Access denied. Administrator privileges required.'));
  }
  next();
};
