const knex = require('../config/db');

class User {
  static getAll() {
    return knex('users').select('*');
  }

  static getById(id) {
    return knex('users').where({ id }).first();
  }

  static create(userData) {
    return knex('users').insert(userData);
  }

  static update(id, userData) {
    return knex('users').where({ id }).update(userData);
  }

  static delete(id) {
    return knex('users').where({ id }).del();
  }
  
  static assignRole(id, role) {
    return knex('users').where({ id }).update({ role });
  }
}

module.exports = User;
