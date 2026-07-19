import multer from 'multer';
import ApiError from '../common/ApiError.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only images and videos are supported.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

export default upload;
