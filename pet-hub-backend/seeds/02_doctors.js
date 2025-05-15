exports.seed = async function (knex) {
  await knex('doctors').del();

  await knex('doctors').insert([
    {
      id: 1,
      name: 'Dr. John',
      lastName: 'Doe',
      specialty: 'Veterinary Surgery',
      email: 'john.doe@vetclinic.com',
      doctorPhoto: 'https://example.com/john.jpg',
    },
    {
      id: 2,
      name: 'Dr. Emily',
      lastName: 'Clark',
      specialty: 'Animal Nutrition',
      email: 'emily.clark@vetclinic.com',
      doctorPhoto: 'https://example.com/emily.jpg',
    },
  ]);
};
