'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {
        return 'favorite';
    }

    static get joiSchema() {
        return Joi.object({
            filmId: Joi.number().integer().greater(0),
            userId: Joi.number().integer().greater(0),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    async $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
}