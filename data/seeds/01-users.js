exports.seed = function (knex) {
  return knex('users')
    .truncate()
    .then(() => knex('users').insert([
      { username: 'Finn' },
      { username: 'Steven' },
      { username: 'Izuku' },
    ]));
};
