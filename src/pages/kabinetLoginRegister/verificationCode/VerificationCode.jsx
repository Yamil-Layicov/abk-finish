import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../admin/api/posts";
import { toast } from "react-toastify";

const VerificationCode = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate()

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem('id');

      if (!id) {
        toast.error("Id tapilmadi");
        return;
      }

      const response = await api.post("enter-code", { code, id });

      if (response) {
        toast.success("");
        navigate("/account/newPassword")
      }
    } catch (err) {
      toast.error("eorrorrrr");
    }
  };

  const resendHandle = async () => {
    try {
      const id = localStorage.getItem('id');

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
  }

  return (
    <div className="mainRegister">
      <div className="headerBox"></div>
      <div className="register">
        <div className="intoRegister">
          <h3>Təsdiqləmə kodu</h3>
          <p className="updatedText">
            Zəhmət olmasa e-mail adresinizi yoxlayın,təsdiqləmə kodunu qeyd edin
          </p>
          <form onSubmit={handleSumbit}>
            <div className="verificBtns">
              <input
                onChange={(e) => setCode(e.target.value)}
                style={{ width: "100%" }}
                type="number"
                className="box"
              ></input>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="time">1:22</span>
              <p
                style={{
                  color: "#356FC6",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => resendHandle()}
              >
                Kodu yenidən göndər
              </p>
            </div>

            <button
              className="otherBtns"
              type="submit"
            >
              Göndər
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
