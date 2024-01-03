import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../TodoItem';

const mockTodo = {
  id: '123',
  title: 'Test Title',
  description: 'Test Description',
  ordinal: '1',
  dueDate: '2022-01-01T12:00:00Z',
  status: false,
};

test('TodoItem renders without errors', () => {
  const { getByText } = render(<TodoItem todo={mockTodo} onDelete={jest.fn()} onUpdate={jest.fn()} onToggleStatus={jest.fn()} />);
  
  // Check if components are rendered as expected
  expect(getByText('Test Title')).toBeInTheDocument();
  expect(getByText('Test Description')).toBeInTheDocument();
});

test('TodoItem handles actions', () => {
  const onDelete = jest.fn();
  const onUpdate = jest.fn();
  const onToggleStatus = jest.fn();

  const { getByText } = render(<TodoItem todo={mockTodo} onDelete={onDelete} onUpdate={onUpdate} onToggleStatus={onToggleStatus} />);

  // Trigger actions
  fireEvent.click(getByText('Edit'));
  fireEvent.click(getByText('Delete'));
  fireEvent.click(getByText('Done'));

  // Validate that corresponding functions are called
  expect(onUpdate).toHaveBeenCalled();
  expect(onDelete).toHaveBeenCalledWith(mockTodo.id);
  expect(onToggleStatus).toHaveBeenCalledWith(mockTodo.id, true);
});
