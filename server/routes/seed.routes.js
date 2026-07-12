const express = require('express');
const router = express.Router();
const seedData = require('../seed/seed.js');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const ApiResponse = require('../common/ApiResponse');

router.post('/', verifyJWT, verifyAdmin, async (req, res, next) => {
  try {
    await seedData();
    res.status(200).json(new ApiResponse(200, null, 'Database seeded successfully'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
