import React from 'react';

function AddTodoForm() {
  const handleAddTodo = (event) => {
    event.preventDefault();                         // Prevent form submission
    const todoTitle = event.target.title.value;    // Get title value from form
    console.log(todoTitle);                        // Log the title
    event.target.reset();                          // Reset the form
  };

  return (
    <div>
      <h2>Add New Todo</h2>
      <form onSubmit={handleAddTodo}>              {/* Add onSubmit handler */}
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
