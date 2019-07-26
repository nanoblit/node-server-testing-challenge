const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/users', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.post('/users', async (req, res) => {
  try {
    const { body } = req;
    const user = await db.addUser(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = server;
