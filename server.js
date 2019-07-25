const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
});

server.post('/users', (req, res) => {
});

server.delete('/users/:id', (req, res) => {
});

module.exports = server;
