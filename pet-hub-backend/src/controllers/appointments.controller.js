const Appointment = require('../models/appointment.model');

exports.createAppointment = async (req, res) => {
  try {
    await Appointment.create(req.body);
    res.status(201).send({ message: 'Cita médica creada' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.getAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.getById(req.params.id);
    res.json(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.updateAppointment = async (req, res) => {
  try {
    await Appointment.update(req.params.id, req.body);
    res.send({ message: 'Cita actualizada' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.delete(req.params.id);
    res.send({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).send(error);
  }
};
