const Product = require('./../models/product.model');
const Category = require('./../models/category.model');

const CategoryController = require('./category.controller');

const ValidationHandler = require('./../handlers/validation.handler');
const FileHandler = require('./../handlers/file.handler');
const MongooseHandler = require('./../handlers/mongoose.handler');

class ProductController {
    static getCountOfProducts() {
        return new Promise((resolve, reject) => {
            Product.count()
                .then(resolve)
                .catch(reject);
        });
    }

    static getAllProducts() {
        return new Promise((resolve, reject) => {
            Product.find()
                .populate('category')
                .then(resolve)
                .catch(reject);
        });
    }

    static getProductsByLimit(pageNumber, perPage, query) {
        return MongooseHandler.pagination('Product', pageNumber, perPage, query, 'category');
    }

    static buildLimitProductsQuery(query) {
        let productsQuery = {};

        if (query.name) {
            productsQuery.name = {
                $regex: '.*' + query.name + '.*',
                $options: 'i'
            };
        }

        return productsQuery;
    }

    static saveProduct(product) {
        return new Promise((resolve, reject) => {
            Product.create({
                name: product.name,
                category: product.category,
                price: product.price,
                picture: product.picture
            })
            .then(resolve)
            .catch(reject);
        });
    }

    static updateProduct(product) {
        return new Promise((resolve, reject) => {
            Product.findByIdAndUpdate(product.productId, {
                name: product.name,
                category: product.category,
                price: product.price,
                picture: product.picture
            }, {
                new: true
            })
            .populate('category')
            .then(resolve)
            .catch(reject);
        });
    }

    static validateProduct(product, files, productId = null) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (files && files.picture) {
                product.picture = files.picture;
            } else if (!productId) {
                errors.push('You need to provide product picture');
            }

            if (ValidationHandler.regex(product.name, /^[a-zA-Z0-9 ]{2,155}$/)) {
                product.name = ValidationHandler.testInput(product.name);
            } else {
                errors.push('Product name is invalid');
            }

            if (product.category) {
                product.category = ValidationHandler.testInput(product.category);
            } else {
                errors.push('Product category is invalid');
            }

            if (ValidationHandler.regex(product.price, /^[0-9]{2,155}$/)) {
                product.price = ValidationHandler.testInput(product.price);
            } else {
                errors.push('Product price is invalid');
            }
    
            if (errors.length) {
                reject(errors);
            } else if (productId) {
                product.productId = productId;

                if (product.name === product.existName) {
                    Promise.all([
                        MongooseHandler.checkBeforeActionById('Category', product.category),
                        MongooseHandler.checkBeforeActionById('Product', product.productId)
                    ])
                    .then(() => resolve(product))
                    .catch(reject);
                } else {
                    Promise.all([
                        MongooseHandler.checkIfAlreadyExist('Product', 'name', product.name.toLowerCase()),
                        MongooseHandler.checkBeforeActionById('Category', product.category),
                        MongooseHandler.checkBeforeActionById('Product', product.productId)
                    ])
                    .then(() => resolve(product))
                    .catch(reject);
                }
            } else {
                Promise.all([
                    MongooseHandler.checkIfAlreadyExist('Product', 'name', product.name.toLowerCase()),
                    MongooseHandler.checkBeforeActionById('Category', product.category),
                ])
                .then(() => resolve(product))
                .catch(reject);
            }
        });
    }

    static validateAndUploadProductPicture(product) {
        return new Promise((resolve, reject) => {
            if (product.picture && product.picture.constructor !== String) {
                FileHandler.checkFilesErrors(product.picture, 'image', 2)
                    .then(FileHandler.moveFiles)
                    .then((newPicrureName) => {
                        product.picture = newPicrureName[0];
                        resolve(product);
                    })
                    .catch((err) => reject(err));
            } else if (product.existPicture) {
                product.picture = product.existPicture;
                resolve(product);
            } else {
                reject(['You need to provide picture or exist one']);
            }
        });
    }

    static checkAndDeleteOldImage(product) {
        return new Promise((resolve, reject) => {
            if (product.picture === product.existPicture) {
                resolve(product);
            } else {
                FileHandler.deleteFile(process.env.IMAGES_PATH + '/' + product.existPicture)
                    .then(() => resolve(product))
                    .catch(() => resolve(product));
            }
        });
    }
}

module.exports = ProductController;
