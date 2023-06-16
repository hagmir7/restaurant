const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: false,
    default: '/media/avatar.png'
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: 100,
    minlength: 4
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: 4,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: 8,
    maxlength: 100,
    unique: true
  },
  phone: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 20
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    default: 'Customer',
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
