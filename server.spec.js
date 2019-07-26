const request = require('supertest');
const knex = require('./data/dbConfig');
const server = require('./server');

beforeEach(async () => {
  await knex('users').truncate();
});

afterEach(async () => {
  await knex('users').truncate();
});

describe('server', () => {
  it('[GET] /users works', async () => {
    await knex('users').insert([{ username: 'Adam' }, { username: 'Jesse' }, { username: 'Alex' }]);
    const res = await request(server)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '83');
    expect(res.body).toEqual([
      { id: 1, username: 'Adam' },
      { id: 2, username: 'Jesse' },
      { id: 3, username: 'Alex' },
    ]);
  });

  it('[POST] /users works', async () => {
    const res = await request(server)
      .post('/users')
      .send({ username: 'John' })
      .expect(201);
    expect(res.body).toEqual({ id: 1, username: 'John' });
  });

  it('[DELETE] /users works', async () => {
    await knex('users').insert({ username: 'Adam' });
    const res = await request(server)
      .del('/users/1')
      .expect(200);
    expect(res.body).toEqual({ id: 1, username: 'Adam' });
  });
});
