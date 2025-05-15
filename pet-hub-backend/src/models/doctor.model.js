const knex = require('../config/db');

class Doctor {
  static getAll() {
    return knex('doctors').select('*');
  }

  static getById(id) {
    return knex('doctors').where({ id }).first();
  }

  static create(doctorData) {
    return knex('doctors').insert(doctorData);
  }

  static update(id, doctorData) {
    return knex('doctors').where({ id }).update(doctorData);
  }

  static delete(id) {
    return knex('doctors').where({ id }).del();
  }
}

module.exports = Doctor;
