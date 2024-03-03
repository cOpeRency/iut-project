'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const passwordEncryptor = require('../myModules/passwordEncryptor');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            username: Joi.string().min(3).example('John').description('Username of the user'),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            email: Joi.string().email().example('john.doe@gmail.com').description('Email of the user'),
            password: Joi.string().min(8).example('12345678').description('Password of the user'),
            role: Joi.string().example('user').description('Role of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get jsonAttributes(){

        return ['scope'];
    }


    async $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;

        if (!this.role) {
            this.role = 'user';
        }

        // Chiffrement du mot de passe avant de la stocker en base
        this.password = await passwordEncryptor.hashSha1Password(this.password);
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};