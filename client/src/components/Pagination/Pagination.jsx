import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageButtons = [];

  // Create buttons for each page
  for (let page = 1; page <= totalPages; page++) {
    pageButtons.push(
      <button key={page} onClick={() => onPageChange(page)} disabled={page === currentPage}>
        Page {page}
      </button>
    );
  }

  return (
    <div className="pagination">
      {pageButtons}
    </div>
  );
};

export default Pagination;
