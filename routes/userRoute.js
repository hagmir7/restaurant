const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { protect, protectAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');














router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/list', UserController.list);
router.get('/auth', protectAdmin, UserController.auth);
router.delete('/delete/:id', protectAdmin, UserController.delete);
router.put('/update/:id',protectAdmin, UserController.update);
router.get('/profile/:id', UserController.profile);
router.put('/password/update', protect, UserController.password);
router.post('/avatar', protect, upload.single('avatar'), UserController.avatar);


module.exports = router


