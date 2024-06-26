import api from "../../../../admin/api/posts";
import { useEffect, useState } from "react";
import Data from "../data/Data";
import Pagination from "../pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";


const MainRightSide = () => {
  const [loding, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchParams,setSearchParams] = useSearchParams();
 

  let category = searchParams.get('category') || '';
  let page = searchParams.get('page') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await api.get(`analyses?category=${category}&page=${page}`);
      setPosts(res?.data);
      if(res.data?.last_page<page){
        searchParams.delete("page")
        setSearchParams(searchParams,{replace:true})
      }
      setLoading(false);
    };

    fetchPosts();
    //eslint-disable-next-line
  }, [category,page]);


 if(loding){
  return <div style={{position:"absolute",top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
    <ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor="white"
  barColor="#51E5FF"
/>
  </div>
 }

  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"100%", gap:"20px"}}>
      <Data posts={posts?.data}/>
      {posts?.total > posts?.per_page && <Pagination
        postsPerPage={posts?.per_page}
        totalPosts={posts?.total}
        current_page={posts?.current_page}
        last_page={posts?.last_page}
      />}
      
    </div>
  );
};

export default MainRightSide;
