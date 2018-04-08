const Order = require('./../models/order.model');

class OrderController {
    static getCountOfOrders() {
        return new Promise((resolve, reject) => {
            Order.count()
                .then(resolve)
                .catch(reject);
        });
    }
}

module.exports = OrderController;
