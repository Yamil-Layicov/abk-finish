import { useEffect, useRef } from "react";
import "./editModal.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../../../admin/api/posts";
import { useAuth2 } from "../../../../context/AuthContext2";
import { useNavigate } from "react-router-dom";

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
});

const initialValues = {
  full_name: "",
  email: "",
  number: "",
  company: "",
};

const EditUserModal = ({ showModal, closeModal }) => {
  const form = useRef();
  const { setUser2, user2 } = useAuth2();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const response = await api.post("user-profile", values);
      console.log(response?.data);
      toast.success("Profil redaktə olundu");
      setUser2(response?.data);
      setUser2(false);
      navigate("/account");
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
    setValues,
  } = formik;

  useEffect(() => {
    if (user2) {
      setValues({
        full_name: user2?.user?.full_name || "",
        email: user2?.user?.email || "",
        number: user2?.user?.number || "",
        company: user2?.user?.company || "",
      });
    }
  }, []);

  return (
    <div
      className={`edidUserModal ${showModal ? "show" : ""}`}
      onClick={closeModal}
    >
      <div className="register">
        <div className="intoRegisterUserModal" onClick={(e) => e.stopPropagation()}>
          <span className="closeBtn" onClick={() => closeModal()}>
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
          <h3>Profili redaktə et</h3>
          <form noValidate ref={form} onSubmit={handleSubmit}>
            <div className="inputBox">
              <label htmlFor="">Ad və soyadınız</label>
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
              <label htmlFor="">Qurum adı</label>
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
              <label htmlFor="">E-mail</label>
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
              <label htmlFor="">Nömrə</label>
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
            <button type="submit">Dəyişikliyi yadda saxla</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
