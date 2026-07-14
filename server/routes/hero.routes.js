import express from 'express';
const router = express.Router();
import heroController from '../controllers/hero.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', heroController.getAll);
router.get('/:id', heroController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), heroController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), heroController.update);
router.delete('/:id', verifyJWT, verifyAdmin, heroController.remove);

export default router;
