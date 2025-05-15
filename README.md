# 🏥 Gestión de Veterinaria - Full Stack App

## 📌 Descripción
Este proyecto es una aplicación web **full stack** para la gestión de veterinaria, permitiendo la administración de usuarios, mascotas y citas médicas. Se implementa una arquitectura **modular y escalable**, asegurando una integración fluida entre **frontend y backend**.

## 🛠️ Tecnologías utilizadas

### **Frontend**
- 🌐 **Angular** - Framework para la interfaz de usuario.
- 🎨 **SCSS** - Diseño visual mejorado.
- 🔗 **HTTPClient** - Comunicación con la API backend.

### **Backend**
- ⚙️ **Node.js + Express** - Servidor backend.
- 🗄️ **Knex.js** - ORM para gestionar la base de datos.
- 🏬 **MySQL** - Base de datos relacional.

### **Seguridad y Autenticación**
- 🔑 **JWT** - Manejo de sesiones con tokens.
- 🔐 **bcrypt** - Hashing de contraseñas.
- 🚧 **CORS** - Configuración segura de acceso entre frontend y backend.

## 🚀 Retos del Proyecto
- ✅ **Gestión de sesiones** - Implementar autenticación con JWT y sesiones en `express-session`.
- ✅ **Optimización de datos** - Uso de `Map` para evitar sobrecarga de peticiones.
- ✅ **Integración de Knex.js** - Manejo de relaciones en la base de datos con migraciones.
- ✅ **Carga dinámica de datos** - Administración eficiente de usuarios, mascotas y doctores.

## 🔧 Instalación y ejecución

### **1 Configurar el Backend**
```sh
git clone https://github.com/TU_USUARIO/NOMBRE_REPO.git
cd backend
npm install

### **2📌 Configura las variables de entorno en .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=veterinaria_db
JWT_SECRET=clave_super_segura

✅ **Este README tiene todo lo necesario para entender el proyecto y ejecutarlo correctamente.**  
📌 **Si quieres agregar más información como endpoints de la API o guías detalladas, dime y lo ajustamos.** 🚀  
¿Qué opinas? 😃
