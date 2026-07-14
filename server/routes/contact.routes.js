import express from 'express';
const router = express.Router();
import contactController from '../controllers/contact.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';

router.get('/', contactController.get);
router.put('/', verifyJWT, verifyAdmin, contactController.update);

export default router;
