import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

test('TodoList renders without errors', async () => {
  const { getByText, getByTestId } = render(<TodoList />);
  
  // Check if components are rendered as expected
  expect(getByText('Show Completed')).toBeInTheDocument();
  await waitFor(() => expect(getByTestId('todo-item-list')).toBeInTheDocument());
});


