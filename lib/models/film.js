'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {
        return 'film';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string().min(3).example('Les Tuches').description('Title of the film'),
            description: Joi.string().min(10).example('c bon les frites').description('Description of the film'),
            dateSortie: Joi.date().description('Release date of the film'),
            realisateur: Joi.string().min(3).example('Jeff Tuche').description('Director of the film'),
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
};
