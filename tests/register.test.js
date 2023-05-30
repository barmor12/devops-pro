const request = require('supertest');
const app = require('../server');

describe('Registration Page:', () => {
  test('Registers a student and returns the saved student', async () => {
    const student = {
      name: 'John Doe',
      exam1: 85,
      exam2: 90,
      exam3: 78,
    };

    const res = await request(app).post('/register').send(student);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(student.name);
    expect(res.body.grades.exam1).toEqual(student.exam1);
    expect(res.body.grades.exam2).toEqual(student.exam2);
    expect(res.body.grades.exam3).toEqual(student.exam3);
  });
});
