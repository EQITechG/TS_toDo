import React, { useState, useEffect } from "react";

interface DropdownProps {
  onChange: (showCompleted: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const handleToggle = () => {
    setShowCompleted((prevShowCompleted) => !prevShowCompleted);
  };

  useEffect(() => {
    onChange(showCompleted);
  }, [showCompleted, onChange]);

  return (
    <div>
      <select
        value={showCompleted ? "completed" : "incomplete"}
        onChange={handleToggle}
      >
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default Dropdown;
