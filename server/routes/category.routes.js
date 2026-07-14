import express from 'express';
const router = express.Router();
import categoryController from '../controllers/category.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), categoryController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), categoryController.update);
router.delete('/:id', verifyJWT, verifyAdmin, categoryController.remove);

export default router;
