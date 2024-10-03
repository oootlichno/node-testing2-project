const db = require('./data/db-config');
const express = require('express');
const Person = require('./data/api/person')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/person', (req, res) => {
 Person.getAll()
 .then(p => {
    res.status(200).json(p)
 })
 .catch(err => {
    res.status(500).json(err);
 })
});

server.get("/person/id", (req, res) => {
    res.end()
  });
  
  server.post("/person", (req, res) => {
    res.end()
  });

  server.put("/person/:id", (req, res) => {
    res.end()
  });
  
  server.delete("/person/:id", (req, res) => {
    res.end()
  });
  
 

module.exports = server;