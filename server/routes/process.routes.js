const express = require('express');
const router = express.Router();
const processController = require('../controllers/process.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', processController.getAll);
router.get('/:id', processController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), processController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), processController.update);
router.delete('/:id', verifyJWT, verifyAdmin, processController.remove);

module.exports = router;
