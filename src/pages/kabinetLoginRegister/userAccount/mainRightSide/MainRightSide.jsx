import api from "../../../../admin/api/posts";
import { useEffect, useState } from "react";
import Data from "../data/Data";
import Pagination from "../pagination/Pagination";
import { useSearchParams } from "react-router-dom";


const MainRightSide = () => {
  const [loding, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [categories, setCategories] = useState([])
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(8);

  let category = searchParams.get('category') || '';
  let page = searchParams.get('page') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await api.get(`analyses?category=${category}&page=${page}`);
      
      setPosts(res?.data);
      console.log("response",res?.data)
      setLoading(false);
    };

    fetchPosts();
  }, [category,page]);


 if(loding){
  return <div>Loding...</div>
 }


  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts?.data?.slice(indexOfFirstPost, indexOfLastPost);


  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"100%", gap:"20px"}}>
      <Data posts={posts?.data}/>
      <Pagination
        postsPerPage={posts?.per_page}
        totalPosts={posts?.total}
        current_page={posts?.current_page}
        last_page={posts?.last_page}
      />
    </div>
  );
};

export default MainRightSide;
