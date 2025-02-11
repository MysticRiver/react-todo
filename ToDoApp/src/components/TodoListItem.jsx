// src/components/TodoListItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { FaTrash } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

function TodoListItem({ todo, onRemoveTodo, onToggleComplete }) {
  return (
    
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          id={`todo-${todo.id}`}
        />
        <label 
          htmlFor={`todo-${todo.id}`} 
          className={styles.checkIcon}
        >
         {<FaCheck />}
        </label>
      </div>
      <span className={`${styles.title} ${todo.completed ? styles.completed : ''}`}>
        {todo.title}
      </span>
      <button 
        onClick={() => onRemoveTodo(todo.id)}
        className={styles.removeButton}
      >
        <FaTrash />
        Remove
        
      </button>
    </div>
  
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired
};

export default TodoListItem;
