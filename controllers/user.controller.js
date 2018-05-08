const User = require('./../models/user.model');

const ValidationHandler = require('./../handlers/validation.handler');
const MongooseHandler = require('./../handlers/mongoose.handler');

class UserController {
    static checkUserForLogin(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                email: user.email.toLowerCase()
            })
            .then((userExist) => {
                if (userExist) {
                    userExist.comparePassword(user.password)
                        .then(() => resolve(userExist))
                        .catch(() =>  reject(['The email or password you have entered is invalid']));
                } else {
                    reject(['The email or password you have entered is invalid']);
                }
            })
            .catch(reject);
        });
    }

    static checkUserForAuth(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                email: user.email.toLowerCase(),
                password: user.password
            })
            .then((userExist) => {
                if (userExist) {
                    resolve(userExist);
                } else {
                    reject();
                }
            })
            .catch(reject);
        });
    }

    static saveUserCustomer(user) {
        return new Promise((resolve, reject) => {
            User.create({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                identityCard: user.identityCard,
                password: user.password,
                role: 'customer',
                city: user.city,
                street: user.street
            })
            .then(resolve)
            .catch((err) => {
                reject(['There was problem while saving this customer']);
            });
        });
    }

    static validateUserCustomer(user) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (ValidationHandler.regex(user.firstname, /^[A-Za-z]{2,155}$/)) {
                user.firstname = ValidationHandler.testInput(user.firstname);
            } else {
                errors.push('First name is invalid');
            }

            if (ValidationHandler.regex(user.lastname, /^[A-Za-z]{2,155}$/)) {
                user.lastname = ValidationHandler.testInput(user.lastname);
            } else {
                errors.push('Last name is invalid');
            }

            if (ValidationHandler.regex(user.identityCard, /^[0-9]{2,155}$/)) {
                user.identityCard = ValidationHandler.testInput(user.identityCard);
            } else {
                errors.push('Identity card is invalid');
            }
            
            if (ValidationHandler.regex(user.email, /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
                user.email = ValidationHandler.testInput(user.email);
            } else {
                errors.push('Email is invalid');
            }

            if (ValidationHandler.regex(user.password, /^[A-Za-z0-9!@#$%^&*()_]{3,55}$/)) {
                user.password = ValidationHandler.testInput(user.password);
            } else {
                errors.push('Password is invalid');
            }

            if (ValidationHandler.regex(user.city, /^[A-Za-z0-9 ]{2,155}$/)) {
                user.city = ValidationHandler.testInput(user.city);
            } else {
                errors.push('City is invalid');
            }
    
            if (ValidationHandler.regex(user.street, /^[A-Za-z0-9_ ]{3,55}$/)) {
                user.street = ValidationHandler.testInput(user.street);
            } else {
                errors.push('Street is invalid');
            }
    
            if (errors.length) {
                reject(errors);
            } else {
                Promise.all([
                    MongooseHandler.checkIfAlreadyExist('User', 'email', user.email.toLowerCase()),
                    MongooseHandler.checkIfAlreadyExist('User', 'identityCard', user.identityCard)
                ])
                .then(() => resolve(user))
                .catch(reject);
            }
        });
    }

    static validateUserCustomerBefore(user) {
        return new Promise((resolve, reject) => {
            Promise.all([
                MongooseHandler.checkIfAlreadyExist('User', 'email', user.email.toLowerCase()),
                MongooseHandler.checkIfAlreadyExist('User', 'identityCard', user.identityCard)
            ])
            .then(() => resolve(user))
            .catch(reject);
        });
    }
}

module.exports = UserController;
