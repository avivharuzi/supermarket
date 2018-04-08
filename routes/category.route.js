const express = require('express');
const router = express.Router();

const CategoryController = require('./../controllers/category.controller');

const RouteHandler = require('./../handlers/route.handler');

router.get('/', (req, res) => {
    CategoryController.getCategories()
        .then((categories) => res.send(categories))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.post('/', (req, res) => {
    CategoryController.validateCategory(req.body)
        .then(CategoryController.saveCategory)
        .then((newCategory) => RouteHandler.success(res, 'Category added successfully', newCategory))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.put('/:categoryId', (req, res) => {
    CategoryController.validateCategory(req.body, req.params.categoryId)
        .then(CategoryController.updateCategory)
        .then((updatedCategory) => RouteHandler.success(res, 'Category updated successfully', updatedCategory))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

router.delete('/:categoryId', (req, res) => {
    CategoryController.checkCategoryById(req.params.categoryId)
        .then(CategoryController.checkProductsBelongToCategory)
        .then(CategoryController.deleteCategory)
        .then((deletedCategory) => RouteHandler.success(res, 'Category deleted successfully', deletedCategory))
        .catch((err) => RouteHandler.error(res, 404, '', err));
});

module.exports = router;
