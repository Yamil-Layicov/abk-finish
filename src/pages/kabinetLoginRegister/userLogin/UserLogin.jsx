import "./style.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./style.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import api from '../../../admin/api/posts';
import { useAuth2 } from "../../../context/AuthContext2";

const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("etibarlı e-poçt ünvanını daxil edin")
    .required("e-poçt qeyd olunmalıdır"),
  password: yup.string().required("şifrə qeyd olunmalıdır"),
});

const initialValues = {
  email: "",
  password: "",
};



const UserLogin = () => {
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser2 } = useAuth2();

  const form = useRef();

  const handleButtonClick = () => {
    setChecked(!isChecked);
  };

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (values) => {
    try {
      const response = await api.post("login", values)
      setUser2(response?.data)
      if(response){
        navigate("/userAccount");
        window.location.reload();
      }
    } catch (error) {
        if(error.response?.status === 401){
          toast.error("E-poçt və ya parol səhvdir")
        }
    }
  };  

  const formik = useFormik({
    initialValues,
    validationSchema: basicSchema,
    onSubmit,
  });

  const {
    handleSubmit,
    errors,
    handleChange,
    touched,
    handleBlur,
    values,
  } = formik;


  return (
    <div className="mainRegister">
      <div className="headerBox"></div>
      <div className="register">
        <div className="intoRegister">
          <h3>Şəxsi kabinetə giriş</h3>
          <form noValidate ref={form} onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                id="email"
                placeholder="E-mail ünvan"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "inputError" : ""}
              />
              {errors.email && touched.email && <small>{errors.email}</small>}
            </div>
            <div className="inputBox">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifrə"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? "inputError" : ""
                }
              />
              {errors.password && touched.password && (
                <small>{errors.password}</small>
              )}
              <div className="inputEyes" onClick={handleTogglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="forgotBox">
              <div className="saveBox" onClick={() => handleButtonClick()}>
                <span className="checkMark">
                  {isChecked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.2803 4.71967C17.5732 5.01256 17.5732 5.48744 17.2803 5.78033L8.03033 15.0303C7.88968 15.171 7.69891 15.25 7.5 15.25C7.30109 15.25 7.11032 15.171 6.96967 15.0303L2.71967 10.7803C2.42678 10.4874 2.42678 10.0126 2.71967 9.71967C3.01256 9.42678 3.48744 9.42678 3.78033 9.71967L7.5 13.4393L16.2196 4.71967C16.5125 4.42678 16.9874 4.42678 17.2803 4.71967Z"
                        fill="#231781"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </span>
                <span className="textSave">Yadda saxla</span>
              </div>
              <span
                className="text"
                onClick={() => navigate("/account/updatePassword")}
              >
                Şifrəni unutdun?
              </span>
            </div>
            <button type="submit">Daxil ol</button>
          </form>
          <p className="accaountText">
            Hesabınız yoxdur?
            <span onClick={() => navigate("/account/register")}>
              Qeydiyyatdan keç
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
