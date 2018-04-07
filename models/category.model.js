const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true
    }
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
