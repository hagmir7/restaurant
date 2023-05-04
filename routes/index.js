var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { paginate } = require('../utils');

const app = express();
app.use(express.json());

// Imported models
const UserModel = require('../models/User');
const RoleModel = require('../models/Role');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/users', async function(req, res, next) {
  try{
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    const users = await UserModel.find();
    const paginatedUsers = paginate(users, limit, currentPage);
  
    res.json(paginatedUsers);
  }catch(error){
    console.log('Error listing users', error)
    res.status(500).json({message: "Internal server error"});
  }

});


router.get('/roles', async (req, res, next)=>{
  const roles = await RoleModel.find();
  res.json(roles);
});


router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Check if user is already exists
  const isExist = await UserModel.findOne({ email });
  if (isExist) {
    return res.json({ message: "User Already exists!", type: 'danger' });
  }

  try {
    // Create a new user from the request body
    const user = new UserModel({
      firstName: first_name,
      lastName: last_name,
      email: email,
      password: bcrypt.hashSync(password, 10)
    });

    // Save the new user to MongoDB instance
    const newUser = await user.save();
    // Generate token
    const token = jwt.sign({ userId: newUser._id }, "Agmir");

    res.json({ token, userId: newUser._id });
  } catch (err) {
    console.error('Error creating new user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: 'Email is not exists!' });
    }

    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      return res.json({ message: 'Password is incorrect!', type: "danger" })
    }

    const token = jwt.sign({ userId: user._id }, "Agmir");
    return res.json({ token, userId: user._id });
  } catch (error) {
    console.log("Error to login: ", error);
    res.status(500).json({ message: "Internal server error" })
  }
  
});





module.exports = router;
