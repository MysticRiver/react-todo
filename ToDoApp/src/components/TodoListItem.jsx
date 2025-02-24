// TodoListItem.jsx
import React from 'react';
import style from './TodoListItem.module.css';
import '../index.css'
import { FaTrash } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <div className={style.container}>
      <li className={style.listItem}>
        <div className={style.checkboxContainer}>
          <input 
            className={style.checkbox}
            type="checkbox"
            checked={todo.completed}
          />
          <span className={style.checkIcon}>
            {todo.completed && <FaCheck />}
          </span>
        </div>
        <span className={`${style.title} ${todo.completed ? style.completed : ''}`}>
          {todo.title}
        </span>
        <button 
          className={style.button}
          type="button"
          onClick={() => onRemoveTodo(todo.id)}
        >
          <FaTrash /> Remove
        </button>
      </li>
    </div>
  );
}
//Added Prop Types for the TodoListItem component
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired
};


export default TodoListItem