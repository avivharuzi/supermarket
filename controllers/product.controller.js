const Product = require('./../models/product.model');

class ProductController {
    static getCountOfProducts() {
        return new Promise((resolve, reject) => {
            Product.count()
                .then(resolve)
                .catch(reject);
        });
    }
}

module.exports = ProductController;
