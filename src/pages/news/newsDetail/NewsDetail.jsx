import { useEffect, useState } from "react";
import "./newsDetail.scss";
import api from "../../../admin/api/posts";
import { Link, useParams } from "react-router-dom";
import { convertDate } from "../../../helpers/DateFns"; 
import TruncatedText from "../../../helpers/TruncatedText";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/loader/Loader";
import bgImg from '../../../assets/abk-banner-3.jpg';

const NewsDetail = () => {
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [loadings, setLoadings] = useState(true);


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get(`blogs/${id}`);
        setNewsData(response.data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoadings(false)
      }
    };

    fetchSettings();
  }, []);
 


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("categories");
        setCategories(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const { isLoading, data } = useQuery({
    queryFn: () => api.get("banners/news"),
  });


  return (
    <>
      <div className="newsPageDetail">
      <div className="hedaerSection">
        <div className="img">
          <img src={bgImg} alt="" />
        </div>
        <h1>BLOQ</h1>
      </div>
          {
            loadings ? <Loader color={"white"}/> : <div className="newsDetailBox">
            <div className="newsDetailBoxInto">
              <div className="img">
                <img src={newsData.image} alt="" />
              </div>
              <p className="date">{convertDate(newsData?.created_at)}</p>
              <p className="title">{newsData?.title}</p>
              <p className="content">
                {newsData?.content && (
                  <TruncatedText text={newsData?.content} />
                )}
              </p>
            </div>
            <div className="categories">
              <h2>Kateqoriyalar</h2>
              {categories?.map((box) => (
                <Link className="category-link" to={`/bloq?category=${box.id}`} key={box.id}>
                  {box.name}
                </Link>
              ))}
            </div>
          </div>
          }
        </div>
    </>
  );
};

export default NewsDetail;
