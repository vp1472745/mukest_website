import cloudinary from '../config/cloudinary.js';

const uploadToCloudinary = (fileBuffer, resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: 'mukest_website'
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export {
 uploadToCloudinary, deleteFromCloudinary 
};
export default {
 uploadToCloudinary, deleteFromCloudinary 
};
