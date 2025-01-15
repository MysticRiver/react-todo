import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ id, label, value, onChange, type = "text", name }) => {  
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input 
        ref={inputRef}
        type={type}
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
     />
    </>
  );
};

export default InputWithLabel;

