const Pet = require('../models/pet.model');

exports.createPet = async (req, res) => {
  try {
    console.log(req.body);
    await Pet.create(req.body);
    res.status(201).send({ message: 'Mascota creada' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.getAll();
    res.json(pets);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.getById(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, petPhoto } = req.body;

    // 🔹 Verificar que al menos un campo sea enviado
    if (!name && !age && !petPhoto) {
      return res.status(400).json({ message: "Debes enviar al menos un dato para actualizar." });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (petPhoto) updateData.petPhoto = petPhoto;

    await Pet.update(id, updateData);
    res.send({ message: 'Mascota actualizada' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletePet = async (req, res) => {
  try {
    await Pet.delete(req.params.id);
    res.send({ message: 'Mascota eliminada' });
  } catch (error) {
    res.status(500).send(error);
  }
};
