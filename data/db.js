const knex = require('./dbConfig');

function getAllUsers() {
  return knex('users');
}

function getUserById(id) {
  return knex('users')
    .where({ id })
    .first();
}

async function addUser(data) {
  const [id] = await knex('users').insert(data);
  return getUserById(id);
}

async function deleteUser(id) {
  const user = await getUserById(id);
  await knex('users')
    .where({ id })
    .del();
  return user;
}

module.exports = {
  getAllUsers, getUserById, addUser, deleteUser,
};
