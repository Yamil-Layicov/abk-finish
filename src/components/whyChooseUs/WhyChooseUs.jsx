import "./whyChooseUs.scss";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import { ImLab } from "react-icons/im";
import {GoClock} from 'react-icons/go';
import {BiObjectsVerticalBottom} from 'react-icons/bi'
import {BsPeople} from 'react-icons/bs'

const WhyChooseUs = () => {
  return (
    <div className="whyChooseUs">
      <div className="headerText">
        <h1>Nə üçün biz?</h1>
      </div>
      <div className="boxes">
        <div className="box">
          <div className="labIcon">
            <span>
            <ImLab />
            </span>
          </div>
          <h3>Yüksək Keyfiyyətli Xidmətlər</h3>
          <p> Keyfiyyətli xidmət göstərəcəyimizə zəmanət veririk.</p>
        </div>
        <div className="box">
          <div className="labIcon">
            <span>
            <GoClock />
            </span>
          </div>
          <h3>Sürətli İş Prosesi</h3>
          <p>İş prosesini vaxtında yekunlaşdırımaq bizim üçün önəmlidir.</p>
        </div>
        <div className="box">
          <div className="labIcon">
            <span>
            <BiObjectsVerticalBottom/>
            </span>
          </div>
          <h3>24/7 əlçatanlıq</h3>
          <p> 24/7 bizimlə əlaqə mümkündür.</p>
        </div>
        <div className="box">
          <div className="labIcon">
            <span>
            <BsPeople/>
            </span>
          </div>
          <h3>Mütəxəssislərdən ibarət komanda</h3>
          <p>Əməkdaşlarımızın hər biri öz sahəsinin mütəxəssisidir.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
