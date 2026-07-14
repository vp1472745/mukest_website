import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/auth.js';

router.post('/login', authController.login);
router.get('/profile', verifyJWT, authController.getProfile);
router.put('/profile', verifyJWT, authController.updateProfile);

export default router;
