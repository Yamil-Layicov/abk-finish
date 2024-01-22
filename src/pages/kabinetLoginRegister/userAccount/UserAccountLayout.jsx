import { useState, lazy, Suspense } from "react";
import "./userAccountLayout.scss";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const EditUserModal = lazy(() => import("./editUserModal/EditUserModal"));
import { MdKey } from "react-icons/md";
import EditPasswordModal from "./editPasswordModal/EditPasswordModal";
import { useAuth2 } from "../../../context/AuthContext2";
import MainAnalaysesBox from "./mainAnalysesBox/MainAnalaysesBox";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import api from "../../../admin/api/posts";

const UserAccountLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModalUser, setShowModalUser] = useState(false);
  const [showEditPassword, setShowEditpassword] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const navigate = useNavigate();
  const { setUser2, user2 } = useAuth2();

  const location = useLocation();

  const showModal = () => {
    setShowModalUser(true);
  };

  const closeModal = () => {
    setShowModalUser(false);
  };

  const showModal2 = () => {
    setShowEditpassword(true);
  };

  const closeModal2 = () => {
    setShowEditpassword(false);
  };

  const exitUserAccount = async () => {
    const exitRes = await api.post("logout");
    if (exitRes) {
      navigate("/account");
      setUser2(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleChangeAnalyses = ({ field, value }) => {
    if (!value) {
      searchParams.delete(field);
    } else {
      searchParams.set(field, String(value));
    }
    setSearchParams(searchParams, { replace: true });
  };

  const data = JSON.parse(localStorage.getItem("user2"));
  const isDoctor = data?.user?.is_doctor;

  return (
    <div className="userAccount">
      <div className="accountHeader">
        <span className="menuIcon" onClick={() => toggleMenu()}>
          {showMenu ? <MdMenu /> : <IoMdClose />}
        </span>
      </div>
      <div className="intoAccount">
        <div className="leftSide">
          <div>
            <h3>{user2?.user?.full_name}</h3>
            <div className="idBox">
              <span>#{user2?.user?.user_id}</span>
              <div className="iconBox">
                <span onClick={() => showModal()}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="write_outline_24">
                      <g id="&#226;&#134;&#179; Icon Color">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.56169 4.10006L13.1001 4.10006C13.5972 4.10006 14.0001 4.503 14.0001 5.00006C14.0001 5.49712 13.5972 5.90006 13.1001 5.90006H9.6001C8.60515 5.90006 7.91307 5.90076 7.37459 5.94476C6.84662 5.98789 6.54605 6.06813 6.31972 6.18344C5.8305 6.43271 5.43275 6.83046 5.18348 7.31968C5.06816 7.54601 4.98793 7.84658 4.94479 8.37456C4.9008 8.91304 4.9001 9.60512 4.9001 10.6001V14.4001C4.9001 15.395 4.9008 16.0871 4.94479 16.6256C4.98793 17.1535 5.06816 17.4541 5.18348 17.6804C5.43275 18.1697 5.8305 18.5674 6.31972 18.8167C6.54605 18.932 6.84662 19.0122 7.37459 19.0554C7.91308 19.0994 8.60516 19.1001 9.6001 19.1001H13.4001C14.395 19.1001 15.0871 19.0994 15.6256 19.0554C16.1536 19.0122 16.4541 18.932 16.6805 18.8167C17.1697 18.5674 17.5674 18.1697 17.8167 17.6804C17.932 17.4541 18.0123 17.1535 18.0554 16.6256C18.0994 16.0871 18.1001 15.395 18.1001 14.4001V10.9001C18.1001 10.403 18.503 10.0001 19.0001 10.0001C19.4972 10.0001 19.9001 10.403 19.9001 10.9001V14.4385C19.9001 15.386 19.9001 16.1517 19.8494 16.7721C19.7972 17.4114 19.6867 17.9753 19.4205 18.4976C18.9987 19.3255 18.3256 19.9986 17.4977 20.4205C16.9753 20.6866 16.4115 20.7972 15.7722 20.8494C15.1518 20.9001 14.386 20.9001 13.4385 20.9001H9.56169C8.61419 20.9001 7.84844 20.9001 7.22802 20.8494C6.58873 20.7972 6.02491 20.6866 5.50254 20.4205C4.67463 19.9986 4.00151 19.3255 3.57967 18.4976C3.31351 17.9753 3.203 17.4114 3.15077 16.7721C3.10008 16.1517 3.10009 15.386 3.1001 14.4385V10.5617C3.10009 9.61415 3.10008 8.8484 3.15077 8.22798C3.203 7.58869 3.31351 7.02487 3.57967 6.5025C4.00151 5.67459 4.67463 5.00147 5.50254 4.57963C6.02491 4.31347 6.58873 4.20297 7.22802 4.15073C7.84844 4.10004 8.61419 4.10005 9.56169 4.10006Z"
                          fill="#231781"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.1248 3.3256C19.5543 2.89602 20.2508 2.89602 20.6804 3.3256C21.11 3.75518 21.11 4.45166 20.6804 4.88124L20.3268 5.23479C20.1706 5.391 19.9174 5.391 19.7612 5.23479L18.7712 4.24484C18.615 4.08863 18.615 3.83536 18.7712 3.67915L19.1248 3.3256ZM18.5241 5.90028L18.0998 5.47602C17.663 5.03914 17.3799 5.06461 16.9685 5.47602C15.2596 7.18486 13.5508 8.8937 11.842 10.6025C9.88934 12.5552 8.65467 14.4863 9.08424 14.9159C9.51382 15.3455 11.445 14.1108 13.3976 12.1582C15.1064 10.4493 16.8152 8.74044 18.5241 7.03165C18.961 6.59477 18.9355 6.31168 18.5241 5.90028Z"
                          fill="#231781"
                        />
                      </g>
                    </g>
                  </svg>
                </span>

                <span onClick={() => showModal2()}>
                  <MdKey />
                </span>
              </div>
            </div>
            <div className="leftSideLine"></div>
            <h4>Analizlər</h4>
            <MainAnalaysesBox />
          </div>
          <div className="exitBox" onClick={() => exitUserAccount()}>
            <svg
              className="svg"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="door_arrow_left_outline_24">
                <g id="&#226;&#134;&#179; Icon Color">
                  <path
                    d="M28.9119 31.3963C27.737 32.0247 26.5812 32.22 24.1614 32.22H20.0708C20.0611 32.2202 20.0514 32.2203 20.0416 32.2203C19.2753 32.2203 18.6541 31.5991 18.6541 30.8328C18.6541 30.0665 19.2753 29.4453 20.0416 29.4453C20.0416 29.4453 20.0416 29.4453 20.0416 29.4453L24.1614 29.445C26.4533 29.445 27.0452 29.2477 27.6033 28.9493C28.121 28.6724 28.5191 28.2743 28.796 27.7566C29.0944 27.1985 29.2917 26.6066 29.2917 24.3147L29.2917 12.6836C29.2917 10.3917 29.0944 9.79979 28.796 9.24173C28.5191 8.72397 28.121 8.32591 27.6033 8.04901C27.0452 7.75056 26.4533 7.55332 24.1614 7.55332H20.0708C20.0611 7.55352 20.0514 7.55362 20.0416 7.55362C19.2753 7.55362 18.6541 6.93242 18.6541 6.16612C18.6541 5.39983 19.2753 4.77862 20.0416 4.77862C20.0416 4.77862 20.0416 4.77862 20.0416 4.77862L24.1614 4.77832C26.5812 4.77832 27.737 4.97359 28.9119 5.60198C29.9133 6.13751 30.7075 6.93168 31.243 7.93305C31.8714 9.10803 32.0667 10.2638 32.0667 12.6836V24.3147C32.0667 26.7345 31.8714 27.8903 31.243 29.0653C30.7075 30.0666 29.9133 30.8608 28.9119 31.3963Z"
                    fill="#828282"
                  />
                  <path
                    d="M14.4356 23.6849L18.2335 19.887H6.0125C5.24621 19.887 4.625 19.2658 4.625 18.4995C4.625 17.7332 5.24621 17.112 6.0125 17.112H18.2338L14.4356 13.3138C13.8937 12.7719 13.8937 11.8934 14.4356 11.3515C14.9774 10.8097 15.8559 10.8097 16.3978 11.3515L22.5644 17.5182C23.1063 18.0601 23.1063 18.9386 22.5644 19.4804L16.3978 25.6471C15.8559 26.1889 14.9774 26.1889 14.4356 25.6471C13.8937 25.1052 13.8937 24.2267 14.4356 23.6849Z"
                    fill="#828282"
                  />
                </g>
              </g>
            </svg>
            <span className="exitText">Çıxış</span>
          </div>
        </div>
        {showMenu ? "" : <div className="backShadow"></div>}
        <div
          className="leftSideActive"
          style={{ display: `${showMenu ? "none" : "block"}` }}
        >
          <div>
            <h3 style={{color:"#231781"}}>{user2?.user?.full_name}</h3>
            <div className="idBox">
              <span>#{user2?.user?.user_id}</span>
              <div className="iconBox">
                <span onClick={() => showModal()}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="write_outline_24">
                      <g id="&#226;&#134;&#179; Icon Color">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.56169 4.10006L13.1001 4.10006C13.5972 4.10006 14.0001 4.503 14.0001 5.00006C14.0001 5.49712 13.5972 5.90006 13.1001 5.90006H9.6001C8.60515 5.90006 7.91307 5.90076 7.37459 5.94476C6.84662 5.98789 6.54605 6.06813 6.31972 6.18344C5.8305 6.43271 5.43275 6.83046 5.18348 7.31968C5.06816 7.54601 4.98793 7.84658 4.94479 8.37456C4.9008 8.91304 4.9001 9.60512 4.9001 10.6001V14.4001C4.9001 15.395 4.9008 16.0871 4.94479 16.6256C4.98793 17.1535 5.06816 17.4541 5.18348 17.6804C5.43275 18.1697 5.8305 18.5674 6.31972 18.8167C6.54605 18.932 6.84662 19.0122 7.37459 19.0554C7.91308 19.0994 8.60516 19.1001 9.6001 19.1001H13.4001C14.395 19.1001 15.0871 19.0994 15.6256 19.0554C16.1536 19.0122 16.4541 18.932 16.6805 18.8167C17.1697 18.5674 17.5674 18.1697 17.8167 17.6804C17.932 17.4541 18.0123 17.1535 18.0554 16.6256C18.0994 16.0871 18.1001 15.395 18.1001 14.4001V10.9001C18.1001 10.403 18.503 10.0001 19.0001 10.0001C19.4972 10.0001 19.9001 10.403 19.9001 10.9001V14.4385C19.9001 15.386 19.9001 16.1517 19.8494 16.7721C19.7972 17.4114 19.6867 17.9753 19.4205 18.4976C18.9987 19.3255 18.3256 19.9986 17.4977 20.4205C16.9753 20.6866 16.4115 20.7972 15.7722 20.8494C15.1518 20.9001 14.386 20.9001 13.4385 20.9001H9.56169C8.61419 20.9001 7.84844 20.9001 7.22802 20.8494C6.58873 20.7972 6.02491 20.6866 5.50254 20.4205C4.67463 19.9986 4.00151 19.3255 3.57967 18.4976C3.31351 17.9753 3.203 17.4114 3.15077 16.7721C3.10008 16.1517 3.10009 15.386 3.1001 14.4385V10.5617C3.10009 9.61415 3.10008 8.8484 3.15077 8.22798C3.203 7.58869 3.31351 7.02487 3.57967 6.5025C4.00151 5.67459 4.67463 5.00147 5.50254 4.57963C6.02491 4.31347 6.58873 4.20297 7.22802 4.15073C7.84844 4.10004 8.61419 4.10005 9.56169 4.10006Z"
                          fill="#231781"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.1248 3.3256C19.5543 2.89602 20.2508 2.89602 20.6804 3.3256C21.11 3.75518 21.11 4.45166 20.6804 4.88124L20.3268 5.23479C20.1706 5.391 19.9174 5.391 19.7612 5.23479L18.7712 4.24484C18.615 4.08863 18.615 3.83536 18.7712 3.67915L19.1248 3.3256ZM18.5241 5.90028L18.0998 5.47602C17.663 5.03914 17.3799 5.06461 16.9685 5.47602C15.2596 7.18486 13.5508 8.8937 11.842 10.6025C9.88934 12.5552 8.65467 14.4863 9.08424 14.9159C9.51382 15.3455 11.445 14.1108 13.3976 12.1582C15.1064 10.4493 16.8152 8.74044 18.5241 7.03165C18.961 6.59477 18.9355 6.31168 18.5241 5.90028Z"
                          fill="#231781"
                        />
                      </g>
                    </g>
                  </svg>
                </span>

                <span onClick={() => showModal2()}>
                  <MdKey />
                </span>
              </div>
            </div>
            <div className="leftSideLine"></div>
            <h4 style={{color:"#231781"}}>Analizlər</h4>
            <MainAnalaysesBox />
          </div>
          <div className="exitBox" onClick={() => exitUserAccount()}>
            <svg
              className="svg"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="door_arrow_left_outline_24">
                <g id="&#226;&#134;&#179; Icon Color">
                  <path
                    d="M28.9119 31.3963C27.737 32.0247 26.5812 32.22 24.1614 32.22H20.0708C20.0611 32.2202 20.0514 32.2203 20.0416 32.2203C19.2753 32.2203 18.6541 31.5991 18.6541 30.8328C18.6541 30.0665 19.2753 29.4453 20.0416 29.4453C20.0416 29.4453 20.0416 29.4453 20.0416 29.4453L24.1614 29.445C26.4533 29.445 27.0452 29.2477 27.6033 28.9493C28.121 28.6724 28.5191 28.2743 28.796 27.7566C29.0944 27.1985 29.2917 26.6066 29.2917 24.3147L29.2917 12.6836C29.2917 10.3917 29.0944 9.79979 28.796 9.24173C28.5191 8.72397 28.121 8.32591 27.6033 8.04901C27.0452 7.75056 26.4533 7.55332 24.1614 7.55332H20.0708C20.0611 7.55352 20.0514 7.55362 20.0416 7.55362C19.2753 7.55362 18.6541 6.93242 18.6541 6.16612C18.6541 5.39983 19.2753 4.77862 20.0416 4.77862C20.0416 4.77862 20.0416 4.77862 20.0416 4.77862L24.1614 4.77832C26.5812 4.77832 27.737 4.97359 28.9119 5.60198C29.9133 6.13751 30.7075 6.93168 31.243 7.93305C31.8714 9.10803 32.0667 10.2638 32.0667 12.6836V24.3147C32.0667 26.7345 31.8714 27.8903 31.243 29.0653C30.7075 30.0666 29.9133 30.8608 28.9119 31.3963Z"
                    fill="#828282"
                  />
                  <path
                    d="M14.4356 23.6849L18.2335 19.887H6.0125C5.24621 19.887 4.625 19.2658 4.625 18.4995C4.625 17.7332 5.24621 17.112 6.0125 17.112H18.2338L14.4356 13.3138C13.8937 12.7719 13.8937 11.8934 14.4356 11.3515C14.9774 10.8097 15.8559 10.8097 16.3978 11.3515L22.5644 17.5182C23.1063 18.0601 23.1063 18.9386 22.5644 19.4804L16.3978 25.6471C15.8559 26.1889 14.9774 26.1889 14.4356 25.6471C13.8937 25.1052 13.8937 24.2267 14.4356 23.6849Z"
                    fill="#828282"
                  />
                </g>
              </g>
            </svg>
            <span className="exitText">Çıxış</span>
          </div>
        </div>
        <div className="rightSide">
          <div className="rightHeader">
            {location.pathname === "/userAccount/addAnalysis" ? (
              <Link style={{ textDecoration: "none" }} className="mb-4" to="">
                <button className="addanalyseBtn">Geri</button>
              </Link>
            ) : (
              <h5>Analiz nəticələri </h5>
            )}
            {isDoctor === 1 &&
              location.pathname !== "/userAccount/addAnalysis" && (
                <Link to="addAnalysis">
                  <button className="addanalyseBtn">Əlavə et</button>
                </Link>
              )}
          </div>
          <Outlet />
        </div>
      </div>
      {showModalUser && (
        <Suspense fallback={<div>Loading...</div>}>
          <EditUserModal
            showModal={showModal}
            closeModal={closeModal}
            passwordChanged={"password deyis"}
            profilChange={"Profili redaktə et"}
          />
        </Suspense>
      )}
      {showEditPassword && (
        <Suspense fallback={<div>Loading...</div>}>
          <EditPasswordModal
            showModal2={showModal2}
            closeModal2={closeModal2}
          />
        </Suspense>
      )}
    </div>
  );
};

export default UserAccountLayout;
