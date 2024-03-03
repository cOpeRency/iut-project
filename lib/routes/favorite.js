const Joi = require('joi');
const FavoriteService = require('../services/favorite');
const Boom = require('@hapi/boom');

const favoriteService = new FavoriteService();

const favoriteRoutes = [
    {
        method: 'GET',
        path: '/all_favorites',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] },
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            return await favoriteService.getAllFavorites();
        },
    },

    {
        method: 'GET',
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] },
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();

            const userId = request.auth.credentials.id;
            return await favoriteService.getMyFavorites(userId);
        },
    },

    {
        method: 'POST',
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                payload: Joi.object({
                    filmId: Joi.number().integer().required().description('Film ID'),
                    userId: Joi.number().integer().required().description('User ID'),
                }),
            },
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();

            const userId = request.auth.credentials.id;
            const filmId = request.payload.id_film;

            return await favoriteService.createFavorite({ filmId: filmId, userId: userId });

        },
    },


    {
        method: 'DELETE',
        path: '/favorites/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('Favorite ID'),
                }),
            },
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();

            const  userId = request.auth.credentials.id;
            const favorite = await favoriteService.getFavoriteById(request.params.id);

            return await favoriteService.deleteFavorite(userId, favorite.filmId);

        },
    },
];