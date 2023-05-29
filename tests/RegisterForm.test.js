import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import RegisterForm from './RegisterForm';

jest.mock('axios');

describe('RegisterForm', () => {
  test('submits registration form with valid data', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Registration successful' } });

    const { getByLabelText, getByText } = render(<RegisterForm />);

    const nameInput = getByLabelText('Student Name:');
    const exam1Input = getByLabelText('Score in Exam 1:');
    const exam2Input = getByLabelText('Score in Exam 2:');
    const exam3Input = getByLabelText('Score in Exam 3:');
    const registerButton = getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(exam1Input, { target: { value: '90' } });
    fireEvent.change(exam2Input, { target: { value: '85' } });
    fireEvent.change(exam3Input, { target: { value: '95' } });

    fireEvent.click(registerButton);

    expect(axios.post).toHaveBeenCalledWith('/api/register', {
      name: 'John Doe',
      scores: ['90', '85', '95'],
    });

    // Wait for the registration to complete
    await Promise.resolve();

    // Expect registration success message
    expect(window.alert).toHaveBeenCalledWith('Registration successful');
  });

  test('displays error message for missing fields', () => {
    const { getByText } = render(<RegisterForm />);

    const registerButton = getByText('Register');

    fireEvent.click(registerButton);

    // Expect error message for missing fields
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  test('displays error message for invalid scores', () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    const nameInput = getByLabelText('Student Name:');
    const exam1Input = getByLabelText('Score in Exam 1:');
    const exam2Input = getByLabelText('Score in Exam 2:');
    const exam3Input = getByLabelText('Score in Exam 3:');
    const registerButton = getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(exam1Input, { target: { value: '90' } });
    fireEvent.change(exam2Input, { target: { value: '85' } });
    fireEvent.change(exam3Input, { target: { value: '105' } });

    fireEvent.click(registerButton);

    // Expect error message for invalid scores
    expect(window.alert).toHaveBeenCalledWith('Scores must be between 0 and 100');
  });
});
