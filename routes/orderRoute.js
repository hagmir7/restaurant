const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { protectAdmin } = require('../middleware/auth')



router.post('/create', protectAdmin, OrderController.create);

router.post('/cancele/:id', protectAdmin, OrderController.canceleOrder);
router.get('/:id', protectAdmin, OrderController.getOrder);


module.exports = router;