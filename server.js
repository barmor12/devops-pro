const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://barmo2:1Q2w3e123@devops.dyvv7g5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Student Model
const studentSchema = new mongoose.Schema({
  name: String,
  exam1: Number,
  exam2: Number,
  exam3: Number,
});

const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/register', (req, res) => {
  const { name, exam1, exam2, exam3 } = req.body;
  const student = new Student({
    name: name,
    exam1: exam1,
    exam2: exam2,
    exam3: exam3,
  });
  student.save((err, savedStudent) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving student');
    } else {
      res.redirect('/success.html');
    }
  });
});

const server = app.listen(3000, () => {
  console.log('Server Started!');
});

module.exports = {
  app,
  server,
};
module.exports = app;