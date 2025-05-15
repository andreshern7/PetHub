const knex = require('../config/db');

class Appointment {
  static getAll() {
    return knex('appointments').select('*');
  }

  static getById(id) {
    return knex('appointments').where({ id }).first();
  }

  static create(appointmentData) {
    return knex('appointments').insert(appointmentData);
  }

  static update(id, appointmentData) {
    return knex('appointments').where({ id }).update(appointmentData);
  }

  static delete(id) {
    return knex('appointments').where({ id }).del();
  }
}

module.exports = Appointment;
