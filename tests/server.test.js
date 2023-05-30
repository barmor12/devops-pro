const request = require('supertest');
const app = require('./server');

describe('Server', () => {
  it('should return "Hello" for the root route', async () => {
    const res = await request(app).get('/');
    expect(res.text).toEqual('Hello');
    expect(res.statusCode).toBe(200);
  });

  it('should register a student', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        exam1: 80,
        exam2: 75,
        exam3: 90
      });
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('Student registered successfully');
  });
});
