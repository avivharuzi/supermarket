const express = require('express');
const router = express.Router();

const ProductController = require('./../controllers/product.controller');

const RouteHandler = require('./../handlers/route.handler');

router.get('/', (req, res) => {
    ProductController.getAllProducts()
        .then((products) => res.send(products))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.get('/:pageNumber/:perPage', (req, res) => {
    let productsLimitQuery = ProductController.buildLimitProductsQuery(req.query);

    ProductController.getProductsByLimit(+req.params.pageNumber, +req.params.perPage, productsLimitQuery)
        .then((products) => res.send(products))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.post('/', (req, res) => {
    ProductController.validateProduct(JSON.parse(req.body.product), req.files)
        .then(ProductController.validateAndUploadProductPicture)
        .then(ProductController.saveProduct)
        .then((newProduct) => RouteHandler.success(res, 'Product added successfully', newProduct))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.put('/:productId', (req, res) => {
    ProductController.validateProduct(JSON.parse(req.body.product), req.files, req.params.productId)
        .then(ProductController.validateAndUploadProductPicture)
        .then(ProductController.checkAndDeleteOldImage)
        .then(ProductController.updateProduct)
        .then((updatedProduct) => RouteHandler.success(res, 'Product updated successfully', updatedProduct))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
