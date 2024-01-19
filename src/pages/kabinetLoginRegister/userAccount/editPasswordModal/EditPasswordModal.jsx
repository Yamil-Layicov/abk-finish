import { useRef, useState } from "react";
import "./editPasswordModal.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import api from "../../../../admin/api/posts";
import { useAuth2 } from "../../../../context/AuthContext2";

const basicSchema = yup.object().shape({
  current_password: yup
    .string()
    .min(6, "şifrə ən azı 6 simvoldan ibarət olmalıdır")
    .required("şifrə qeyd olunmalıdır"),
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
  current_password: "",
  password: "",
  confirmPassword: "",
};

const EditPasswordModal = ({ showModal2, closeModal2 }) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useRef();

  const { setUser2, user2 } = useAuth2();
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (values, actions) => {
    try {
      const response = await api.post("user-password", values);
      console.log(values);
      toast.success("Parol uğurla dəyişdirildi");
      setUser2(response?.data);
      setUser2(false);
      navigate("/account")
    } catch (res) {
      toast.error("Cari parol doğru deyil");
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
    <div
      className={`editPasswordModal ${showModal2 ? "show" : ""}`}
      onClick={closeModal2}
    >
      <div className="register">
        <div className="intoRegister" onClick={(e) => e.stopPropagation()}>
        <span className="closeBtn" onClick={() => closeModal2()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="arrow_left_outline_24">
                <path
                  id="&#226;&#134;&#179; Icon Color"
                  d="M11.5319 4.25911C11.8563 4.579 11.8868 5.08447 11.6208 5.43913L11.5409 5.53187L6.05 11.1L20.1 11.1C20.5971 11.1 21 11.5029 21 12C21 12.4588 20.6567 12.8375 20.2129 12.893L20.1 12.9H6.05L11.5409 18.4681C11.8608 18.7926 11.884 19.2984 11.6131 19.6493L11.5319 19.7409C11.2074 20.0608 10.7016 20.084 10.3507 19.8131L10.2591 19.7319L3.25911 12.6319C2.94242 12.3107 2.91603 11.8109 3.17994 11.4599L3.25911 11.3681L10.2591 4.26813C10.6081 3.91418 11.1779 3.91014 11.5319 4.25911Z"
                  fill="#231781"
                />
              </g>
            </svg>
          </span>
          <h3>Parol dəyişdirin</h3>
          <form noValidate ref={form} onSubmit={handleSubmit}>
          <div className="inputBox">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Cari şifrə"
                id="current_password"
                value={values.current_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.current_password && touched.current_password ? "inputError" : ""
                }
              />
              {errors.current_password && touched.current_password && (
                <small>{errors.current_password}</small>
              )}
              <div className="inputEyes" onClick={handleTogglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
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
            <button type="submit">Dəyişikliyi yadda saxla</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordModal;
