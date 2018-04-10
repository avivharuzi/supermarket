const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: Number,
    price: Number
});

const Item = mongoose.model('Item', itemSchema, 'items');

module.exports = Item;
