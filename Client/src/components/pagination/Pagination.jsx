/* eslint-disable react/prop-types */
import styles from "./Pagination.module.css";

const Pagination = ({
  filteredCountries,
  cardsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  let totalPages = Math.ceil(filteredCountries.length / cardsPerPage);
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

  let isMinimumToRender = filteredCountries.length > cardsPerPage;

  const handleCurrentPage = (value) => {
    let checkValue = currentPage + value;
    if (checkValue > totalPages || checkValue < 1) return;
    setCurrentPage((prev) => prev + value);
  };

  return (
    <div className={styles.container}>
      {isMinimumToRender && (
        <button
          className={styles.paginator_buttons}
          onClick={() => handleCurrentPage(-1)}
        >
          Prev
        </button>
      )}
      <div className={styles.paginator}>
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
          className={styles.paginator_buttons}
          onClick={() => handleCurrentPage(1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
