const Cart = require('./../models/cart.model');
const Order = require('./../models/order.model');

class CartController {
    static getCart(userId) {
        return new Promise((resolve, reject) => {
            Cart.findOne({ user: userId, deletedDate: null })
            .populate({
                path: 'items',
                populate: {
                    path: 'product',
                    populate: {
                        path: 'category'
                    }
                }
            })
            .then((cart) => {
                if (cart) {
                    resolve(cart);
                } else {
                    Order.findOne({ user: userId }).sort({ orderDate: -1 }).then((order) => {
                        if (order) {
                            resolve(order);
                        } else {
                            resolve(null);
                        }
                    })
                    .catch(reject);
                }
            })
            .catch(reject);
        });
    }

    static checkBeforeSetCart(userId) {
        return new Promise((resolve, reject) => {
            CartController.getCart(userId)
            .then((cart) => {
                if (!cart) {
                    resolve(userId);
                } else if (!cart.orderDate) {
                    reject(['You have already cart in progress']);
                } else {
                    resolve(userId);
                }
            })
            .catch(reject);
        });
    }

    static setCart(userId) {
        return new Promise((resolve, reject) => {
            Cart.create({
                user: userId
            })
            .then(resolve)
            .catch(reject);
        });
    }

    static addItemToCart(item, userId) {
        return new Promise((resolve, reject) => {
            Cart.findOneAndUpdate({ user: userId, deletedDate: null }, { $push: { items: item._id } })
            .then(() => resolve(item))
            .catch(reject);
        });
    }

    static removeItemFromCart(itemId, userId) {
        return new Promise((resolve, reject) => {
            Cart.findOneAndUpdate({ user: userId, deletedDate: null }, { $pull: { items: itemId } })
            .then(() => resolve(itemId))
            .catch(reject);
        });
    }

    static disableCartOfUser(userId) {
        return new Promise((resolve, reject) => {
            Cart.findOneAndUpdate({ user: userId, deletedDate: null }, { deletedDate: new Date().getTime() })
                .then(resolve)
                .catch(reject);
        });
    }
}

module.exports = CartController;
