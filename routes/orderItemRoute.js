const express = require('express');
const router = express.Router();
const OrderItemsController = require('../controllers/OrderItemsController');
const { protect, protectAdmin } = require('../middleware/auth'); 
const { upload } = require('../middleware/upload')



router.post('/create',OrderItemsController.create);
router.delete('/delete/:id', protect, OrderItemsController.delete);

module.exports = router;