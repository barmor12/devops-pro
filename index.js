const { startServer } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 3008;

const server = startServer(port);

module.exports = {
  server,
};
