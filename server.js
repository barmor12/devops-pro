const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
const mongodbUri = process.env.MONGODB_URI;
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Student model
const Student = mongoose.model('Student', {
  name: String,
  grades: {
    exam1: Number,
    exam2: Number,
    exam3: Number,
  },
});

// Routes
app.post('/register', (req, res) => {
  const { name, exam1, exam2, exam3 } = req.body;

  const student = new Student({
    name,
    grades: {
      exam1,
      exam2,
      exam3,
    },
  });

  student.save((err, savedStudent) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving student');
    }
    res.status(200).json(savedStudent);
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started!');
});

module.exports = app;
