const Category = require('./../models/category.model');

class CategoryController {
    static checkCategoryById(id) {
        return new Promise((resolve, reject) => {
            Category.findById(id)
                .then((categoryExist) => {
                    if (categoryExist) {
                        resolve(categoryExist);
                    } else {
                        reject(['Category does not exist']);
                    }
                })
                .catch(() => reject(['Category does not exist']));
        });
    }
}

module.exports = CategoryController;
