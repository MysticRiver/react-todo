import "./App.css";
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useState, useEffect } from 'react';
import SortButton from './components/SortButton';
import useSortLogic from './hooks/useSortLogic';
import { NavLink } from 'react-router-dom';

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  
    
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { sortOrder, toggleSortOrder } = useSortLogic(setTodoList);
  
  const toggleComplete = async (id) => {
    // First find the todo item
    const todoToUpdate = todoList.find(todo => todo.id === id);
    if (!todoToUpdate) return;
  
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          completed: !todoToUpdate.completed
        }
      })
    };
  
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_AIRTABLE_TABLE_ID}/${id}`;
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Update local state
      setTodoList(prevList =>
        prevList.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  
  
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_AIRTABLE_TABLE_ID}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`;
  

    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      } 

      
      
      const todosFromAPI = await response.json();
      
      const todos = todosFromAPI.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
        completed: todo.fields.completed || false
      }));

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
 // Update useEffect to include sortOrder in dependencies
useEffect(() => {
  fetchData();
}, [sortOrder]); // This will refetch when sort order changes

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
              title: newTodo.title.trim(),
              completed: false
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
 //Extra Credit : Added a button to toggle the sort order
 return (
  <>
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/new" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              New Todo
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <h1>Todo List: {tableName}</h1>
              <div className="controls">
                <SortButton 
                  sortOrder={sortOrder} 
                  onSortToggle={toggleSortOrder} 
                />
                <AddTodoForm onAddTodo={addTodo} />
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList 
                  todoList={todoList} 
                  onRemoveTodo={removeTodo}  
                  onToggleComplete={toggleComplete}
                />
              )}
            </>
          }
        />
        <Route 
          path="/new" 
          element={
            <>
              <h1>New Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
            </>
          }
        />
      </Routes>
    </Router>
  </>
  )};
