const express = require('express');
const router = express.Router();

const CartController = require('./../controllers/cart.controller');

const RouteHandler = require('./../handlers/route.handler');

router.get('/', (req, res) => {
    CartController.getCart(req.userData._id)
        .then((cart) => res.send(cart))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.post('/', (req, res) => {
    CartController.checkBeforeSetCart(req.userData._id)
        .then(CartController.setCart)
        .then((newCart) => res.send(newCart))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

module.exports = router;
