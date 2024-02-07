'use strict';

const Joi = require('joi');
module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                username: Joi.string().required().min(3).example('johndoe').description('Username of the user'),
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                email: Joi.string().required().email().example('john.doe@gmail.com').description('Email of the user'),
                password: Joi.string().required().min(8).example('12345678').description('Password of the user')
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
},

{
    method: 'patch',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().greater(0).required().description('The id of the user')
            }),
            payload: Joi.object({
                username: Joi.string().min(3).example('johndoe').description('Username of the user'),
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                email: Joi.string().email().example('john.doe@gmail.com').description('Email of the user'),
                password: Joi.string().min(8).example('12345678').description('Password of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.update(request.params.id, request.payload);
    }
},
{
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                email: Joi.string().email().example('john.doe@gmail.com').description('Email of the user'),
                password: Joi.string().min(8).example('12345678').description('Password of the user')
            })
        }

    },

    handler: async (request, h) => {

        const { userService } = await request.services();
        return userService.login(request.payload);
    }

}
];


