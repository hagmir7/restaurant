const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
    },
    deliveryPar: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'deliveryPar Field is required'],
        ref:'User',
        default:null,
    },

    server: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'deliveryPar Field is required'],
        ref:'User',
        default:null,
    },
    address: {
        type: String,
        required: false
    },
    costumer: {
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        ref:'User'
    },
    total: {
        type: Number,
        maxlength: 100,
        default: 0,
    },
    type: {
        type: Boolean,
        required: [true, 'Type Field is required'],
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const OrderMode = mongoose.model('Order', OrderSchema);
module.exports = OrderMode;

