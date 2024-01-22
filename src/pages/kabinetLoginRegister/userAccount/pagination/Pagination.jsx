import { useSearchParams } from "react-router-dom";
import "./pagination.scss";

const Pagination = ({ postsPerPage, totalPosts, current_page, last_page }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickPaginate = (number) => {
    if (searchParams.get("page") === "1" || number === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", number);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handlePrevious = () => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleNext = () => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    if (currentPage < last_page) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams, { replace: true });
    }
  };

  console.log(totalPosts);

  return (
    <div className="paginationConatiner">
      {totalPosts > postsPerPage && (
        <div className="pagination">
          <span className="pageLink" onClick={() => handlePrevious()}>Əvvəl</span>
          {Array.from({ length: last_page }).map((_, index) => (
            <div key={index} className="page-item">
              <button
                onClick={() => handleClickPaginate(index + 1)}
                className={`pageLink ${
                  current_page === index + 1 ? "activePage" : ""
                }`}
              >
                {index + 1}
              </button>
            </div>
          ))}
          <span className="pageLink" onClick={() => handleNext()}>Növbəti</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
