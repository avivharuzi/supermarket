const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/user.controller');

const RouteHandler = require('./../handlers/route.handler');
const AuthHandler = require('./../handlers/auth.handler');

router.post('/register', (req, res) => {
    UserController.validateUserCustomer(req.body)
        .then(UserController.saveUserCustomer)
        .then((newUser) => RouteHandler.success(res, 'This user registered successfully', newUser))
        .catch(err => RouteHandler.error(res, 409, '', err));
});

router.post('/login', (req, res) => {
    UserController.checkUserForLogin(req.body)
        .then(AuthHandler.signUserToJwt)
        .then(data => {
            res.setHeader('authorization', data.token);
            RouteHandler.success(res, 'User was found', data);
        })
        .catch(err => RouteHandler.error(res, 404, '', err));
});

router.post('/check', (req, res) => {
    let token = req.body.token;

    if (!token) {
        res.status(404).end();
    } else {
        AuthHandler.checkUserToken(token)
            .then((userData) => RouteHandler.success(res, 'Token verify', userData))
            .catch(() => res.status(401).end());
    }
});

module.exports = router;
