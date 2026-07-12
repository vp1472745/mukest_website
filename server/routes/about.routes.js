const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', aboutController.get);

router.put(
  '/',
  verifyJWT,
  verifyAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]),
  aboutController.update
);

module.exports = router;
