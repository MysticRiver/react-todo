import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

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
InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string
};

export default InputWithLabel;

