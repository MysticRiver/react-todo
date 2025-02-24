import "./App.css";
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useState, useEffect } from 'react';

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  
    
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  

    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      } 

      
      
      const todosFromAPI = await response.json();
      
      const todos = todosFromAPI.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title
      }));

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList(prevTodoList => prevTodoList.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <h1>My Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </>
            }
          />
           <Route 
          path="/new" 
          element={
            <>
              <h1>New Todo List</h1>
               {/*Extra Credit : Added a Form for adding new todos */}
               <AddTodoForm onAddTodo={addTodo} />
            </>
          }
        />
        </Routes>
      </Router>
    </>
  )};
