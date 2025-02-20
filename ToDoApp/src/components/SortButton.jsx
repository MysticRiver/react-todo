import React from 'react';
import PropTypes from 'prop-types';
import styles from './SortButton.module.css';

function SortButton({ sortOrder, onSortToggle }) {
  return (
    <button onClick={onSortToggle} className={styles.sortButton}>
      Sort {sortOrder === 'asc' ? '↓' : '↑'}
    </button>
  );
}

SortButton.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  onSortToggle: PropTypes.func.isRequired
};

export default SortButton;
