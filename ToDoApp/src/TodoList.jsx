import React from 'react';
import TodoListItem from './TodoListItem';

let todoList = [];
todoList = [
  { title: 'Complete Assignment', completed: false, id: 1 },
  { title: 'Push to Github', completed: false,  id: 2 },
  { title: 'Schedule Mentor Session', completed: false,  id: 3 },
];

function TodoList() {
  const listItems = todoList.map(todo =>
    <TodoListItem
      key={todo.id}
      todo={todo}
    />
  );

  return (
    <div>
      <h1>Todo List</h1>
      <ul>{listItems}</ul>
    </div>
  );
}

export default TodoList;
