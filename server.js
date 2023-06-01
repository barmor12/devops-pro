const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://barmo2:1Q2w3e123@devops.dyvv7g5.mongodb.net/test', {
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

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.render('students', { students }); // Render a new page called 'students' and pass the retrieved students as data
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving students'); // Return 500 status code for error
  }
});

app.post('/register', async (req, res) => {
  const { name, exam1, exam2, exam3 } = req.body;

  // Check if required fields are present
  if (!name || exam1 === undefined || exam2 === undefined || exam3 === undefined) {
    return res.status(400).send('Missing required fields');
  }

  // Check if grades are valid (between 0 and 100)
  if (exam1 < 0 || exam1 > 100 || exam2 < 0 || exam2 > 100 || exam3 < 0 || exam3 > 100) {
    return res.status(400).send('Invalid grades'); // Return 400 status code for invalid grades
  }

  try {
    const student = new Student({
      name: name,
      exam1: exam1,
      exam2: exam2,
      exam3: exam3,
    });

    const savedStudent = await student.save();
    console.log('Student saved:', savedStudent);
    res.redirect('/students'); // Redirect to the '/students' route after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving student'); // Return 500 status code for error
  }
});

function startServer(port) {
  app.set('view engine', 'ejs'); // Set EJS as the template engine
  app.set('views', path.join(__dirname, 'views')); // Set the directory for views

  return app.listen(port, () => {
    console.log('Server Started!');
  });
}

module.exports = {
  startServer,
};
