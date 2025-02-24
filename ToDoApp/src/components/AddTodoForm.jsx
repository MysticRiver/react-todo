import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';


function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({
      
      title: todoTitle
    });
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel 
  todoTitle={todoTitle}
  handleTitleChange={handleTitleChange}
  id="todoTitle"
>
  Title
</InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired
};

export default AddTodoForm;
