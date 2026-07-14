import Contact from '../models/Contact.js';

const get = async () => {
  let contact = await Contact.findOne();
  if (!contact) {
    contact = await Contact.create({
      address: '102, Gold Coast Avenue, Sector 5, Gurugram, Haryana - 122001',
      email: 'hello@lenscraftstudio.com',
      phone: '+1 (234) 567-890'
    });
  }
  return contact;
};

const update = async (data) => {
  const contact = await get();
  return await Contact.findByIdAndUpdate(contact._id, data, { new: true, runValidators: true });
};

export {

  get,
  update

};
export default {

  get,
  update

};
