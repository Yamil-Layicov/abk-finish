import { useEffect, useState } from "react";
import './serviceDetail.scss';
import api from "../../../admin/api/posts";
import {  Link, useParams } from "react-router-dom";
import bgImg from "../../../assets/abk-banner-3.jpg";
import TruncatedText from "../../../helpers/TruncatedText";

const ServiceDetail = () => {
  const [serviceData, setServiceData] = useState([]);
  const [serviceDataAll, setServiceDataAll] = useState([]);
  const [serviceLength, setServiceLength] = useState(1400);
  const { id } = useParams();
  const [color, setColor] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get(`services/${id}`);
        setServiceData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("services");
        setServiceDataAll(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

 

  const handleDetail = () => {
    window.scrollTo({
      top: 0,
    });
  };


  return (
    <div className="servicePageDetail">
      <div className="hedaerSection">
        <div className="img">
          <img src={bgImg} alt="" />
        </div>
        <h1> XIDMƏTLƏR </h1>
      </div>
      <div className="mainContent">
        <div className="detailContent">
          <h1>{serviceData?.title}</h1>
          <p>
            {serviceData?.content && (
              <TruncatedText
                text={serviceData?.content}
                maxLength={serviceLength}
              />
            )}
          </p>
          {serviceData?.content?.length > serviceLength && (
            <p
              className="moreBtn"
              onClick={() => setServiceLength((prev) => 2 * prev)}
            >
              Daha çox...
            </p>
          )}
        </div>
        <div className="rightContent">
          <h2 style={{textAlign:"center"}}>Kateqoriyalar</h2>
        <div className="boxes">
          {serviceDataAll?.map((box, index) => (
            <Link style={{textDecoration:"none", color:"black"}} to="/xidmetler"onClick={handleDetail} key={index} className="box" >
              <div className="intoBox">
                  <p ><img
                    src={box.image}
                    alt=""
                    style={{ width: "50px",height: "100%",}}
                  /></p>
                <div className="labTitle">{box.title}</div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
