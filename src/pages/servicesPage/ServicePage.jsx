import { useEffect, useState } from "react";
import "./servicePage.scss";
import bgImg from "../../assets/abk-banner-3.jpg";
import api from "../../admin/api/posts";
import { useNavigate } from "react-router-dom";
import HelmetMeta from "../../components/helmet/HelmetMeta";

const ServicePage = () => {
  const [serviceData, setServiceData] = useState([]);
  const [color, setColor] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("services");
        setServiceData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const handleColor = (id) => {
    setColor(id);
  };

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

  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="servicePageMain">
      <HelmetMeta title="Xidmetler" content="Qida məhsullarının GMO analizi"/>
      <div className="hedaerSection">
        <div className="img">
          <img src={bgImg} alt="" />
        </div>
        <h1>XİDMƏTLƏR</h1>
      </div>
      <div className="centerSection">
        <div className="textHeader">
          <h5> ___XİDMƏTLƏRİMİZ___</h5>
          <h1>Xidmət Sahəsi</h1>
        </div>
        <div className="boxes">
          {serviceData.map((box, index) => (
            <div
              key={index}
              className="box"
              onMouseOver={() => handleColor(box.id)}
              onMouseOut={() => setColor(null)}
              onClick={() => handleDetail(box?.id)}
            >
              <div className="intoBox">
                <span
                  className={`labIcon`}
                  style={{ position: "relative", transition: "all .3s" }}
                >
                  <span
                    style={{
                      backgroundColor: color === box.id && box.color,
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      transition: "all .5s",
                      opacity: ".5",
                    }}
                  ></span>
                  <img
                    src={box.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </span>
                <div className="labTitle">{box.title}</div>
                <div className="labDesc">
                  <div>{truncateText(box?.content, 250)}</div>
                </div>
              </div>
              <div className="readMore">
                <span
                  style={{ backgroundColor: color === box.id && box.color }}
                ></span>
                <span>DAHA ƏTRAFLI</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="plansection"></div>
    </div>
  );
};

export default ServicePage;