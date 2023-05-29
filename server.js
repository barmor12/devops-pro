const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/test', (req, res) => {
  res.send('test Hello');
});

app.post('/register', (req, res) => {
  const { name, scores } = req.body;
  const isValid = scores.every((score) => score >= 0 && score <= 100);

  if (!isValid) {
    res.status(400).json({ error: 'Scores must be between 0 and 100' });
    return;
  }

  const data = {
    name,
    scores,
  };

  const filePath = path.join(__dirname, 'data.txt');

  fs.appendFile(filePath, JSON.stringify(data) + '\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to register' });
    } else {
      res.status(201).json({ message: 'Registration successful' });
    }
  });
});

module.exports = app;
