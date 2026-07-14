import express from 'express';
const router = express.Router();
import seoController from '../controllers/seo.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';

router.get('/', seoController.getByPage);
router.get('/all', seoController.getAll);
router.put('/', verifyJWT, verifyAdmin, seoController.update);

export default router;
