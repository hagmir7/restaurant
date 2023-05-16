const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { protectAdmin } = require('../middleware/auth')



router.post('/create', protectAdmin, OrderController.create);
router.get('/getorder/:id', protectAdmin, OrderController.getOrder);
router.post('/cancele/:id', protectAdmin, OrderController.canceleOrder);


module.exports = router;