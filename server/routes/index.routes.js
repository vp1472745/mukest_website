import express from 'express';
const router = express.Router();

import authRoutes from './auth.routes.js';
import heroRoutes from './hero.routes.js';
import categoryRoutes from './category.routes.js';
import galleryRoutes from './gallery.routes.js';
import serviceRoutes from './service.routes.js';
import standardRoutes from './standard.routes.js';
import processRoutes from './process.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import aboutRoutes from './about.routes.js';
import contactRoutes from './contact.routes.js';
import seoRoutes from './seo.routes.js';
import seedRoutes from './seed.routes.js';

router.use('/auth', authRoutes);
router.use('/hero', heroRoutes);
router.use('/category', categoryRoutes);
router.use('/gallery', galleryRoutes);
router.use('/service', serviceRoutes);
router.use('/standard', standardRoutes);
router.use('/process', processRoutes);
router.use('/testimonial', testimonialRoutes);
router.use('/about', aboutRoutes);
router.use('/contact', contactRoutes);
router.use('/seo', seoRoutes);
router.use('/seed', seedRoutes);

export default router;
