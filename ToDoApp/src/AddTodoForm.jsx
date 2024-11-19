import React from 'react';

function AddTodoForm(props) {      // Add props parameter
  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    props.onAddTodo(todoTitle);    // Call onAddTodo with todoTitle
    console.log(todoTitle);
    event.target.reset();
  };

  return (
    <div>
      <h2>Add New Todo</h2>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>
        <input 
          type="text" 
          id="todoTitle"
          name="title"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
