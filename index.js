const { startServer } = require('./server');
const port = process.env.PORT || 3000;

const server = startServer(port);

module.exports = {
  server,
};
