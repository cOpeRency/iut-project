const Joi = require('joi');
const FilmService = require('../services/film');
const Boom = require('@hapi/boom');

const filmService = new FilmService();

const filmRoutes = [
    // ... Autres routes ...

    {
        method: 'GET',
        path: '/films',
        options: {
            tags: ['api'],
            auth: false,
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.getAllFilms();
        },
    },

    {
        method: 'GET',
        path: '/films/{id}',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('Film ID'),
                }),
            },
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.getFilmById(request.params.id);
        },
    },

    {
        method: 'POST',
        path: '/films',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                payload: Joi.object({
                    titre: Joi.string().required().min(3).example('Les Tuches').description('Title of the film'),
                    description: Joi.string().required().min(10).example('c bon les frites').description('Description of the film'),
                    dateSortie: Joi.date().required().description('Release date of the film'),
                    realisateur: Joi.string().required().min(3).example('Jeff Tuche').description('Director of the film'),
                }),
            },
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.createFilm(request.payload);
        },
    },

    {
        method: 'DELETE',
        path: '/films/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('Film ID'),
                }),
            },
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.deleteFilm(request.params.id);
        },
    },

    {
        method: 'PATCH',
        path: '/films/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('Film ID'),
                }),
                payload: Joi.object({
                    titre: Joi.string().min(3).example('Les Tuches').description('Title of the film'),
                    description: Joi.string().min(10).example('c bon les frites').description('Description of the film'),
                    dateSortie: Joi.date().description('Release date of the film'),
                    realisateur: Joi.string().min(3).example('Jeff Tuche').description('Director of the film'),
                }),
            },
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.updateFilm(request.params.id, request.payload);
        },
    },

];

module.exports = filmRoutes;
