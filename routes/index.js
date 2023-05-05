var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserController = require('../controllers/UserController');

const app = express();
app.use(express.json());

// Imported models
const UserModel = require('../models/User');
const RoleModel = require('../models/Role');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/roles', async (req, res, next)=>{
  const roles = await RoleModel.find();
  res.json(roles);
});







module.exports = router;
