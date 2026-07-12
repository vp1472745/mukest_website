const express = require('express');
const router = Router = express.Router();
const seoController = require('../controllers/seo.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth');

router.get('/', seoController.getByPage);
router.get('/all', seoController.getAll);
router.put('/', verifyJWT, verifyAdmin, seoController.update);

module.exports = router;
