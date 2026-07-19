import express from 'express';
const router = express.Router();
import testimonialController from '../controllers/testimonial.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', testimonialController.getAll);
router.get('/:id', testimonialController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.any(), testimonialController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.any(), testimonialController.update);
router.delete('/:id', verifyJWT, verifyAdmin, testimonialController.remove);

export default router;
