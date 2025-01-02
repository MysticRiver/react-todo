import "./App.css";
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect } from 'react';

//added a null check when initializing from localStorage to prevent errors if there's no saved data
export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ 
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList')) || []
          } 
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>My Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

