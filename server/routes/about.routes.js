import express from 'express';
const router = express.Router();
import aboutController from '../controllers/about.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', aboutController.get);

router.put(
  '/',
  verifyJWT,
  verifyAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]),
  aboutController.update
);

export default router;
