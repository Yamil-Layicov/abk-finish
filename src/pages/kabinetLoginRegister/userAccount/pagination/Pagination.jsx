import {  useSearchParams } from "react-router-dom";
import "./pagination.scss";

const Pagination = ({ postsPerPage, totalPosts, current_page ,last_page }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickPaginate = (number) => {
    if (searchParams.get("page") === "1" || number===1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", number);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="paginationConatiner">
      {totalPosts > postsPerPage && (
        <div className="pagination">
          <span className="page-link">Əvvəl</span>
          {Array.from({length:last_page}).map((_,index) => (
            <div key={index} className="page-item">
              <button
                onClick={() => handleClickPaginate(index+1)}
                className={`page-link ${
                  current_page === index+1 ? "active-page" : ""
                }`}
              >
                {index+1}
              </button>
            </div>
          ))}
          <span className="page-link">Növbəti</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
