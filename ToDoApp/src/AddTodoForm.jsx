import React from 'react';

function AddTodoForm() {
  return (
    <div>
      <h2>Add New Todo</h2>
      <form>
        <label htmlFor="todoTitle">Title</label>
        <input type="text" id="todoTitle" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
