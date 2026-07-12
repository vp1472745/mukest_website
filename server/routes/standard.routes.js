const express = require('express');
const router = express.Router();
const standardController = require('../controllers/standard.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');

router.get('/', standardController.getAll);
router.get('/:id', standardController.getById);

router.post('/', verifyJWT, verifyAdmin, standardController.create);
router.put('/:id', verifyJWT, verifyAdmin, standardController.update);
router.delete('/:id', verifyJWT, verifyAdmin, standardController.remove);

module.exports = router;
