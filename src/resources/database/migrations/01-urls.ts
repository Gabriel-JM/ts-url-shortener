import Knex from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('urls', table => {
    table.increments('id').primary().notNullable()
    table.string('hash').notNullable()
    table.string('url').notNullable()
    table.string('expirationDate').notNullable()
  })
}

export const down = (knex: Knex) => knex.schema.dropTable('urls')
