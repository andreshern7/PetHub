const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();
const authMiddle = require("../middleware/auth.middleware");
const knex = require('../config/db'); // 🔹 Conexión a la base de datos

// 🔹 Obtener perfil de usuario desde la base de datos
router.get('/profile', authMiddle.authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await knex('users').select('id', 'name', 'lastName', 'email', 'userPhoto').where({ id: userId }).first();
    if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener el perfil', details: error });
  }
});

// 🔹 Obtener mascotas del usuario desde la base de datos
router.get('/pets', authMiddle.authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const pets = await knex('pets').where({ ownerId: userId }).select('*');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener mascotas', details: error });
  }
});

// 🔹 Obtener citas médicas de las mascotas del usuario
router.get('/appointments', authMiddle.authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await knex('appointments')
      .join('pets', 'appointments.petId', 'pets.id')
      .select('appointments.*', 'pets.name as petName')
      .where('pets.ownerId', userId);

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener citas', details: error });
  }
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
