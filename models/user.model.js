const mongoose = require('mongoose');

const PasswordHelper = require('./../helpers/password.helper');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        lowercase: true
    },
    lastname: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    identityCard: {
        type: Number,
        unique: true
    },
    password: String,
    role: {
        type: String,
        lowercase: true,
        enum: [
            'admin',
            'customer'
        ]
    },
    city: {
        type: String,
        lowercase: true
    },
    street: {
        type: String,
        lowercase: true
    }
});

userSchema.pre('save', function (next) {
    let user = this;

    PasswordHelper.generateHashPassword(user.password)
        .then((hashPassword) => {
            user.password = hashPassword;
            next();
        })
        .catch((err) => next(err));
});

userSchema.methods.comparePassword = function (candidatePassword) {
    let user = this;

    return PasswordHelper.comparePassword(candidatePassword, user.password);
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
