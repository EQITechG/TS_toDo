import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface NewTodo {
  title: string;
  description: string;
  dueDate: string;
  ordinal: string;
  status: boolean;
}

const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<NewTodo>({
    title: "",
    description: "",
    dueDate: "",
    ordinal: "",
    status: false,
  });
  const [isExpanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      dueDate: date?.toISOString() || "",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleAddTodo = async () => {
    if (!newTodo.title || !newTodo.dueDate || !newTodo.description) {
      setValidationError("All fields are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      // handle the response data
      const responseData = await response.json();
      console.log("Todo added successfully:", responseData);

      // Refresh the todo list after adding a new todo
      window.location.reload();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  function handleExpand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        <input
          onClick={handleExpand}
          type="text"
          name="title"
          placeholder="Enter Todo Title..."
          value={newTodo.title}
          onChange={handleInputChange}
        />

        {isExpanded && (
          <textarea
            onChange={handleInputChange}
            name="description"
            placeholder="Enter Todo Description..."
            rows={isExpanded ? 5 : 1}
            value={newTodo.description}
          />
        )}

        {isExpanded && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="dd/MM/yyyy h:mm aa"
            placeholderText="Select a date & time"
          />
        )}

        {isExpanded && (
          <select
            id="priority"
            name="ordinal"
            value={newTodo.ordinal}
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
        )}
{validationError && <div style={{ color: 'red' }}>{validationError}</div>}
        <Zoom in={isExpanded}>
          <Fab onClick={handleAddTodo}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default AddTodo;
