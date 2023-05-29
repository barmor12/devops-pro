import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [score3, setScore3] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || score1 === '' || score2 === '' || score3 === '') {
      alert('Please fill in all fields');
      return;
    }

    const scores = [score1, score2, score3];
    const validScores = scores.every((score) => score >= 0 && score <= 100);

    if (!validScores) {
      alert('Scores must be between 0 and 100');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        name,
        scores,
      });

      console.log(response.data); // For testing purposes, you can remove this line
      alert('Registration successful');
      setName('');
      setScore1('');
      setScore2('');
      setScore3('');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Score in Exam 1:
          <input type="number" value={score1} onChange={(e) => setScore1(e.target.value)} />
        </label>
        <br />
        <label>
          Score in Exam 2:
          <input type="number" value={score2} onChange={(e) => setScore2(e.target.value)} />
        </label>
        <br />
        <label>
          Score in Exam 3:
          <input type="number" value={score3} onChange={(e) => setScore3(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
