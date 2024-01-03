import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
import TodoItem from './TodoItem';
import { Todo } from '../types/types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let endpoint = 'todos/incomplete';
        if (showCompleted) {
          endpoint = 'todos/completed';
        }

        const response = await fetch(`http://localhost:3001/${endpoint}`);
        const data: Todo[] = await response.json();

        // Custom sorting function
        const customSort = (a: Todo, b: Todo) => {
          const ordinalComparison = parseInt(a.ordinal, 10) - parseInt(b.ordinal, 10);

          if (ordinalComparison !== 0) {
            return ordinalComparison;
          }

          // If ordinal is the same, compare by closest due date
          const dueDateA = new Date(a.dueDate).getTime();
          const dueDateB = new Date(b.dueDate).getTime();

          return dueDateA - dueDateB;
        };

        // Sort todos using the custom sort function
        const sortedTodos = data.sort(customSort);

        setTodos(sortedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [showCompleted]);

  const handleDeleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/todos/delete/${id}`, {
        method: 'DELETE',
      });

      // Update local state to remove the deleted todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string, updatedTodo: Todo) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        // Fetch the updated list of todos after a successful update
        const updatedTodosResponse = await fetch(`http://localhost:3001/todos/incomplete`); // You may need to adjust the endpoint
        const updatedTodos: Todo[] = await updatedTodosResponse.json();
        setTodos(updatedTodos);
      } else {
        throw new Error('Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Fetch the updated list of todos after a successful status update
        const updatedTodosResponse = await fetch(`http://localhost:3001/todos/incomplete`); // You may need to adjust the endpoint
        const updatedTodos: Todo[] = await updatedTodosResponse.json();
        setTodos(updatedTodos);
      } else {
        throw new Error('Failed to toggle status');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  return (
    <div>
  
      <DropDown onChange={setShowCompleted} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
