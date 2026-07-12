const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const heroRoutes = require('./hero.routes');
const categoryRoutes = require('./category.routes');
const galleryRoutes = require('./gallery.routes');
const serviceRoutes = require('./service.routes');
const standardRoutes = require('./standard.routes');
const processRoutes = require('./process.routes');
const testimonialRoutes = require('./testimonial.routes');
const aboutRoutes = require('./about.routes');
const contactRoutes = require('./contact.routes');
const seoRoutes = require('./seo.routes');
const seedRoutes = require('./seed.routes');

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

module.exports = router;
