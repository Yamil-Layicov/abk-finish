import "./footer.scss";
import {BiLogoTelegram} from 'react-icons/bi'
import { useEffect, useState } from "react";
import api from '../../admin/api/posts';
import {useNavigate} from 'react-router-dom';
import fb from '../../assets/socials/fb.svg';
import insta from '../../assets/socials/insta.svg';

const Footer = () => {

  const [navData, setNavData] = useState([])

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



  const navigate = useNavigate();

  const navigate1 = () => {
    navigate("/");
  };
  const navigate2 = () => {
    navigate("xidmetler");
  };
  const navigate3 = () => {
    navigate("bloq");
  };
  const navigate4 = () => {
    navigate("haqqimizda");
  };
  const navigate5 = () => {
    navigate("elaqe");
  };
  const navigate6 = () => {
    navigate("faq");
  };

  return (
    <div className="footer">
      <div className="boxes">
        <div className="firstBox" style={{position:"relative"}}>
          {/* <img
          onClick={navigate1}
          style={{backgroundColor:"", width:"150px", position:"absolute", top:"-70px", left:"0"}}
            src={navData?.image}
            alt=""
          /> */}
          <p>
          Agro Bitki Klinikasi olaraq, bizim missiyamız ölkənin iqtisadiyyatında prioritet sayılan kənd təsərrüfat sahələrinin daimi tərəqqisini təmin etmək, həmçinin, ən son texnoloji avadanlıqların və mütəxəssisilərin köməyi ilə bitki, su və qida məhsullarını analiz etməklə sağlam gələcəyə nail olmaqdır.

          </p>
          <div className="socials">
            <a href={navData.facebook} rel="noreferrer" target="_blank"><img src={fb}  alt="" /></a> 
            <a href={navData?.instagram} rel="noreferrer" target="_blank" ><img src={insta}  alt="" /></a>
          </div>
        </div>
        <div className="secondBox">
          <h4 >Faydalı bağlantılar</h4>
          <p onClick={navigate4}>Haqqımızda</p>
          <p onClick={navigate2}>Xidmətlər</p>
          <p onClick={navigate3}>Bloq</p>
          <p onClick={navigate6}>FAQ</p>
          <p onClick={navigate5}>Əlaqə</p> 
        </div>
        <div className="thirdBox">
          <h4>Əlaqə məlumatı</h4>
          <p>Bakı şəhər, Nərimanov rayonu, <br /> Ələsgər Qayıbov 12 22</p>
          <p>{navData?.home_phone}</p>
          <p>{navData?.email}</p>
        </div>
        <div className="subcriber">
          <h4>Yeni xəbərlər üçün Abunə olun </h4>
          <div className="inputMsg">
            <input type="text" placeholder="E-Poçt daxil edin " />
            <div className="sendBox"><BiLogoTelegram/></div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <span>
          © Copyright {navData?.rights}
        </span>
        <div className="right">
          {/* <span>Terms and conditions</span>
          <span>Privacy policy</span>
          <span>Pricing</span> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
