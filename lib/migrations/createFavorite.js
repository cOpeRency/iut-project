
'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.createTable('favorite', (table) => {
            table.integer('userId').unsigned().notNull().references('id').inTable('user');
            table.integer('filmId').unsigned().notNull().references('id').inTable('film');
            table.primary(['userId', 'filmId']);

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