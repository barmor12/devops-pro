const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Student model
const studentSchema = new mongoose.Schema({
  name: String,
  exam1: Number,
  exam2: Number,
  exam3: Number
});

const Student = mongoose.model('Student', studentSchema);

// Route to serve the HTML registration page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

// Register route
app.post('/register', (req, res) => {
  const { name, exam1, exam2, exam3 } = req.body;
  const student = new Student({
    name: name,
    exam1: exam1,
    exam2: exam2,
    exam3: exam3
  });

  student.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving student data');
    } else {
      res.json({ message: 'Student registered successfully' });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started!');
});

module.exports = { app, server };
