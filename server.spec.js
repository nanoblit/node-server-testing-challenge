const request = require('supertest');
const knex = require('./data/dbConfig');
const server = require('./server');

beforeEach(async () => {
  await knex('users').truncate();
});

describe('server', () => {
  it('[GET] /users works', async () => {
    await knex('users').insert([{ username: 'Adam' }, { username: 'Jesse' }, { username: 'Alex' }]);
    await request(server)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '83')
      .then(res => {
        expect(res.body).toEqual([
          { id: 1, username: 'Adam' },
          { id: 2, username: 'Jesse' },
          { id: 3, username: 'Alex' },
        ]);
      });
  });

  it('[POST] /users works', () => request(server)
    .post('/users')
    .send({ username: 'Adam' })
    .expect(201)
    .then(res => {
      expect(res.body).toEqual({ id: 1, username: 'Adam' });
    }));

  it('[DELETE] /users works', async () => {
    await knex('users').insert({ username: 'Adam' });
    await request(server)
      .del('/users')
      .send(1)
      .expect(201)
      .then(res => {
        expect(res.body).toEqual({ id: 1, username: 'Adam' });
      });
  });
});
