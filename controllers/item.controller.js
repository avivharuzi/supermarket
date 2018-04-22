const Item = require('./../models/item.model');

const ValidationHandler = require('./../handlers/validation.handler');
const MongooseHandler = require('./../handlers/mongoose.handler');

class ItemController {
    static setItem(item) {
        return new Promise((resolve, reject) => {
            Item.create({
                product: item.product,
                amount: item.amount,
                price: item.price
            })
            .then(resolve)
            .catch(reject);
        });
    }

    static validateItem(item) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (ValidationHandler.regex(item.amount, /^[0-9]{1,2}$/)) {
                item.amount = ValidationHandler.testInput(item.amount);
            } else {
                errors.push('Item amount is invalid');
            }

            if (!item.product) {
                errors.push('You need to provide product to add this item');
            }

            if (errors.length) {
                reject(errors);
            } else {
                MongooseHandler.checkBeforeActionById('Product', item.product)
                .then(() => {
                    resolve(item);
                })
                .catch(reject);
            }
        });
    }

    static calcItemPriceTotal(item) {
        return new Promise((resolve, reject) => {
            MongooseHandler.find('Product', { _id: item.product })
                .then((product) => {
                    item.price = item.amount * product[0].price;
                    resolve(item);
                })
                .catch(reject);
        });
    }

    static deleteItem(itemId) {
        return new Promise((resolve, reject) => {
            MongooseHandler.checkBeforeActionById('Item', itemId)
                .then(() => {
                    Item.findByIdAndRemove(itemId)
                    .then(resolve)
                    .catch(reject);
                })
                .catch(reject);
        });
    }
}

module.exports = ItemController;
