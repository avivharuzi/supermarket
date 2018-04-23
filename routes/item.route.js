const express = require('express');
const router = express.Router();

const ItemController = require('./../controllers/item.controller');

const RouteHandler = require('./../handlers/route.handler');

router.post('/', (req, res) => {
    ItemController.validateItem(req.body, req.userData._id)
        .then(ItemController.calcItemPriceTotal)
        .then(ItemController.setItem)
        .then((newItem) => RouteHandler.success(res, 'Item added successfully', newItem))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.put('/:itemId', (req, res) => {
    ItemController.validateItem(req.body, req.userData._id)
        .then(ItemController.calcItemPriceTotal)
        .then(() => {
            ItemController.updateItem(req.params.itemId, req.body)
            .then((updatedItem) => RouteHandler.success(res, 'Item updated successfully', updatedItem))
        })
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.delete('/:itemId', (req, res) => {
    ItemController.deleteItem(req.params.itemId, req.userData._id)
        .then((deletedItem) => RouteHandler.success(res, 'Item deleted successfully', deletedItem))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.delete('/delete/all', (req, res) => {
    ItemController.getCartAndDeleteItems(req.userData._id)
        .then(() => RouteHandler.success(res, 'All Items deleted successfully'))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
