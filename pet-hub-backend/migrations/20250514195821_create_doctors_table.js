/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('doctors', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('lastName').notNullable();
    table.string('specialty').notNullable();
    table.string('email').unique().notNullable();
    table.string('doctorPhoto');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('doctors');
};