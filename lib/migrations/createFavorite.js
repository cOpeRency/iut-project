
'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').primary();
            table.integer('userId').notNull().references('id').inTable('user');
            table.integer('filmId').notNull().references('id').inTable('film');

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        }

        );
    }
    ,
    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }

};