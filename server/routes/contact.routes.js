const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');

router.get('/', contactController.get);
router.put('/', verifyJWT, verifyAdmin, contactController.update);

module.exports = router;
