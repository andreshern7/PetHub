const mysql = require('mysql2');
const dotenv = require('dotenv');

const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig.development);

dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// db.connect(err => {
//   if (err) {
//     console.error('❌ Error al conectar a MySQL:', err);
//     return;
//   }
//   console.log('✅ Conectado a la base de datos MySQL');
// });

module.exports = knex;
// module.exports = db;
