const request = require('supertest');
const { startServer } = require('../server');
const mongoose = require('mongoose');

describe('Server API Endpoints', () => {
  let server;
  let db;

  beforeAll(async () => {
    server = startServer(4000);
    db = mongoose.connection;
    await db.once('open', () => {
      console.log('Connected to MongoDB for testing');
    });
  });

  afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  });

  test('POST /register - Success', async () => {
    const studentData = { name: 'Test Student', exam1: 85, exam2: 90, exam3: 80 };
    const response = await request(server).post('/register').send(studentData);
    expect(response.status).toEqual(302);
  });

  test('POST /register - Failure due to invalid grades', async () => {
    const studentData = { name: 'Test Student', exam1: 85, exam2: -10, exam3: 80 };
    const response = await request(server).post('/register').send(studentData);
    expect(response.status).toEqual(400);
    expect(response.text).toEqual('Invalid grades');
  });

  test('POST /register - Failure due to missing body data', async () => {
    const studentData = {};
    const response = await request(server).post('/register').send(studentData);
    expect(response.status).toEqual(400);
    expect(response.text).toEqual('Missing required fields');
  });
  
});
