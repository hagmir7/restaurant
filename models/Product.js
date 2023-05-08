const mongoose = require('mongoose');

const PorductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User Field is required']
    },
    name: {
        type: String,
        required: [true, 'name Field is required'],
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'name Field is required'],
    },
    Oldprice: {
        type: Number,
        required: [true, 'name Field is required'],
    },
    description: {
        type: String,
        required: [true, 'name Field is required'],
    },
    body: {
        type: String,
        required: [true, 'name Field is required'],
    },
    status: {
        type: Boolean,
        required: [true, 'name Field is required'],
        default: true
    },
    images: {
        type: Array,
        required: [true, 'name Field is required'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'name Field is required'],
    }


}, {
    timestamps: true
});

const PorductMode = mongoose.model('Product', PorductSchema);
module.exports = PorductMode;

