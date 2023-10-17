// import React from "react";
// import style from './Pagination.module.css'

// const Pagination = ({ totalCards, cardsPerPage, setCurrentPage, currentPage }) => {
//     let pages = [];

//     for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
//         pages.push(i);
//     }

//     return (
//         <div className="pagination">
//             {pages.map((page, index) => (
//                 <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? style.active : ''}>{page}</button>
//             )}
//         </div>
//     )
// }

// export default Pagination;
