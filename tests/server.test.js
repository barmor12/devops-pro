const request = require('supertest');
const { startServer } = require('../server');
const mongoose = require('mongoose');

// Import the Student model
const Student = mongoose.model('Student');

// Test the registration endpoint
describe('Registration Endpoint', () => {
  let server;

  beforeAll(() => {
    // Start the server before running the tests
    server = startServer(3009);
  });

  afterAll(async () => {
    // Close the server and disconnect from the database after running the tests
    await server.close();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the Student collection before each test
    await Student.deleteMany();
  });

  it('should register a new student', async () => {
    const studentData = {
      name: 'John Doe',
      exam1: 85,
      exam2: 90,
      exam3: 95,
    };

    // Send a POST request to the registration endpoint
    const response = await request(server).post('/register').send(studentData);

    // Check the response status and body
    expect(response.status).toBe(302); // Expect a redirect
    expect(response.header.location).toBe('/success.html'); // Expect a redirect to success.html

    // Check if the student was saved in the database
    const students = await Student.find();
    expect(students).toHaveLength(1);
    expect(students[0].name).toBe(studentData.name);
    expect(students[0].exam1).toBe(studentData.exam1);
    expect(students[0].exam2).toBe(studentData.exam2);
    expect(students[0].exam3).toBe(studentData.exam3);
  });

  it('should return an error for missing required fields', async () => {
    const studentData = {
      name: 'John Doe',
      exam1: 85,
      exam2: 90,
      // Missing exam3 field
    };

    // Send a POST request to the registration endpoint
    const response = await request(server).post('/register').send(studentData);

    // Check the response status and body
    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing required fields');

    // Check that no student was saved in the database
    const students = await Student.find();
    expect(students).toHaveLength(0);
  });

  it('should return an error for invalid grades', async () => {
    const studentData = {
      name: 'John Doe',
      exam1: 85,
      exam2: 101, // Invalid grade (out of range)
      exam3: 95,
    };

    // Send a POST request to the registration endpoint
    const response = await request(server).post('/register').send(studentData);

    // Check the response status and body
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid grades');

    // Check that no student was saved in the database
    const students = await Student.find();
    expect(students).toHaveLength(0);
  });
});