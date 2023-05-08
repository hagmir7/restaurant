const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload')




router.post('/create', protect, upload.array('images'), ProductController.create);


module.exports = router;