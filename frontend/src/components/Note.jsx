import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {

    function handleClick(){
        return props.onDelete(props.id)
    }
  return (
    <div className="note">
      <h3>{props.ordinal}</h3>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <p>{props.dueDate}</p>
      <button
      onClick={handleClick}
      >
      <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
