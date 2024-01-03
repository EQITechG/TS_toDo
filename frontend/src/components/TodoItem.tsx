// TodoItem.tsx
import React, { useState } from 'react';
import EditTodoForm from './EditTodoForm';
import { Todo } from '../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTodo: Todo) => void;
  onToggleStatus: (id: string, newStatus: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate, onToggleStatus }) => {
    const [isEditing, setIsEditing] = useState(false);
  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    await onUpdate(todo.id, updatedTodo);
    setIsEditing(false);
  };
  const handleToggleStatus = () => {
    const newStatus = !todo.status;
    onToggleStatus(todo.id, newStatus);
  };

  const formattedDueDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(todo.dueDate));

  return (
    <div className="note">
      {isEditing ? (
        <EditTodoForm todo={todo} onUpdate={handleUpdateTodo} onCancel={() => setIsEditing(false)} />
      ) : (
       <>
      <h3>{todo.title} </h3>
      <p>{todo.description} </p>
      <p> Due: {formattedDueDate}</p>
      {/* <p>{todo.ordinal} </p> */}
      <div className="button-container">
      <button onClick={handleEditClick}>
        <EditIcon />
      </button>
      <div className="status-container">
      <button onClick={handleToggleStatus}>
        <AssignmentTurnedInOutlinedIcon />
      {todo.status ? 'Undo' : 'Done'} 
      </button>
      </div>
      <button onClick={handleDeleteClick}>
            <DeleteIcon />
          </button>
      </div>
      </>
      )}
   </div>
  );
};

export default TodoItem;
