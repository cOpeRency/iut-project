'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {
            table.string('username').notNull();
            table.string('email').notNull();
            table.string('password').notNull();
        });
    },

    async down(knex) {

        await knex.schema.table('user', (table) => {
            table.string('username').notNull();
            table.dropColumn('email');
            table.dropColumn('password');
        });
    }
}