const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('users').del();

  const password = '123456';
  const hashedPassword = bcrypt.hashSync(password, 10);

  await knex('users').insert([
    {
      id: 1,
      name: 'Andres',
      lastName: 'Hernandez',
      email: 'andres@gmail.com',
      password: hashedPassword,
      userPhoto: 'https://example.com/alice.jpg',
      role: 'user',
    },
    {
      id: 2,
      name: 'Bob',
      lastName: 'Johnson',
      email: 'bob@gmail.com',
      password: hashedPassword,
      userPhoto: 'https://example.com/bob.jpg',
      role: 'admin',
    },
  ]);
};
