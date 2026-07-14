import express from 'express';
const router = express.Router();
import galleryController from '../controllers/gallery.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', galleryController.getAll);
router.get('/:id', galleryController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.array('files', 15), galleryController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.array('files', 15), galleryController.update);
router.delete('/:id', verifyJWT, verifyAdmin, galleryController.remove);

export default router;
