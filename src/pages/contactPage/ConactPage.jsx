import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { BsPhone } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../admin/api/posts";
import bgImg from "../../assets/abk-banner-3.jpg";
import "./contactPage.scss";
import { basicSchema } from "./shemas";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import HelmetMeta from "../../components/helmet/HelmetMeta";

const ContactPage = () => {
  const [contactData, setContactData] = useState([]);
  const form = useRef();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("settings");
        setContactData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const initialValues = {
    full_name: "",
    email: "",
    number: "",
    note: "",
  };

  const onSubmit = async (values, actions) => {
    try {
      const response = await api.post("contacts", values);
      if (response) {
        emailjs.send( "service_ywb5h4s","template_87bq4fi",values,"8BbajweS08RNaIiB_")
        toast.success("Mesaj göndərildi");
        actions.resetForm({ values: initialValues });
      }
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
    <div className="contactPage">
      <HelmetMeta title="Eleqe" content="Bakı şəhər, Nərimanov rayonu,
Ələsgər Qayıbov 12/22"/>
      <div className="hedaerSection">
        <div className="img">
          <img src={bgImg} alt="" />
        </div>
        <h1>ƏLAQƏ</h1>
      </div>
      <div className="pageContent">
        <div className="left">
          <div className="box">
            <span className="icon">
              <CiLocationOn />
            </span>
            <h3>Məkan</h3>
            <p>
              Bakı şəhər, Nərimanov rayonu, <br />
              Ələsgər Qayıbov 12/22
            </p>
          </div>
          <div className="box">
            <span className="icon">
              <BsPhone />
            </span>
            <h3>Zəng Üçün</h3>
            <p>{contactData.home_phone}</p>
          </div>
          <div className="box">
            <span className="icon">
              <AiOutlineClockCircle />
            </span>
            <h3>24/7 Dəstək</h3>
            <p>{contactData.email}</p>
          </div>
        </div>
        <div className="right">
          <h2>Bizə mesaj göndərin :</h2>
          <form ref={form} onSubmit={handleSubmit}>
            <div className="upInputs">
              <div className="inputBox">
                <input
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="full_name"
                  type="text"
                  placeholder="ad və soyadınızı daxil edin"
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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  type="email"
                  placeholder="e-poçt daxil edin "
                  className={errors.email && touched.email ? "inputError" : ""}
                />
                {errors.email && touched.email && <small>{errors.email}</small>}
              </div>
              <div className="inputBox">
                <input
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="number"
                  type="tel"
                  placeholder="nömrənizi daxil edin"
                  className={
                    errors.number && touched.number ? "inputError" : ""
                  }
                />
                {errors.number && touched.number && (
                  <small>{errors.number}</small>
                )}
              </div>
            </div>
            <textarea
              value={values.note}
              onChange={handleChange}
              id="note"
              placeholder="mesajınızı qeyd edin"
              name=""
              cols="30"
              rows="10"
            ></textarea>
            <button disabled={isSubmitting} type="submit">
              Mesaj göndər
            </button>
          </form>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12149.849936129462!2d49.8786396!3d40.420757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403089a3b0fde691%3A0x38ac3991190cca0!2sAgro%20Bitki%20Klinikas%C4%B1%20-%20Fitolab!5e0!3m2!1str!2saz!4v1698134293423!5m2!1str!2saz"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
