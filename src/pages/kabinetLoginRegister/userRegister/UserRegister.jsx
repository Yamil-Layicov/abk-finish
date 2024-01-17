import { useRef, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import api from "../../../admin/api/posts";

const basicSchema = yup.object().shape({
  full_name: yup.string().required("ad və soyad qeyd olunmalıdır"),
  email: yup
    .string()
    .email("etibarlı e-poçt ünvanını daxil edin")
    .required("e-poçt qeyd olunmalıdır"),
  number: yup
    .string(" ")
    .typeError(" ")
    .matches(/^\+994\d{9}$/, "nümunə formatı: +994XXXXXXXXX")
    .required("mobil nömrə qeyd olunmalıdır"),
  company: yup.string(" ").required("qurum adı qeyd olunmalıdır"),
  password: yup
    .string()
    .min(6, "şifrə ən azı 6 simvoldan ibarət olmalıdır")
    .required("şifrə qeyd olunmalıdır"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "şifrələr üst-üstə düşməlidir")
    .required(" "),
});

const initialValues = {
  full_name: "",
  email: "",
  number: "",
  company: "",
  password: "",
  confirmPassword: "",
};

const UserRegister = () => {
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useRef();

  const handleButtonClick = () => {
    setChecked(!isChecked);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (values, actions) => {
    try {
      const response = await api.post("register", values);
      console.log(values, response.data);
      toast.success("Uğurlu qeydiyyat");
      navigate("/account")
      actions.resetForm({ values: initialValues });
    } catch (error) {
      console.error(error);
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
    isSubmitting,
    touched,
    handleBlur,
    values,
  } = formik;

  return (
    <div className="mainRegister">
      <div className="headerBox">
      </div>
      <div className="register">
        <div className="intoRegister">
          <h3>Qeydiyyat</h3>
          <form noValidate ref={form} onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                id="full_name"
                placeholder="Ad və soyad"
                value={values.full_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.full_name && touched.full_name ? "inputError" : ""
                }
              />
              {errors.full_name && touched.full_name && (
                <small>{errors.full_name}</small>
              )}
            </div>
            <div className="inputBox">
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "inputError" : ""}
              />
              {errors.email && touched.email && <small>{errors.email}</small>}
            </div>
            <div className="inputBox">
              <input
                type="text"
                id="number"
                placeholder="Nömrə "
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.number && touched.number ? "inputError" : ""}
              />
              {errors.number && touched.number && (
                <small>{errors.number}</small>
              )}
            </div>
            <div className="inputBox">
              <input
                type="text"
                id="company"
                placeholder="Qurum adı"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.company && touched.company ? "inputError" : ""
                }
              />
              {errors.company && touched.company && (
                <small>{errors.company}</small>
              )}
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
            <div className="inputBox">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Şifrəni təkrar daxil edin"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "inputError"
                    : ""
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <small>{errors.confirmPassword}</small>
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
                      viewBox="0 0 18 14"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.7364 0.663597C18.0878 1.01507 18.0878 1.58492 17.7364 1.93639L6.6364 13.0364C6.46761 13.2052 6.2387 13.3 6 13.3C5.76131 13.3 5.53239 13.2052 5.3636 13.0364L0.263604 7.93639C-0.0878682 7.58492 -0.0878678 7.01507 0.263604 6.6636C0.615076 6.31213 1.18492 6.31213 1.5364 6.6636L6 11.1272L16.4636 0.663598C16.8151 0.312126 17.3849 0.312126 17.7364 0.663597Z"
                        fill="#9A9696"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </span>
                <span style={{ fontWeight: "400" }} className="textSave">
                  İstifadə qaydaları ilə razıyam
                </span>
              </div>
            </div>
            <button type="submit">Qeydiyyatdan keç</button>
          </form>
          <p className="accaountText">
            Hesabınız var?
            <span onClick={() => navigate("/account")}>Daxil ol</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
