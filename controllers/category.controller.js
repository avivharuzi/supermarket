const Category = require('./../models/category.model');

const Product = require('./../models/product.model');

const ValidationHandler = require('./../handlers/validation.handler');
const MongooseHandler = require('./../handlers/mongoose.handler');

class CategoryController {
    static getCategories() {
        return new Promise((resolve, reject) => {
            Category.find()
                .then(resolve)
                .catch(reject);
        });
    }

    static saveCategory(category) {
        return new Promise((resolve, reject) => {
            Category.create({
                name: category.name
            })
            .then(resolve)
            .catch(reject);
        });
    }

    static updateCategory(category) {
        return new Promise((resolve, reject) => {
            Category.findByIdAndUpdate(category.categoryId, {
                name: category.name
            }, {
                new: true
            })
            .then(resolve)
            .catch(reject);
        });
    }

    static deleteCategory(category) {
        return new Promise((resolve, reject) => {
            Category.findByIdAndRemove(category._id)
                .then(resolve)
                .catch(reject);
        });
    }

    static validateCategory(category, categoryId = null) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (ValidationHandler.regex(category.name, /^[a-zA-Z0-9 ]{2,155}$/)) {
                category.name = ValidationHandler.testInput(category.name);
            } else {
                errors.push('Category name is invalid');
            }

            if (errors.length) {
                reject(errors);
            } else if (categoryId) {
                category.categoryId = categoryId;

                if (category.name === category.existName) {
                    MongooseHandler.checkBeforeActionById('Category', category.categoryId)
                    .then(() => resolve(category))
                    .catch(reject);
                } else {
                    Promise.all([
                        MongooseHandler.checkBeforeActionById('Category', category.categoryId),
                        MongooseHandler.checkIfAlreadyExist('Category', 'name', category.name.toLowerCase())
                    ])
                    .then(() => resolve(category))
                    .catch(reject);
                }
            } else {
                MongooseHandler.checkIfAlreadyExist('Category', 'name', category.name.toLowerCase())
                    .then(() => resolve(category))
                    .catch(reject);
            }
        });
    }

    static checkProductsBelongToCategory(category) {
        return new Promise((resolve, reject) => {
            Product.find({
                category: category._id
            })
            .then((productsExist) => {
                if (productsExist && productsExist.length) {
                    reject(['These category belongs to products and can not be deleted']);
                } else {
                    resolve(category);
                }
            })
            .catch(reject);
        });
    }
}

module.exports = CategoryController;
