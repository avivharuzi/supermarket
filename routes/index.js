const authRoute = require('./auth.route');
const overallRoute = require('./overall.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const itemRoute = require('./item.route');
const cartRoute = require('./cart.route');
const userRoute = require('./user.route');

const AuthHandler = require('./../handlers/auth.handler');

const routes = (app) => {
    app.use('/auth', authRoute);
    app.use('/overall', overallRoute);
    app.use('/api', AuthHandler.authenticate);
    app.use('/api/product', productRoute);
    app.use('/api/category', categoryRoute);
    app.use('/api/item', itemRoute);
    app.use('/api/cart', cartRoute);
    app.use('/api/user', userRoute);
};

module.exports = routes;
