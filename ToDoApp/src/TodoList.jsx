import React from 'react';

function TodoList({ todoList }) {
  const listItems = todoList.map(todo => (
    <li key={todo.id}>
      <input 
        type="checkbox"
        checked={todo.completed}
      />
      <span>{todo.title}</span>
      <button>
        Delete
      </button>
    </li>
  ));

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

export default TodoList;
