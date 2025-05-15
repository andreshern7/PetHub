const express = require('express');
const router = express.Router();
const petsController = require('../controllers/pets.controller');

router.get('/', petsController.getPets);
router.get('/:id', petsController.getPetById);
router.post('/', petsController.createPet);
router.put('/:id', petsController.updatePet);
router.delete('/:id', petsController.deletePet);

module.exports = router;
