const knex = require('../config/db');

class Pet {
  static getAll() {
    return knex('pets').select('*');
  }

  static getById(id) {
    return knex('pets').where({ id }).first();
  }

  static create(petData) {
    return knex('pets').insert(petData);
  }

  static update(id, petData) {
    return knex('pets').where({ id }).update(petData);
  }

  static delete(id) {
    return knex('pets').where({ id }).del();
  }
}

module.exports = Pet;
