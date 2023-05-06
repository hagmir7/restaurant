const mongoose = require('mongoose');

const PorductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
    },
    Oldprice: {
        type: Number,
        required: true,
    },
    description: {
        tyep: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        require: true,
        default: true
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }


}, {
    timestamps: true
});

const PorductMode = mongoose.model('Product', PorductSchema);
module.exports = PorductMode;

