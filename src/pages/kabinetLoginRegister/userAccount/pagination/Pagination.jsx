import { Link } from "react-router-dom";
import './pagination.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="paginationConatiner">
      {totalPosts > 5 && <div className='pagination'>
        <span className="page-link">Əvvəl</span>
        {pageNumbers.map(number => (
          <div key={number} className='page-item'>
            <Link onClick={() => paginate(number)} href='userAccount' className='page-link'>
              {number}
            </Link>
          </div>
        ))}
        <span className="page-link">Növbəti</span>
      </div>}
    </div>
  );
};

export default Pagination;