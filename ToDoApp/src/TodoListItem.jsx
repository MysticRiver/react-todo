import React from 'react';

function TodoListItem({ todo }) {
  return (
    <li>
      <input 
        type="checkbox"
        checked={todo.completed}
      />
      <span>{todo.title}</span>
      <button>
        Delete
      </button>
    </li>
  );
}

export default TodoListItem;
