'use strict';

const { Service } = require('@hapipal/schmervice');
const { response } = require('request/request');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const PasswordEncryptor = require('../myModules/passwordEncryptor');
const {compareSha1Password} = require("../myModules/passwordEncryptor");

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();

        // Vérifie si l'adresse mail est déjà utilisée
        const existingUser = await User.query().findOne({ email: user.email });

        if (existingUser) {
            throw Boom.notAcceptable('Email already used');
        }

        await User.query().insertAndFetch(user);

        return 'User created';
    }

    async list() {

        const { User } = await this.server.models();

        return User.query();
    }

    async findById(id) {

        const { User } = await this.server.models();

        return User.query().findById(id).throwIfNotFound();
    }

    async delete(id) {
        const { User } = this.server.models();

        const user = await User.query().findById(id);

        if (!user) {
            return Boom.notFound('User not found');
        }

        User.query().deleteById(id);
        return 'User deleted';
    }
    async update(id, user) {

        const { User } = this.server.models();

        const userToUpdate = await User.query().findById(id);

        if (!userToUpdate) {
            return Boom.notFound('User not found');
        }

        User.query().updateAndFetchById(id, user);
        return 'User updated';
    }

    async login(payload) {

        const { email, password } = payload;

        const { User } = this.server.models();

        const user = await User.query().findOne({ email });

        if (!user) {
            throw Boom.notFound('User not found');
        }

        if (compareSha1Password(password, user.hashPassword)) {
            throw Boom.unauthorized('Unauthorized');
        }

        // L'utilisateur est authentifié, donc on peut lui passer un token
        const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                scope: user.role
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );

        return token;
    }
};