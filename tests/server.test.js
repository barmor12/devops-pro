const request = require('supertest');
const { app, server } = require('../index');

describe('Registration API', () => {
  afterAll(() => {
    // Close the server after all tests
    server.close();
  });

  it('should register a new student', async () => {
    const studentData = {
      name: 'Bar Mor',
      exam1: 80,
      exam2: 90,
      exam3: 85,
    };

    const response = await request(server)
      .post('/register')
      .send(studentData);

    expect(response.status).toBe(302);
    expect(response.text).toBe('Found. Redirecting to /success.html');
  });

  it('should return an error for invalid student data', async () => {
    const invalidStudentData = {
      name: 'John Doe',
      exam1: 'invalid',
      exam2: 90,
      exam3: 85,
    };

    const response = await request(server)
      .post('/register')
      .send(invalidStudentData);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Error saving student');
  });
});
