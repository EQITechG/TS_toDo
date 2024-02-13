// EditTodoForm.tsx
import React, { useState } from "react";
import { Todo } from "../types/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface EditTodoFormProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => Promise<void>; 
  onCancel: () => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
  todo,
  onUpdate,
  onCancel,
}) => {
  const [editedTodo, setEditedTodo] = useState<Todo>({ ...todo });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      dueDate: date?.toISOString() || "",
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    if (!editedTodo.title || !editedTodo.dueDate || !editedTodo.description) {
      setValidationError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/todos/update/${editedTodo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTodo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      onUpdate(editedTodo);
      onCancel();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <div className="overlay">
      <form className="edit-note" id="overlay-content">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={editedTodo.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Priority:
          <select
            id="priority"
            name="ordinal"
            value={editedTodo.ordinal}
            onChange={handleSelectChange}
          >
            <option value="" hidden>
              Priority
            </option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={(index + 1).toString()}>
                {index + 1}
                {index === 0
                  ? "st"
                  : index === 1
                  ? "nd"
                  : index === 2
                  ? "rd"
                  : "th"}
              </option>
            ))}
          </select>
        </label>

        <label>
          Due Date:
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="dd/MM/yyyy h:mm aa"
            // placeholderText="Select a date & time"
          />
        </label>
        {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
        <div className="button-container">

          <button type="button" className="button-edit" onClick={handleUpdateClick}>
  <CheckIcon />
</button>

          <button className="button-edit" onClick={onCancel}>
            <CloseIcon />{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodoForm;
