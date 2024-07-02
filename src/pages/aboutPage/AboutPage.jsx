import bgImg from "../../assets/abk-banner-3.jpg";
import "./aboutPage.scss";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useEffect, useState } from "react";
import api from "../../admin/api/posts";
import HelmetMeta from "../../components/helmet/HelmetMeta";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("about");
        setAboutData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="aboutPage">
      <HelmetMeta title="Haqqimizda" content="AQRAR SAHƏDƏ İXTİSASLAŞMIŞ LABORATORİYA"/>

      <div className="hedaerSection">
        <div className="img">
          <img src={bgImg} alt="" />
        </div>
        <h1>HAQQIMIZDA</h1>
      </div>

      <div className="aboutContent">
        <div className="imgContainer">
          <div className="imgOne">
            <img src={aboutData.image_1} alt="" />
            {/* <div className="experinceBox">
              <span>3</span>
              <span style={{ paddingLeft: "12%" }}>İllik</span>
              <span style={{ paddingLeft: "10%" }}>Təcrübə</span>
            </div> */}
          </div>
          <div>
            <div className="imgTwo">
              <img src={aboutData.image_2} alt="" />
            </div>
            <div className="imgThree">
              <img src={aboutData.image_3} alt="" />
            </div>
          </div>
        </div>
        <div className="textContainer">
          <h1>{aboutData.title}</h1>
          <p className="first">Nə üçün biz?</p>
          <p className="second">{aboutData.content}</p>
          <div className="doneBox">
            <span className="spanIcon">
              <DoneOutlinedIcon />
            </span>
            <span>Yüksək Keyfiyyətli Xidmətlər</span>
          </div>
          <div className="doneBox">
            <span className="spanIcon">
              <DoneOutlinedIcon />
            </span>
            <span>Sürətli İş Prosesi</span>
          </div>
          <div className="doneBox">
            <span className="spanIcon">
              <DoneOutlinedIcon />
            </span>
            <span>24/7 əlçatanlıq</span>
          </div>
          <div className="doneBox">
            <span className="spanIcon">
              <DoneOutlinedIcon />
            </span>
            <span>Mütəxəssislərdən ibarət komanda</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
