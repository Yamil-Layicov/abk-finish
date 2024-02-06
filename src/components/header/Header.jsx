import "./header.scss";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { useNavigate } from "react-router-dom";
import img1 from "./img1.jpg";
import { Suspense, lazy, useEffect, useState } from "react";
import {MdOutlineWorkHistory} from 'react-icons/md'
import {GoClock} from 'react-icons/go'
import api from '../../admin/api/posts';
const Modal = lazy(() => import("./modal/Modal"));


const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [navData, setNavData] = useState([])

  const navigate = useNavigate();

  const navigateAbout = () => {
    navigate("haqqimizda");
  };

  const showVideo = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("settings");
        console.log(response.data);
        setNavData(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="header">
      <div className="left">
        <h6>Agro Bitki Klinikasına xoşgəlmisiniz</h6>
        <h1>SAĞLAM TƏBİƏT SAĞLAM GƏLƏCƏK</h1>
        <p>
          Ən son texnoloji avadanlıqlarla təmin olunmuş tam lisenziyalı və
          akkreditə olunmuş laboratoriya.
        </p>
        <button onClick={navigateAbout}>Haqqımızda</button>
      </div>
      <div className="right">
        <div className="img">
          <img src={img1} alt="" />
          <div onClick={showVideo} className="video">
            <div className="videClick"></div>
          </div>
          <div className="helpdesk">
            <span className="icon">
              <BlurOnOutlinedIcon />
            </span>
            <span className="text">
            <span onClick={() => navigate("/account")}>ŞƏXSİ KABİNET</span>
            </span>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="boxes">
          <div className="box">
            <span className="iconPerson">
              <PersonAddAlt1OutlinedIcon />
            </span>
            <span>Müştəri Məmnuniyyəti</span>
          </div>
          <div className="box">
            <span className="iconPerson" style={{padding:"12px 15px"}}>
              <GoClock />
            </span>
            <span>Sürətli İş Prosesi</span>
          </div>
          <div className="box">
            <span className="iconPerson" style={{padding:"12px 15px"}}>
              <MdOutlineWorkHistory />
            </span>
            <span>Yüksək Keyfiyyətli Xidmətlər</span>
          </div>
        </div>
      </div>
        {showModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <Modal setShowModal={setShowModal} />
          </Suspense>
        )}
    </div>
  );
};

export default Header;
