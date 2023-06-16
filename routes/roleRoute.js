const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router.post('/create', RoleController.create);
router.get('/list', RoleController.list);


module.exports = router;