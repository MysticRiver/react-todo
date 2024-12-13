import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(todo => (
          <TodoListItem 
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
