const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: Number,
    price: Number
});

const Item = mongoose.model('Item', cartSchema, 'items');

module.exports = Item;
