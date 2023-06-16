const mongoose = require('mongoose');

const OrderItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User Field is required'],
        ref:'Product'
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity Field is required'],
    },
    total: {
        type: Number,
        required: [true, 'total Field is required'],
    }
}, {
    timestamps: true
});

const OrderItemsMode = mongoose.model('OrderItems', OrderItemsSchema);
module.exports = OrderItemsMode;

