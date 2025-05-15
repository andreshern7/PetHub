const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");

const testUser = {
  id: 1,
  name: "Andrés",
  lastName: "Gómez",
  age: 28,
  email: "andres@example.com",
  profilePicture: "https://via.placeholder.com/100"
};

router.get('/profile', authenticate, (req, res) => {
  const userId = req.user.id;

//   db.query('SELECT name, lastName, age, email, profilePicture FROM users WHERE id = ?', [userId], (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.send(results[0]);
//   });
    res.status(200).json(testUser);
});

module.exports = router;