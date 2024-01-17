import "./newsPage.scss";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../admin/api/posts";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";
import { convertDate } from "../../helpers/DateFns";
import bgImg from '../../assets/abk-banner-3.jpg';
import HelmetMeta from "../../components/helmet/HelmetMeta";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [search] = useSearchParams();

  const handleId = (id) => {
    console.log(id);
    navigate(`${id}`);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get("blogs");

        if (response) {
          setNewsData(
            search.get("category")
              ? response.data.filter(
                  (item) =>
                    Number(item.category_id) === Number(search.get("category"))
                )
              : response.data
          );
          setLoading(false);
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, [search.get("category")]);

  const { isLoading, data } = useQuery({
    queryFn: () => api.get("banners/news"),
  });

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.slice(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(" ");

      if (lastSpaceIndex !== -1 && lastSpaceIndex < maxLength - 1) {
        return truncatedText.slice(0, lastSpaceIndex) + "...";
      } else {
        return truncatedText + "...";
      }
    }
  };

  return (
    <>
      <div className="newsPageMainSection">
        <HelmetMeta title="Bloq" content="Letgen firmasının rəhbəri Fahrettin Özcan Aqro bitki klinikasının mütəxəssislərinə təlim keçmişdir."/>
      <div className="hedaerSection">
        <div className="img">
          <img src={bgImg} alt="" />
        </div>
        <h1>BLOQ</h1>
      </div>
          <div className="newsBoxes">
            {loading ? (
              <Loader color={"white"}/>
            ) : newsData.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <img
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                  src="/notResult.jpg"
                  alt=""
                />
                <h1>Məlumat tapılmadı</h1>
                <Link onClick={() => navigate(-1)}>
                  <button className="button">
                  Geri Qayit
                  </button>
                </Link>
              </div>
            ) : (
              <div className="boxes">
                {newsData.map((box) => (
                  <div key={box.id} className="box">
                    <div className="imgBox">
                      <img src={box.image} alt="" />
                    </div>
                    <div className="textBox">
                      <p className="date">{convertDate(box?.created_at)}</p>
                      <p className="title">{truncateText(box?.title, 110)}</p>
                      <button onClick={() => handleId(box.id)}>
                        <GoArrowRight />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default NewsPage;
