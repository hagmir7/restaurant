const express = require('express');
const { paginate } = require('../utils')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');



// @desc     List of users
// @route    Post /user/register
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

    const token = jwt.sign({ userId: user._id }, "Agmir");
    return res.json({ token, userId: user._id });
  } catch (error) {
    console.log("Error to login: ", error);
    res.status(500).json({ message: "Internal server error" })
  }
}

// @desc     Create new user and authentication
// @route    Post /user/register
// @access   Public 
exports.register = async (req, res, nex) =>{
  const { first_name, last_name, email, password } = req.body;
  // check if all fields is filled
  if(!first_name || !last_name || !email || !password){
    res.status(400);
    throw Error('Please add all fields');
  }

  // Check if user is already exists
  const isExist = await User.findOne({ email });
  if (isExist) {
    return res.json({ message: "User Already exists!", type: 'danger' });
  }

  try {
    // Create a new user from the request body
    const user = new User({
      firstName: first_name,
      lastName: last_name,
      email: email,
      // hash password
      password: bcrypt.hashSync(password, 10),
    });

    // Save the new user to MongoDB instance
    const newUser = await user.save();
    // Generate token
    const token = jwt.sign({ userId: newUser._id }, "Agmir");
    // Return token
    res.json({ token, userId: newUser._id });
  } catch (err) {
    console.error('Error creating new user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// @desc     Get current auth user
// @route    Post /user/auth
// @access   Public 

exports.auth = async (req, res, next) =>{
  res.json({message: "Auth user"});
}


