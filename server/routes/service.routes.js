const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), serviceController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), serviceController.update);
router.delete('/:id', verifyJWT, verifyAdmin, serviceController.remove);

module.exports = router;
