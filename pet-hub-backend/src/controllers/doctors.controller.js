const Doctor = require('../models/doctor.model');

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.getAll();
    res.json(doctors);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.getById(req.params.id);
    res.json(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createDoctor = async (req, res) => {
  try {
    await Doctor.create(req.body);
    res.status(201).send({ message: 'Doctor creado' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    await Doctor.update(req.params.id, req.body);
    res.send({ message: 'Doctor actualizado' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.delete(req.params.id);
    res.send({ message: 'Doctor eliminado' });
  } catch (error) {
    res.status(500).send(error);
  }
};
