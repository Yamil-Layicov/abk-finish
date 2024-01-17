import { useEffect, useRef } from "react";
import "./editModal.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import api from '../../../../admin/api/posts';
import { useAuth2 } from "../../../../context/AuthContext2";
import { useNavigate } from "react-router-dom";


const basicSchema = yup.object().shape({
  full_name: yup.string().required("ad və soyad qeyd olunmalıdır"),
  email: yup
    .string()
    .email("etibarlı e-poçt ünvanını daxil edin")
    .required("e-poçt qeyd olunmalıdır"),
    number: yup
    .string(" ").typeError(" ").matches(/^\+994\d{9}$/, "nümunə formatı: +994XXXXXXXXX")
    .required("mobil nömrə qeyd olunmalıdır"),
    company: yup
    .string(" ")
    .required("qurum adı qeyd olunmalıdır"),
});

const initialValues = {
  full_name: "",
  email: "",
  number:"",
  company: "",
};

const EditUserModal = ({showModal, closeModal}) => {
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
      navigate("/account")
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
    setValues
  } = formik;


  useEffect(() => {
    if (user2) {
      setValues({
        full_name: user2?.user?.full_name || '',
        email: user2?.user?.email || '',
        number: user2?.user?.number || '',
        company: user2?.user?.company || '',
      });
    }
  }, []);


  return (
    <div className={`edidUserModal ${showModal ? 'show' : ''}`} onClick={closeModal}>
      <div className="register"  >
        <div className="intoRegister" onClick={(e) => e.stopPropagation()}>
          <h3>Profili redaktə et</h3>
          <form noValidate ref={form} onSubmit={handleSubmit} >
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
                type="email"
                id="email"
                placeholder="E-mail ünvan"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email ? "inputError" : ""
                }
              />
              {errors.email && touched.email && (
                  <small>{errors.email}</small>
                )}
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
            <button type="submit">Dəyişikliyi yadda saxla</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
