const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const { protect, protectAdmin } = require('../middleware/auth'); 
const { upload } = require('../middleware/upload')



router.post('/create',ReservationController.create);
router.put('/update/:id', protect,ReservationController.update);
router.delete('/delete/:id', protect, ReservationController.delete);
router.get('/list',protect, ReservationController.list);
router.get('/canceled',protectAdmin, ReservationController.canceled);
router.get('/confirmed',protectAdmin, ReservationController.confirmed);
router.get('/pending',protectAdmin, ReservationController.pending);
router.post('/confirme/:id',protectAdmin, ReservationController.confirmeReservation);
router.post('/cancele/:id',protectAdmin, ReservationController.canceleReservation);



module.exports = router;