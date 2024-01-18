import { useSearchParams } from 'react-router-dom';
import api from '../../../../admin/api/posts';
import { useQuery } from '@tanstack/react-query';

const MainAnalysesBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let analizNames = searchParams.get('category')?.split(",")||[] ;

  const { data: analyses } = useQuery({
    queryFn: () => api.get('analyses-categories'),
    queryKey: ['analyses'],
  });

  const handleCatNameClick = (catName) => {
    let updatedSelectedCategories;

    if (analizNames.includes(catName)) {
      updatedSelectedCategories = analizNames.filter((selectedCat) => selectedCat !== catName);
    } else {
      updatedSelectedCategories = [...analizNames, catName];
    }

    if (updatedSelectedCategories.length==0) {
      searchParams.delete("category")
      setSearchParams(searchParams,{replace:true})
    }else{
      setSearchParams({ category: updatedSelectedCategories.join(',') });
    }
  };

  
  return (
    <div className="analysisBox">
      <div className="analsisName">
        <ul>
          {analyses?.data?.map(({id,name}) => (
            <li
              key={id}
              onClick={() => handleCatNameClick(name)}
              className={analizNames.includes(name) ? 'selected' : ''}
            >
              {name}
              <span className="checkMark">
                {analizNames.includes(name) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.2803 4.71967C17.5732 5.01256 17.5732 5.48744 17.2803 5.78033L8.03033 15.0303C7.88968 15.171 7.69891 15.25 7.5 15.25C7.30109 15.25 7.11032 15.171 6.96967 15.0303L2.71967 10.7803C2.42678 10.4874 2.42678 10.0126 2.71967 9.71967C3.01256 9.42678 3.48744 9.42678 3.78033 9.71967L7.5 13.4393L16.2196 4.71967C16.5125 4.42678 16.9874 4.42678 17.2803 4.71967Z"
                      fill="#231781"
                    />
                  </svg>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainAnalysesBox;
