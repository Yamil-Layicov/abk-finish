import api from "../../../../admin/api/posts";
import { useEffect, useState } from "react";
import Data from "../data/Data";
import Pagination from "../pagination/Pagination";


const MainRightSide = () => {
  const [loding, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await api.get("analyses");
      setPosts(res?.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);


 if(loding){
  return <div>Loding...</div>
 }


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"100%", gap:"20px"}}>
      <Data posts={currentPosts}/>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default MainRightSide;
