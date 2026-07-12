const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), categoryController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), categoryController.update);
router.delete('/:id', verifyJWT, verifyAdmin, categoryController.remove);

module.exports = router;
