const express = require('express');
const router = express.Router();
const heroController = require('../controllers/hero.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', heroController.getAll);
router.get('/:id', heroController.getById);

router.post('/', verifyJWT, verifyAdmin, upload.single('file'), heroController.create);
router.put('/:id', verifyJWT, verifyAdmin, upload.single('file'), heroController.update);
router.delete('/:id', verifyJWT, verifyAdmin, heroController.remove);

module.exports = router;
