'use strict';

const { Service } = require('@hapipal/schmervice');
const { response } = require('request/request');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class FavoriteService extends Service {
    async getAllFavorites() {
        const { Favorite } = await this.server.models();

        return Favorite.query();
    }

    async getMyFavorites(userId) {
        const { Favorite } = await this.server.models();

        return Favorite.query().where('userId', userId);
    }

    async createFavorite(favoriteData) {
        const { Favorite } = await this.server.models();

        const esxistingFavorite = await Favorite.query().where('userId', favoriteData.userId).where('filmId', favoriteData.filmId);

        if (esxistingFavorite.length > 0) {
            throw Boom.badRequest('Favorite already exists');
        }

        return Favorite.query().insertAndFetch(favoriteData);
    }

    async updateFavorite(id, updatedFavoriteData) {
        const { Favorite } = await this.server.models();

        const favoriteToUpdate = await Favorite.query().findById(id);

        if (!favoriteToUpdate) {
            throw Boom.notFound('Favorite not found');
        }

        return Favorite.query().patchAndFetchById(id, updatedFavoriteData);
    }

    async deleteFavorite(userId, filmId) {
        const { Favorite } = await this.server.models();

        const favorite = await Favorite.query().where({
            user_id: userId,
            movie_id: filmId
        });

        if (favorite.length === 0) {
            throw Boom.notFound('The flim is not in your favorite list');
        }

        return Favorite.query().where({
            user_id: userId,
            movie_id: filmId
        }).delete();
    }
}