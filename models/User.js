const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: false,
    },

    firstName: {
        type: String,
        required: true,
        maxlength: 4,
        maxlength: 100
    },

    lastName: {
        type: String,
        required: true,
        minlenght: 4,
        maxlength: 100
    },

    email: {
        type: String,
        required: true,
        minlenght: 8,
        maxlength: 100,
        unique: true
    },

    phone: {
        type: String,
        required: false,
        minlenght: 8,
        maxlength: 20
    },

    password: {
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('users', UserSchema);


module.exports = UserModel;