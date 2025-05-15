exports.seed = async function (knex) {
  await knex('appointments').del();

  await knex('appointments').insert([
    {
      id: 1,
      petId: 1,
      doctorId: 1,
      date: '2025-05-20',
      notes: 'Checkup for annual vaccine',
    },
    {
      id: 2,
      petId: 2,
      doctorId: 2,
      date: '2025-05-22',
      notes: 'Nutrition consultation',
    },
  ]);
};
