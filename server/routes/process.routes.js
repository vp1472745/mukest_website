import express from 'express';
const router = express.Router();
import processController from '../controllers/process.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', processController.getAll);
router.get('/:id', processController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), processController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), processController.update);
router.delete('/:id', verifyJWT, verifyAdmin, processController.remove);

export default router;
