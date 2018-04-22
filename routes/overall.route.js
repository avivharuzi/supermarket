const express = require('express');
const router = express.Router();

const ProductController = require('./../controllers/product.controller');
const OrderController = require('./../controllers/order.controller');

const RouteHandler = require('./../handlers/route.handler');

router.get('/products', (req, res) => {
    ProductController.getCountOfProducts()
        .then((counts) => res.send({
            data: counts
        }))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.get('/orders', (req, res) => {
    OrderController.getCountOfOrders()
        .then((counts) => res.send({
            data: counts
        }))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.get('/recipes/download/:txt', (req, res) => {
    const file = process.env.RECIPES_PATH + '/' + req.params.txt;
    res.download(file);
});

module.exports = router;
