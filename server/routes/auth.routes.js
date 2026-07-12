const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyJWT } = require('../middleware/auth');

router.post('/login', authController.login);
router.get('/profile', verifyJWT, authController.getProfile);
router.put('/profile', verifyJWT, authController.updateProfile);

module.exports = router;
