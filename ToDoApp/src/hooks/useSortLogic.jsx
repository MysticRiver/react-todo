import { useState } from 'react';

function useSortLogic(fetchData) {
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    fetchData(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return {
    sortOrder,
    toggleSortOrder
  };
}

export default useSortLogic;
