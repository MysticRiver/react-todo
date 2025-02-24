import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ todoTitle, handleTitleChange, id, children }) => {  
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input 
        ref={inputRef}
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
  children: PropTypes.node.isRequired
};

export default InputWithLabel;


