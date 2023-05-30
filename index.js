const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string
const mongoURI = 'mongodb+srv://barmo2:1Q2w3e123@devops.dyvv7g5.mongodb.net/';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successful MongoDB connection
    app.listen(port, () => {
      console.log('Server started!');
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Define your routes and middleware here
// ...

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
