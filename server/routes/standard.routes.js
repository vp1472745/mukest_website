import express from 'express';
const router = express.Router();
import standardController from '../controllers/standard.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';

router.get('/', standardController.getAll);
router.get('/:id', standardController.getById);

router.post('/', verifyJWT, verifyAdmin, standardController.create);
router.put('/:id', verifyJWT, verifyAdmin, standardController.update);
router.delete('/:id', verifyJWT, verifyAdmin, standardController.remove);

export default router;
