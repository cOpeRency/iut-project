'use strict';

const { Film } = require('../models/film');
const { Service } = require('@hapipal/schmervice');
const { response } = require('request/request');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class FilmService extends Service {
    async getAllFilms() {
        const { Film } = await this.server.models();

        return Film.query();
    }

    async getFilmById(id) {
        const { Film } = await this.server.models();

        return Film.query().findById(id).throwIfNotFound();
    }

    async createFilm(filmData) {
        const { Film } = await this.server.models();

        return Film.query().insertAndFetch(filmData);
    }

    async updateFilm(id, updatedFilmData) {
        const { Film } = await this.server.models();

        const filmToUpdate = await Film.query().findById(id);

        if (!filmToUpdate) {
            throw Boom.notFound('Film not found');
        }

        return Film.query().patchAndFetchById(id, updatedFilmData);
    }

    async deleteFilm(id) {
        const { Film } = await this.server.models();

        const film = await Film.query().findById(id);

        if (!film) {
            throw Boom.notFound('Film not found');
        }

        return Film.query().deleteById(id);
    }
}
