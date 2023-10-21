import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange, maxButtonsToShow = 5 }) => {
  // Calculate the range of pages to display
  const startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

  const pageButtons = [];

  // Create buttons for each page in the range
  for (let page = startPage; page <= endPage; page++) {
    pageButtons.push(
      <button
        key={page}
        onClick={() => onPageChange(page)}
        disabled={page === currentPage}
        className={styles.paginationbutton}
      >
        {page}
      </button>
    );
  }

  return (
    <div className={styles.paginationcontainer}>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className={styles.paginationbutton}>
          Previous
        </button>
      )}
      {pageButtons}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className={styles.paginationbutton}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
