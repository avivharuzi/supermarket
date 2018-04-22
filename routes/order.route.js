const express = require('express');
const router = express.Router();

const OrderController = require('./../controllers/order.controller');

const RouteHandler = require('./../handlers/route.handler');

router.post('/', (req, res) => {
    OrderController.validateOrder(req.body, req.userData._id)
        .then(OrderController.getCartAndCalcOrdePrice)
        .then(OrderController.changeAndDeleteCartOfOrder)
        .then(OrderController.setOrder)
        .then(OrderController.makeRecipeForOrder)
        .then((newOrder) => RouteHandler.success(res, 'Order created successfully', newOrder.recipe))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
