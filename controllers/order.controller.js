const Order = require('./../models/order.model');

const CartController = require('./../controllers/cart.controller');
const ItemController = require('./../controllers/item.controller');

const ValidationHandler = require('./../handlers/validation.handler');
const MongooseHandler = require('./../handlers/mongoose.handler');

const Promise = require('bluebird');

class OrderController {
    static getCountOfOrders() {
        return new Promise((resolve, reject) => {
            Order.count()
                .then(resolve)
                .catch(reject);
        });
    }

    static setOrder(order) {
        return new Promise((resolve, reject) => {
            Order.create({
                user: order.userId,
                cart: order.cart,
                price: order.price,
                city: order.city,
                street: order.street,
                shippingDate: order.shippingDate,
                creditCard: order.creditCard
            })
            .then((newOrder) => {
                resolve(newOrder);
            })
            .catch(reject);
        });
    }

    static checkOrderByCountInDay(userId) {
        return new Promise((resolve, reject) => {
            let start = new Date();
            start.setHours(0,0,0,0);
            start = start.getTime();
            let end = new Date();
            end.setHours(23,59,59,999);
            end = end.getTime();
    
            Order.count({
                user: userId,
                orderDate: {
                    $gte: start,
                    $lt: end
                }
            }).then((countOrders) => {
                if (countOrders >= 3) {
                    reject(['You have reached the limited number of orders (only 3 orders in one day) please come back tomorrow']);
                } else {
                    resolve();
                }
            })
            .catch(reject);
        });
    }

    static validateOrder(order, userId) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (ValidationHandler.regex(order.city, /^[A-Za-z0-9 ]{2,155}$/)) {
                order.city = ValidationHandler.testInput(order.city);
            } else {
                errors.push('City is invalid');
            }
    
            if (ValidationHandler.regex(order.street, /^[A-Za-z0-9_ ]{3,55}$/)) {
                order.street = ValidationHandler.testInput(order.street);
            } else {
                errors.push('Street is invalid');
            }
    
            if (ValidationHandler.regex(order.creditCard, /^[0-9]{1,55}$/)) {
                order.creditCard = ValidationHandler.testInput(order.creditCard);
            } else {
                errors.push('Credit card is invalid');
            }
    
            if (ValidationHandler.regex(order.shippingDate, /^[0-9]{1,55}$/)) {
                order.shippingDate = ValidationHandler.testInput(order.shippingDate);
            } else {
                errors.push('Shipping is invalid');
            }
    
            if (errors.length) {
                reject(errors);
            } else {
                order.userId = userId;

                OrderController.checkOrderByCountInDay(order.userId)
                    .then(() => resolve(order))
                    .catch(reject);
            }
        });
    }

    static getCartAndCalcOrdePrice(order) {
        return new Promise((resolve, reject) => {
            CartController.getCart(order.userId)
            .then((cart) => {
                let totalPrice = 0;
                for (let item of cart.items) {
                  totalPrice += item.price;
                }
                order.price = totalPrice;
                order.cart = cart._id;
                order.items = cart.items;
                resolve(order);
            })
            .catch(reject);
        });
    }

    static changeAndDeleteCartOfOrder(order) {
        return new Promise((resolve, reject) => {
            Promise.all([
                CartController.disableCartOfUser(order.userId)
            ])
            .then(() => {
                resolve(order);
            })
            .catch(reject);
        });
    }
}

module.exports = OrderController;
