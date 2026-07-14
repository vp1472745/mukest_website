import express from 'express';
const router = express.Router();
import serviceController from '../controllers/service.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), serviceController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), serviceController.update);
router.delete('/:id', verifyJWT, verifyAdmin, serviceController.remove);

export default router;
