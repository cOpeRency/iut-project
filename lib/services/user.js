'use strict';

const { Service } = require('@hapipal/schmervice');
const { response } = require('request/request');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    create(user) {

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
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

        return User.query().deleteById(id);
    }
    async update(id, user) {

        const { User } = this.server.models();

        const userToUpdate = await User.query().findById(id);

        if (!userToUpdate) {
            return Boom.notFound('User not found');
        }

        return User.query().updateAndFetchById(id, user);
    }

    async login(payload) {

        const { email, password } = payload;

        const { User } = this.server.models();

        const user = await User.query().findOne({ email });

        if (!user) {
            throw Boom.notFound('User not found');
        }

        if (user.password !== password) {
            throw Boom.unauthorized('Unauthorized');
        }

        // L'utilisateur est authentifié, donc on peut lui passer un token

        const secret = { key: 'random_string', algorithms: ['HS256'] }; // replace 'random_string' with your secret key
        if (!secret || !secret.key) {
            throw new Error('Secret key is not defined');
        }

        const token = Jwt.token.generate(payload, secret
        );

        return { token };
    }
};