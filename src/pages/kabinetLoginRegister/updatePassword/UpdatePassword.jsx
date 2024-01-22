import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../admin/api/posts';
import { toast } from "react-toastify";



const UpdatePassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("forgot-password",{email})
      if(response){
        navigate("/account/verificationCode")
        toast.success("4 reqemli kod göndərildi")
        localStorage.setItem('id', response?.data);
      }
    } catch (err) {
      if(err.response.status === 403){
        toast.error("Bu e-poçt mövcud deyil")
      }
    }
  };

  return (
    <div className="mainRegister">
      <div className="headerBox"></div>
      <div className="register">
        <div className="intoRegister forWidth">
          <h3>Şifrəni yenilə</h3>
          <p className="updatedText"> E-mail adresi qeyd edin,təsdiqləmə kodu göndəriləcək</p>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
            <input
              type="email"
              placeholder="E-mail ünvan"
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <button className="otherBtns" type="submit">Dəvam et</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
