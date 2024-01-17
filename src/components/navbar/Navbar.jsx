import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import "./navbar.scss";
import { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import api from '../../admin/api/posts';
import fb from '../../assets/socials/fb.svg';
import insta from '../../assets/socials/insta.svg';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [navData, setNavData] = useState([])

 

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const openNavbar = () => {
    if (isOpenNavbar) {
      setIsOpenNavbar(false);
      document.body.style.overflow = "hidden";
    } else {
      setIsOpenNavbar(true);
      document.body.style.overflow = "auto";
    }
  };

  const navigate = useNavigate();

  const navigate1 = () => {
    navigate("/");
    setIsOpenNavbar(false);
  };
  const navigate2 = () => {
    navigate("xidmetler");
    setIsOpenNavbar(false);
  };
  const navigate3 = () => {
    navigate("bloq");
    setIsOpenNavbar(false);
  };
  const navigate4 = () => {
    navigate("haqqimizda");
    setIsOpenNavbar(false);
  };
  const navigate5 = () => {
    navigate("elaqe");
    setIsOpenNavbar(false);
  };
  const navigate6 = () => {
    navigate("faq");
    setIsOpenNavbar(false);
  };
  const navigate7 = () => {
    navigate("userAccount");
    setIsOpenNavbar(false);
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
    <>
      <nav className={`${navbar && "navActive"}`}>
        <div className="left">
          <div onClick={() => navigate1()} className="logo">
            <img style={{ width: "150px" }} src={navData?.image} alt="" />
          </div>
          <div className="links">
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "#10D0A1" : "" })}
              to="/"
              className="link"
            >
              ANA SƏHİFƏ
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "#10D0A1" : "" })}
              to="/haqqimizda"
              className="link"
            >
              Haqqımızda
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "#10D0A1" : "" })}
              to="/xidmetler"
              className="link"
            >
              XİDMƏTLƏR
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "#10D0A1" : "" })}
              to="/bloq"
              className="link"
            >
              Bloq
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "#10D0A1" : "" })}
              to="/elaqe"
              className="link"
            >
              Əlaqə
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "#10D0A1" : "" })}
              to="/faq"
              className="link"
            >
              faq
            </NavLink>
          </div>
        </div>
        <div className="mainRight">
          <div className="right">
            <div className="helpdesk">
              <span className="icon">
                <BlurOnOutlinedIcon />
              </span>
              <span className="text">
                <span onClick={() => navigate("/userAccount")}>ŞƏXSİ KABİNET</span>
              </span>
            </div>
          </div>
          <div onClick={openNavbar} className="menuBtn">
            <MenuOutlinedIcon fontSize="large" />
          </div>
        </div>

        <div className={`${isOpenNavbar ? "activeMobileNav" : "mobileNav"}`}>
          <div className="mobileLeft">
            <div className="logo" style={{ height: "40px" }}>
              <img style={{ paddingRight: "50px" }} src={navData?.image} alt="" />
              <div onClick={() => setIsOpenNavbar(false)} className="iconMenu">
                <CloseOutlinedIcon />
              </div>
            </div>
            <div className="links">
              <span style={{ cursor: "pointer" }} onClick={navigate1}>
                Ana səhifə
              </span>
              <span style={{ cursor: "pointer" }} onClick={navigate2}>
                Xidmətlər
              </span>
              <span style={{ cursor: "pointer" }} onClick={navigate3}>
                Bloq
              </span>
              <span style={{ cursor: "pointer" }} onClick={navigate4}>
                Haqqımızda
              </span>
              <span style={{ cursor: "pointer" }} onClick={navigate5}>
                Əlaqə
              </span>
              <span style={{ cursor: "pointer" }} onClick={navigate6}>
                faq 
              </span>
              <span style={{ cursor: "pointer" }} onClick={navigate7}>
                ŞƏXSİ KABİNET
              </span>
            </div>
            <div className="navContact">
              <h5>Bizimlə əlaqə saxlayın</h5>
              <p>
                <span>
                  <StarOutlinedIcon
                    style={{ fill: "#FFCC00" }}
                    fontSize="small"
                  />
                </span>
                <span>Bakı şəhər, Nərimanov rayonu, <br /> Ələsgər Qayıbov 12 22</span>
              </p>
              <p>
                <span>
                  <StarOutlinedIcon
                    style={{ fill: "#FFCC00" }}
                    fontSize="small"
                  />
                </span>
                <span>{navData?.home_phone}</span>
              </p>
              <p>
                <span>
                  <StarOutlinedIcon
                    style={{ fill: "#FFCC00" }}
                    fontSize="small"
                  />
                </span>
                <span>{navData?.email}</span>
              </p>
              <div className="socials">
                <span>
                  <a
                    href={navData?.facebook}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img style={{display:"inline-block", width:"30px"}} src={fb} alt="" />
                  </a>
                </span>
                <span>
                  <a
                    href={navData?.instagram}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img style={{display:"inline-block", width:"30px"}} src={insta} alt="" />
                  </a>
                </span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        {isOpenNavbar && <div className="backBlack"></div>}
      </nav>
    </>
  );
};

export default Navbar;
