const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // 🔹 Extrae el token del encabezadod

  if (!token) {
    return res.status(401).send({ error: 'Acceso denegado, token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }

    req.user = decoded;  // 🔹 Guarda los datos del usuario autenticado en `req.user`
    next();
  });
};

const verifySession = (req, res, next) => {
  // console.log(req.session);
  // if (!req.session.user) {
  //   return res.status(401).json({ message: "Sesión no válida. Inicia sesión." });
  // }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado. No eres administrador." });
  }
  next();
};

module.exports = { authenticate, verifySession, isAdmin };


// .verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) return res.status(403).send('Token requerido');

//   jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
//     if (err) return res.status(401).send('Token inválido');

//     req.userId = decoded.id;
//     next();
//   });
// };