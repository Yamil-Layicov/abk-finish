
import { useState } from "react";
import api from "../../../api/posts";
import { useNavigate } from "react-router-dom";



const FaqCreate = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);

  const navigate = useNavigate()



  const handleUpload = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(`faq`, {title, content});

      if(response) return navigate(-1)

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bloqEdit">
      <h4>Yeni Faq yarat</h4>
      <div className="intoSettings">
        <form onSubmit={handleUpload}>
          <div>
            <label>Başlıq *</label>
            <input
              type="text"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Məzmun *</label>
            <textarea
              cols="30"
              rows="7"
              value={content || ""}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Yadda saxla</button>
          <button type="submit" onClick={() => navigate(-1)}>Geri Qayıt</button>
        </form>
      </div>
    </div>
  );
};

export default FaqCreate;
