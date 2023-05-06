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
        maxlength: 4,
        maxlength: 100
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlenght: 4,
        maxlength: 100
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
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
        required: [true, 'Password is required']
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Role',
        default: null,
        
    },

},{
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;