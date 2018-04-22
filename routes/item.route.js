const express = require('express');
const router = express.Router();

const ItemController = require('./../controllers/item.controller');

const RouteHandler = require('./../handlers/route.handler');

router.post('/', (req, res) => {
    ItemController.validateItem(req.body)
        .then(ItemController.calcItemPriceTotal)
        .then(ItemController.setItem)
        .then((newItem) => RouteHandler.success(res, 'Item added successfully', newItem))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});


router.delete('/:itemId', (req, res) => {
    ItemController.deleteItem(req.params.itemId)
        .then((deletedItem) => RouteHandler.success(res, 'Item deleted successfully', deletedItem))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
