const mongoose = require('mongoose');

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
const connectionString = 'your_mongodb_connection_string';

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
