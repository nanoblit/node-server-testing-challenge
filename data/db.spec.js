const knex = require('./dbConfig');
const db = require('./db');

beforeEach(async () => {
  await knex('users').truncate();
});

afterEach(async () => {
  await knex('users').truncate();
});

describe('db.getAllUsers()', () => {
  it('gets users from the db and empty array if there are no users', async () => {
    let users = await db.getAllUsers();
    expect(users).toHaveLength(0);

    await knex('users').insert({ username: 'Adam' });
    await knex('users').insert({ username: 'Jesse' });

    users = await db.getAllUsers();
    expect(users).toHaveLength(2);
  });
  it('returns the user and undefined if there is no user with given id', async () => {
    let user = await db.getUserById(1);
    expect(user).toBeUndefined();

    await knex('users').insert({ username: 'Adam' });

    user = await db.getUserById(1);
    expect(user).toEqual({ id: 1, username: 'Adam' });
  });
  it('is able to add users to the db', async () => {
    let users = await knex('users');
    expect(users).toHaveLength(0);

    await db.addUser({ username: 'Adam' });
    await db.addUser({ username: 'Jesse' });

    users = await knex('users');
    expect(users).toHaveLength(2);
  });

  it('is able to return the added user', async () => {
    const user = await db.addUser({ username: 'Adam' });
    expect(user).toEqual({ id: 1, username: 'Adam' });
  });
  it('is able to delete users from the db', async () => {
    let users = await knex('users');
    expect(users).toHaveLength(0);
    await knex('users').insert({ username: 'Adam' });
    users = await knex('users');
    expect(users).toHaveLength(1);
    await db.deleteUser(1);
    users = await knex('users');
    expect(users).toHaveLength(0);
  });

  it('is able return deleted users from the db', async () => {
    await knex('users').insert({ username: 'Adam' });
    const user = await db.deleteUser(1);
    expect(user).toEqual({ id: 1, username: 'Adam' });
  });
});
