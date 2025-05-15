/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('appointments', function(table) {
    table.increments('id').primary();
    table.integer('petId').unsigned().references('id').inTable('pets').onDelete('CASCADE');
    table.integer('doctorId').unsigned().references('id').inTable('doctors').onDelete('CASCADE');
    table.date('date').notNullable();
    table.string('notes');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('appointments');
};
