import React from 'react';

function TodoListItem({ todo }) {  // Destructure todo from props
  return (
    <li>
      {todo.title}                 
    </li>
  );
}

export default TodoListItem;
