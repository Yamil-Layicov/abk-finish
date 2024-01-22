import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../admin/api/posts";
import { toast } from "react-toastify";

const VerificationCode = () => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  

  const handleChange = (e, index) => {
    const newValue = e.target.value.slice(0, 1);
    const newInputs = [...inputs];
    newInputs[index] = newValue;
    setInputs(newInputs);

    if (newValue) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = localStorage.getItem("id");

      if (!id) {
        toast.error("Id tapilmadi");
        return;
      }

      const response = await api.post("enter-code", {
        code: inputs.join(""),
        id,
      });
      if (response) {
        toast.success("Uğurlu əməliyyat");
        navigate("/account/newPassword");
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resendHandle = async () => {
    try {
      const id = localStorage.getItem("id");

      if (!id) {
        toast.error("Id tapilmadi");
        return;
      }

      const response = await api.post("resend", { id });

      if (response) {
        toast.success("okokkkk");
      }
    } catch (err) {
      toast.error("eorrorrrr");
    }
  };

  return (
    <div className="mainRegister">
      <div className="headerBox"></div>
      <div className="register">
        <div className="intoRegister forWidth">
          <h3>Təsdiqləmə kodu</h3>
          <p className="updatedText">
            Zəhmət olmasa e-mail adresinizi yoxlayın,təsdiqləmə kodunu qeyd edin
          </p>
          <form onSubmit={handleSubmit}>
            <div className="verificBtns">
              {inputs.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  maxLength={1}
                  required
                  className="box"
                  style={{
                    textAlign: 'center',
                  }}
                  ref={(inputRef) => {
                    inputRefs.current[index] = inputRef;
                  }}
                />
              ))}
            </div>
            <div className="resendBox">
              <span className="time resendCode">1:22</span>
              <p
              className="resendCode"
                onClick={() => resendHandle()}
              >
                Kodu yenidən göndər
              </p>
            </div>

            <button className="otherBtns" type="submit">
              Göndər
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
