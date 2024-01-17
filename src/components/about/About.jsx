import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import "./about.scss";
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import api from '../../admin/api/posts';
import TruncatedText from "../../helpers/TruncatedText";

const About = () => {

  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("about");
        setAboutData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const navigate = useNavigate()

  const navigateAbout = () => {
    navigate("haqqimizda")
  }

  return (
    <div className="about">
      <div className="imgContainer">
        <div className="img">
          <img
            src="https://bioxlab-next-js.vercel.app/assets/img/about/about-bg-01.png"
            alt=""
          />
          {/* <div className="experienceBox">
            <div className="spanNum">3</div>
            <div className="spanTexts">
            <div className="spanText spanText1">İllik</div>
            <div className="spanText spanText2">Təcrübə</div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="textContainer">
        <h6 >___HAQQIMIZDA</h6>
        <h1>{aboutData?.title}</h1>
        <p className="second">
        {aboutData?.content && <TruncatedText text={aboutData?.content}/>}
        </p>
        <button onClick={navigateAbout}>Haqqımızda</button>
      </div>
    </div>
  );
};

export default About;
