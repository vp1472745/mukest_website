const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', galleryController.getAll);
router.get('/:id', galleryController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.array('files', 15), galleryController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.array('files', 15), galleryController.update);
router.delete('/:id', verifyJWT, verifyAdmin, galleryController.remove);

module.exports = router;
