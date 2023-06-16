const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { protect, protectAdmin } = require('../middleware/auth'); 
const { upload } = require('../middleware/upload')



router.post('/create', upload.single('image'), CategoryController.create);
router.put('/update/:id', protectAdmin, upload.single('image'), CategoryController.update);
router.delete('/delete/:id', protectAdmin, CategoryController.delete);
router.get('/list', CategoryController.list);
router.get('/products/:id', CategoryController.products);



module.exports = router;