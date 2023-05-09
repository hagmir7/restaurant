const { paginate } = require('../utils')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { json } = require('body-parser');

// Use .env
require('dotenv').config({ path: './.env' });

// Project director path
const __app = path.resolve(path.join(__dirname, '..'));




// @desc     List of users
// @route    Post /user/list
// @access   Privet (Admin)
exports.list = async (req, res) => {
    try{
        const currentPage = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
      
        const users = await User.find();
        const paginatedUsers = paginate(users, limit, currentPage);
        res.json(paginatedUsers);
      }catch(error){
        console.log('Error listing users', error)
        res.status(500).json({message: "Internal server error"});
      }
};


// @desc     User authentication
// @route    Post /user/login
// @access   Public 
exports.login = async (req, res, next) =>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Email is not exists!' });
    }

    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      return res.json({ message: 'Password is incorrect!', type: "danger" })
    }
    // Generate token
    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET,{ expiresIn: '20d'});
    return res.json({ token, userId: user._id });
  } catch (error) {
    console.log("Error to login: ", error);
    res.status(500).json({ message: "Internal server error" })
  }
}

// @desc     Create new user and authentication
// @route    Post /user/register
// @access   Public 
exports.register = async (req, res, next) =>{
  const { firstName, lastName, email, password } = req.body;
  // check if all fields is filled
  if(!firstName || !lastName || !email || !password){
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user is already exists
  const isExist = await User.findOne({ email });
  if (isExist) {
    return res.json({ message: "User Already exists!", type: 'danger' });
  }

  try {
    // Create a new user from the request body
    const user = await User.create({
      firstName,
      lastName,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    // Generate token
    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET,{ expiresIn: '20d'});
    // Return token
    res.status(201).json({ token, userId: user._id });
  } catch (err) {
    console.error('Error creating new user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// @desc     Get current auth user
// @route    Post /user/auth
// @access   Privet 
exports.auth = async (req, res, next) =>{
  res.json(req.user);
}


// @desc     Delete User
// @route    Delete /user/delete/:id
// @access   Privet ! (Admin) 
exports.delete = async (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(user => {
      !user ? res.status(404).json({ message: 'User not found' })
        : res.json({ message: 'User deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting user' });
    });
}

// @desc     Update User from admin
// @route    PUT /user/update/:id
// @access   Privet ! (Admin) 
exports.update = async (req, res, next) => {
  const {firstName, lastName, email, phone, role } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { firstName, lastName, email, phone, role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({message: 'User not found'});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
}

// @desc     Get a single user
// @route    GET /user/profile/:id
// @access   Public
exports.profile = async (req, res, next) =>{
  try{
    const user = await User.findById(req.params.id).select('-password');
    res.json({user});
  }catch(error){
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

// @desc     Update user password
// @route    POST /user/update/password
// @access   Privet (User)
exports.password = async (req, res, next) =>{
  const { old_password, password1, password2} = req.body;
  const user = await User.findById(req.user.id).select('password');

  // Check is all password is filled
  if(!old_password || !password1 || !password2){
    return res.status(400).json({message: 'All fields are required'});
  }

  // Verify the old password
  if(!(await bcrypt.compare(old_password, user.password))){
    return res.status(400).json({message: 'The old password is incorrect'});
  }

  // Verify if the passwords is match
  if(password1 === password2){
    try {
      // update user password
      await User.findOneAndUpdate({ _id: req.user.id }, { password: bcrypt.hashSync(password1, 10) })
      // return success message
      res.json({ message: "Password updated successfully." })
    } catch (error) {
      console.log(error);
      res.status()
    }
  }else{
    res.status(400).json({message: "The password is not match"})
  }
} 






// @desc     Update User avatar
// @route    PUT /user/avatar
// @access   Privet (User) 
exports.avatar = async (req, res) => {
  try{
    const old_avatar = await User.findById(req.user.id).select('avatar');
    if (req.file.fieldname === 'avatar') {
      // Get old avatar
  
      // Update user avatar
      const user = await User.findOneAndUpdate({ _id: req.user.id }, { avatar: `/media/${req.file.filename}` }).select('-password');
  
      // Delete old vatar form storage
      if (!old_avatar.avatar.startsWith('/media/avatar.png')) {
        fs.unlink(__app + "/public" + old_avatar.avatar, (err) => {
          return res.json(user);
        });
      }else{
        return res.json(user);
      }
      
    }
  }catch(error){
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }

}


// @desc     Update user prfile
// @route    PUT /user/update/prfile/:id
// @access   Privet (User)
exports.update = async (req, res, next) => {
  const {firstName, lastName, email, phone } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { firstName, lastName, email, phone, role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({message: 'User not found'});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
}