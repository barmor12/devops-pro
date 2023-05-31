const app = require('./server');
const port = process.env.PORT || 3005;

const server = app.listen(port, () => {
  console.log('Server Started!');
});

module.exports = {
  app,
  server,
};
