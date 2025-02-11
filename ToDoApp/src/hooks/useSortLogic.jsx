import { useState } from 'react';

function useSortLogic(setTodoList) {
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    setTodoList(prevList => [...prevList].sort((a, b) => {
      if (sortOrder === 'asc') {
        // Sort descending
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      } else {
        // Sort ascending
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
    }));
  };

  return {
    sortOrder,
    toggleSortOrder
  };
}

export default useSortLogic;
