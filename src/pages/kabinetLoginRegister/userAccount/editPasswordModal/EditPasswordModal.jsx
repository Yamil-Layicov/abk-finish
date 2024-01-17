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
