const knex = require('../config/db');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await knex('users').select('id', 'name', 'email', 'role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await knex('pets').select('*');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener mascotas", error });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, notes } = req.body;

  if (!date && !notes) {
    return res.status(400).json({ message: "Debes enviar al menos un dato para actualizar." });
  }

  const updateData = {};
  if (date) updateData.date = date;
  if (notes) updateData.notes = notes;

  try {
    await knex('appointments').where({ id }).update(updateData);
    res.json({ message: "Cita actualizada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cita", error });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await knex('appointments').where({ id }).del();
    res.json({ message: "Cita eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cita", error });
  }
};
