/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Pagination.module.css";

const Pagination = ({
  filteredProducts,
  cardsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const darkMode = useSelector((state) => state.darkMode);

  let pages = [];
  let totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let pagesToShow;

  if (currentPage >= 5 && currentPage <= totalPages - 5) {
    pagesToShow = pages.slice(currentPage - 5, currentPage + 4);
  } else if (currentPage > 5 && currentPage >= totalPages - 5) {
    pagesToShow = pages.slice(totalPages - 9, totalPages);
  } else {
    pagesToShow = pages.slice(0, 9);
  }

  let isMinimumToRender = filteredProducts.length > cardsPerPage;

  const handleCurrentPage = (value) => {
    let checkValue = currentPage + value;
    if (checkValue > totalPages || checkValue < 1) return;
    setCurrentPage((prev) => prev + value);
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode}`}>
      {isMinimumToRender && (
        <button
          className={`${styles.paginator_buttons} ${darkMode ? styles.darkMode : styles.lightMode}`}
          onClick={() => handleCurrentPage(-1)}
        >
          Prev
        </button>
      )}
      <div className={`${styles.paginator} ${darkMode ? styles.darkMode : styles.lightMode}`}>
        {isMinimumToRender &&
          pagesToShow.map((page, index) => {
            return (
              <button
                key={index}
                className={`${styles.button} ${
                  currentPage === page ? styles.button__selected : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
      </div>
      {isMinimumToRender && (
        <button
          className={`${styles.paginator_buttons} ${darkMode ? styles.darkMode : styles.lightMode}`}
          onClick={() => handleCurrentPage(1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
