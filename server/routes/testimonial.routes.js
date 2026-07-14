import express from 'express';
const router = express.Router();
import testimonialController from '../controllers/testimonial.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', testimonialController.getAll);
router.get('/:id', testimonialController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), testimonialController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), testimonialController.update);
router.delete('/:id', verifyJWT, verifyAdmin, testimonialController.remove);

export default router;
