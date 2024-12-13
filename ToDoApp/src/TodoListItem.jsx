import React from 'react';

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li>
      <input 
        type="checkbox"
        checked={todo.completed}
      />
      <span>{todo.title}</span>
      <button 
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;


