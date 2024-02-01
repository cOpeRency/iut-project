'use strict';

const crypto = require('crypto');

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hashedPassword;
}

function comparePassword(password, hashedPassword, salt) {
    const newHashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return newHashedPassword === hashedPassword;
}

module.exports = {
    hashPassword,
    comparePassword
};