import express from 'express';
const router = express.Router();
import seedData from '../seed/seed.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import ApiResponse from '../common/ApiResponse.js';

router.post('/', verifyJWT, verifyAdmin, async (req, res, next) => {
  try {
    await seedData();
    res.status(200).json(new ApiResponse(200, null, 'Database seeded successfully'));
  } catch (error) {
    next(error);
  }
});

export default router;
