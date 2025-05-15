exports.seed = async function (knex) {
  await knex('pets').del();

  await knex('pets').insert([
    {
      id: 1,
      name: 'Max',
      age: 5,
      petPhoto: 'https://example.com/max.jpg',
      ownerId: 1, // Alice
    },
    {
      id: 2,
      name: 'Bella',
      age: 3,
      petPhoto: 'https://example.com/bella.jpg',
      ownerId: 2, // Bob
    },
  ]);
};
