import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodo from '../AddTodo';

test('AddTodo renders without errors', () => {
  const { getByText, getByPlaceholderText } = render(<AddTodo />);
  
  // Check if components are rendered as expected
  expect(getByText('Enter Todo Title...')).toBeInTheDocument();
  expect(getByPlaceholderText('Select a date & time')).toBeInTheDocument();
});

test('AddTodo handles form submission', async () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<AddTodo />);

  // Trigger form submission
  fireEvent.click(getByText('Add'));

  // Wait for validation error message
  await waitFor(() => expect(queryByText('All fields are required.')).toBeInTheDocument());

  // Fill in required fields
  fireEvent.change(getByPlaceholderText('Enter Todo Title...'), { target: { value: 'Test Title' } });
  fireEvent.change(getByPlaceholderText('Enter Todo Description...'), { target: { value: 'Test Description' } });
  fireEvent.change(getByPlaceholderText('Select a date & time'), { target: { value: '2022-01-01' } });

  // Trigger form submission again
  fireEvent.click(getByText('Add'));

  // Wait for validation error message to disappear
  await waitFor(() => expect(queryByText('All fields are required.')).not.toBeInTheDocument());
});
