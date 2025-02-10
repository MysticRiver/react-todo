import React from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ todoTitle, handleTitleChange, id, label }) => {  
 

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
     />
    </>
  );
};
InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputWithLabel;

