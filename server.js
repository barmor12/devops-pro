const express = require('express');
const mongoose = require('./db');

const app = express();

app.use(express.json());

app.post('/api/register', (req, res) => {
  // Extract the name and scores from the request body
  const { name, scores } = req.body;

  // Here, you can save the registration data to the MongoDB database using Mongoose
  // Create a new schema and model for the registration data, then save the document

  // Example code to save the data using a schema named 'Registration'
  const Registration = mongoose.model('Registration', {
    name: String,
    scores: [Number],
  });

  const registration = new Registration({ name, scores });
  registration
    .save()
    .then(() => {
      console.log('Registration saved to MongoDB');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Failed to save registration:', error);
      res.sendStatus(500);
    });
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/test', (req, res) => {
  res.send('test Hello');
});

module.exports = app;
