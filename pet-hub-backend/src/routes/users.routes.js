const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddle = require("../middleware/auth.middleware");

router.get('/', authMiddle.verifySession, usersController.getUsers);
router.get('/:id', authMiddle.verifySession, usersController.getUserById);
router.post('/', authMiddle.verifySession, usersController.createUser);
router.put('/:id', authMiddle.verifySession, usersController.updateUser);
router.put('/:id/profile', authMiddle.verifySession, usersController.updateUserProfile);
router.put('/:id/password', authMiddle.verifySession, usersController.updateUserPassword);
router.delete('/:id', authMiddle.verifySession, usersController.deleteUser);
router.put('/:id/role', authMiddle.verifySession, usersController.assignRole);
router.post('/logout', usersController.logout);

module.exports = router;
