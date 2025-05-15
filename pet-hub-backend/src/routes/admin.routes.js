const express = require('express');
const router = express.Router();
const { getAllUsers, getAllPets, updateAppointment, deleteAppointment } = require('../controllers/admin.controller');
const { isAdmin } = require('../middleware/auth.middleware');

router.get('/users', isAdmin, getAllUsers);  // 🔹 Ver todos los usuarios
router.get('/pets', isAdmin, getAllPets);  // 🔹 Ver todas las mascotas
router.put('/appointments/:id', isAdmin, updateAppointment);  // 🔹 Editar cita
router.delete('/appointments/:id', isAdmin, deleteAppointment);  // 🔹 Eliminar cita

module.exports = router;
