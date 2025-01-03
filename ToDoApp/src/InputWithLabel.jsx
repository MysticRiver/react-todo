import React, { useRef, useEffect } from 'react';

const InputWithLabel = (props) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">Title:</label>
      <input 
        ref={inputRef}
        type="text" 
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
     />
    </>
  );
};

export default InputWithLabel;
