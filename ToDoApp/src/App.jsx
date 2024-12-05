import "./App.css";
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect } from 'react'; // Add useEffect import

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]); // Add todoList state

  useEffect(() => {
    // This effect will run whenever todoList changes
    console.log('TodoList has been updated:', todoList);
    // Add any logic you want to execute when todoList changes
  }, [todoList]); // todoList as dependency

  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>New Todo: {newTodo}</p>
      <TodoList />
    </div>
  );

