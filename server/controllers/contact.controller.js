const contactService = require('../services/contact.service');
const ApiResponse = require('../common/ApiResponse');

const get = async (req, res, next) => {
  try {
    const data = await contactService.get();
    res.status(200).json(new ApiResponse(200, data, 'Contact retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await contactService.update(req.body);
    res.status(200).json(new ApiResponse(200, data, 'Contact updated successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  update
};
