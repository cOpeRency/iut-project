'use strict';

const Joi = require('joi');
    module.exports = [{
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/user',
        options: {
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.list();
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required().description('The id of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.findById(request.params.id);
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required().description('The id of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.delete(request.params.id);
        }
    }
];


