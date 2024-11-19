import "./App.css";
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

export default function App() {
  const [newTodo, setNewTodo] = useState('');

  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />   {/* Pass setNewTodo as onAddTodo prop */}
      <p>New Todo: {newTodo}</p>
      <TodoList />
    </div>
  );
}
