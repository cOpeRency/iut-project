'use strict';

const crypto = require('crypto');

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hashedPassword };
};

const comparePassword = (password, hash, salt) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};

const hashSha1Password = (password) => {
    const hash = crypto.createHash('sha1');
    hash.update(password);
    return hash.digest('hex');
};

const compareSha1Password = (inputPassword, hashedPassword) => {
    const inputHash = hashSha1Password(inputPassword);
    return inputHash === hashedPassword;
};

module.exports = {
    hashPassword,
    comparePassword,
    hashSha1Password,
    compareSha1Password
};
