const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).send({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.updateUser = async (req, res) => {
  try {
    await User.update(req.params.id, req.body);
    res.send({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, userPhoto } = req.body;

  if (!name && !lastName && !email && !userPhoto) {
    return res.status(400).json({ message: "Debes enviar al menos un dato para actualizar." });
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (lastName) updateData.lastName = lastName;
  if (email) updateData.email = email;
  if (userPhoto) updateData.userPhoto = userPhoto;

  await User.getById(id).update(updateData);
  res.json({ message: "Perfil actualizado correctamente." });
};

exports.updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Debes ingresar la contraseña actual y una nueva." });
  }

  const user = await User.getById(id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

  if (!bcrypt.compareSync(currentPassword, user.password)) {
    return res.status(401).json({ message: "Contraseña actual incorrecta." });
  }

  const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
  await User.getById(id).update({ password: hashedNewPassword });

  res.json({ message: "Contraseña actualizada correctamente." });
};


exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.send({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.assignRole = async (req, res) => {
  try {
    await User.assignRole(req.params.id, req.body.role);
    res.send({ message: 'Rol asignado correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar sesión" });
    }
    res.clearCookie("connect.sid");  // 🔹 Eliminar cookie de sesión si se usa
    res.json({ message: "Sesión cerrada correctamente" });
  });
};