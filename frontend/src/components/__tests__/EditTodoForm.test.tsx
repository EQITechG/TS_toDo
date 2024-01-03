import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditTodoForm from '../EditTodoForm';

const mockTodo = {
  id: '123',
  title: 'Test Title',
  description: 'Test Description',
  ordinal: '1',
  dueDate: '2022-01-01T12:00:00Z',
  status: false,
};

test('EditTodoForm renders without errors', () => {
  const { getByText, getByPlaceholderText } = render(<EditTodoForm todo={mockTodo} onUpdate={jest.fn()} onCancel={jest.fn()} />);
  
  // Check if components are rendered as expected
  expect(getByText('Update')).toBeInTheDocument();
  expect(getByPlaceholderText('Select a date & time')).toBeInTheDocument();
});

test('EditTodoForm handles form submission', async () => {
  const onUpdate = jest.fn();
  const onCancel = jest.fn();

  const { getByText, getByPlaceholderText, queryByText } = render(<EditTodoForm todo={mockTodo} onUpdate={onUpdate} onCancel={onCancel} />);

  // Trigger form submission
  fireEvent.click(getByText('Update'));

  // Wait for validation error message
  await waitFor(() => expect(queryByText('All fields are required.')).toBeInTheDocument());

  // Fill in required fields
  fireEvent.change(getByPlaceholderText('Select a date & time'), { target: { value: '2022-01-01' } });

  // Trigger form submission again
  fireEvent.click(getByText('Update'));

  // Wait for validation error message to disappear
  await waitFor(() => expect(queryByText('All fields are required.')).not.toBeInTheDocument());

  // Validate that onUpdate is called
  expect(onUpdate).toHaveBeenCalledWith(mockTodo.id, expect.objectContaining({ dueDate: '2022-01-01T12:00:00Z' }));
});
