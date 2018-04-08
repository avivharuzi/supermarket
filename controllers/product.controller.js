const Product = require('./../models/product.model');
const Category = require('./../models/category.model');

const CategoryController = require('./../controllers/category.controller');

const ValidationHandler = require('./../handlers/validation.handler');
const FileHandler = require('./../handlers/file.handler');

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

    static getProductsByLimit(pageNumber, perPage) {
        pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;

        return new Promise((resolve, reject) => {
            Product.find()
                .limit(perPage)
                .skip(perPage * pageNumber)
                .then((products) => {
                    ProductController.getCountOfProducts()
                        .then((counts) => {
                            resolve({
                                products: products,
                                page: pageNumber + 1,
                                pages: Math.ceil(counts / perPage)
                            })
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
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
                        CategoryController.checkCategoryById(product.category),
                        ProductController.checkProductById(product.productId)
                    ])
                    .then(() => resolve(product))
                    .catch(reject);
                } else {
                    Promise.all([
                        ProductController.checkExistInProductByField('name', product.name.toLowerCase()),
                        CategoryController.checkCategoryById(product.category),
                        ProductController.checkProductById(product.productId)
                    ])
                    .then(() => resolve(product))
                    .catch(reject);
                }
            } else {
                Promise.all([
                    ProductController.checkExistInProductByField('name', product.name.toLowerCase()),
                    CategoryController.checkCategoryById(product.category)
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

    static checkProductById(id) {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then((productExist) => {
                    if (productExist) {
                        resolve(productExist);
                    } else {
                        reject(['Product does not exist']);
                    }
                })
                .catch(() => reject(['Product does not exist']));
        });
    }

    static checkExistInProductByField(field, value) {
        return new Promise((resolve, reject) => {
            Product.findOne({
                [field]: value
            })
            .then((productExist) => {
                if (productExist) {
                    reject([`This ${field} is already in used`])
                } else {
                    resolve();
                }
            })
            .catch(reject);
        });
    }
}

module.exports = ProductController;
