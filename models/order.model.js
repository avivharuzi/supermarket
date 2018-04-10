const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    price: Number,
    city: {
        type: String,
        lowercase: true
    },
    street: {
        type: String,
        lowercase: true
    },
    orderDate: {
        type: Date,
        lowercase: Date.now
    },
    shippingDate: Date,
    creditCard: String
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
