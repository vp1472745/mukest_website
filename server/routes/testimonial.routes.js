const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', testimonialController.getAll);
router.get('/:id', testimonialController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), testimonialController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), testimonialController.update);
router.delete('/:id', verifyJWT, verifyAdmin, testimonialController.remove);

module.exports = router;
