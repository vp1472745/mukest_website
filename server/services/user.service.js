const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ApiError = require('../common/ApiError');

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user: { _id: user._id, email: user.email, role: user.role }, token };
};

const updateProfile = async (id, data) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (data.email) user.email = data.email;
  if (data.password) user.password = data.password;

  await user.save();
  return { _id: user._id, email: user.email, role: user.role };
};

module.exports = {
  login,
  updateProfile
};
