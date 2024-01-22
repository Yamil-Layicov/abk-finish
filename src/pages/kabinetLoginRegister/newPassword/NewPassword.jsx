import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from '../../../admin/api/posts';


const basicSchema = yup.object().shape({
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
  password: "",
  confirmPassword: "",
};

const NewPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (values) => {
    try {
      const id = localStorage.getItem('id');

      if (!id) {
        toast.error("Id tapilmadi");
        return;
      }

      const response = await api.post("reset-password", {...values, id});

      console.log(response);
      toast.success("Şifrə dəyişdirildi");
      navigate("/account")
    } catch (error) {
      toast.error("Xəta baş verdi");
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
      <div className="headerBox"></div>
      <div className="register">
        <div className="intoRegister forWidth">
          <h3>Yeni şifrə təyin et</h3>
          <p className="updatedText">
            Yeni şifrənizi təyin edin
          </p>
          <form onSubmit={handleSubmit}>
          <div className="inputBox" >
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
              <div
              className="inputEyes"
                onClick={handleTogglePassword} >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="inputBox" >
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Şifrəni təkrar daxil edin"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword ? "inputError" : ""
                }
                />
               {errors.confirmPassword && touched.confirmPassword && (
                  <small>{errors.confirmPassword}</small>
                )}
              <div
              className="inputEyes"
                onClick={handleTogglePassword} >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <button
              type="submit"
              className="otherBtns"
            >
              Yenilə
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
