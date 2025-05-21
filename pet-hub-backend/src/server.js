const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const session = require('express-session');

dotenv.config();
const app = express();

app.use(express.json()); 

app.use(cors({
  origin: 'http://localhost:4200',  // 🔹 Permitir peticiones solo desde el frontend
  credentials: true  // 🔹 Habilitar envío de cookies en las peticiones
}));

app.use(session({
  secret: process.env.SESSION,  // 🔹 Cambia esto por una clave aleatoria segura
  resave: false,  // No guarda sesión si no hubo cambios
  saveUninitialized: false,  // No guarda sesiones vacías
  cookie: { secure: false, httpOnly: true, sameSite: 'none', maxAge: 3600000 }  // 🔹 1 hora de sesión
}));

// Importar los routers
const authRoutes = require('./routes/auth.routes');
const petsRoutes = require('./routes/pets.routes');
const appointmentsRoutes = require('./routes/appointments.routes');
const doctorsRoutes = require('./routes/doctors.routes');
const usersRoutes = require('./routes/users.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/doctors', doctorsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});