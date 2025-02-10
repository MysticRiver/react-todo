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
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_AIRTABLE_TABLE_ID}?view=Grid%20view`;
  

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

  const addTodo = async (newTodo) => {
    // Don't proceed if the title is empty
    if (!newTodo.title.trim()) {
      return;
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              title: newTodo.title.trim()
            }
          }
        ]
      })
    };
  
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_AIRTABLE_TABLE_ID}`;
  
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.records && data.records[0]) {
        const addedTodo = {
          id: data.records[0].id,
          title: data.records[0].fields.title
        };
        setTodoList(prevList => [...prevList, addedTodo]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  

  const removeTodo = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
  
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_AIRTABLE_TABLE_ID}/${id}`;
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Only remove from state if the API call was successful
      setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
  
    } catch (error) {
      console.error('Error removing todo:', error);
    }
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
