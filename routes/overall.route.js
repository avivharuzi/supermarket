const express = require('express');
const router = express.Router();

const ProductController = require('./../controllers/product.controller');
const OrderController = require('./../controllers/order.controller');

const RouteHandler = require('./../handlers/route.handler');

router.get('/products', (req, res) => {
    ProductController.getCountOfProducts()
        .then((count) => res.send({
            data: count
        }))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.get('/orders', (req, res) => {
    OrderController.getCountOfOrders()
        .then((count) => res.send({
            data: count
        }))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

module.exports = router;
