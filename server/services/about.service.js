import About from '../models/About.js';
import { deleteFromCloudinary } from './upload.service.js';

const get = async () => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({
      title: 'LensCraft Studio',
      paragraph: 'Premium luxury wedding photography and planning services.'
    });
  }
  return about;
};

const update = async (data) => {
  const about = await get();
  
  if (data.image_public_id && about.image_public_id && data.image_public_id !== about.image_public_id) {
    await deleteFromCloudinary(about.image_public_id);
  }
  if (data.banner_public_id && about.banner_public_id && data.banner_public_id !== about.banner_public_id) {
    await deleteFromCloudinary(about.banner_public_id);
  }

  return await About.findByIdAndUpdate(about._id, data, { new: true, runValidators: true });
};

export {

  get,
  update

};
export default {

  get,
  update

};
