const Seo = require('../models/Seo');

const getByPage = async (page = 'global') => {
  let seo = await Seo.findOne({ page });
  if (!seo) {
    seo = await Seo.create({
      page,
      metaTitle: 'LensCraft - Premium Wedding Photography & Planning',
      metaDescription: 'Capturing and planning stories that last a lifetime.'
    });
  }
  return seo;
};

const update = async (page, data) => {
  const seo = await getByPage(page);
  return await Seo.findByIdAndUpdate(seo._id, data, { new: true, runValidators: true });
};

const getAll = async () => {
  return await Seo.find({});
};

module.exports = {
  getByPage,
  update,
  getAll
};
