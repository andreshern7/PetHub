const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../config/db'); // 🔹 Conexión con la BD

// 🔹 Registro de usuario usando la base de datos
exports.register = async (req, res) => {
  console.log(req.body);
  const { name, lastName, email, password} = req.body;

  try {
    // Verificar si el usuario ya existe en la BD
    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).send({ error: 'El usuario ya existe' });
    }

    // Cifrar la contraseña antes de guardar
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("PASSWORD HASHED")
    const newUser = await knex('users').insert({ name, lastName, email, password: hashedPassword });

    // Generar token de autenticación
    console.log("JWT TOKEN")
    const token = jwt.sign({ id: newUser[0] }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(201).send({ token, message: 'Usuario registrado exitosamente' });

  } catch (error) {
    res.status(500).send({ error: 'Error al registrar usuario', details: error });
  }
};

// 🔹 Login validando usuario en la base de datos
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe en la BD
    const user = await knex('users').where({ email }).first();
    if (!user) {
      return res.status(401).send({ error: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ error: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    req.session.user = { id: user.id, email: user.email, role: user.role };

    res.send({ token, user: req.session.user, message: 'Login exitoso' });

  } catch (error) {
    res.status(500).send({ error: 'Error en el login', details: error });
  }
};
