import "./faqEdit.scss";
import { useEffect, useState } from "react";
import api from "../../../api/posts";
import { useParams, useNavigate } from "react-router-dom";


const FaqEdit = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);

  const {id} = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get(`faq/${id}`);

        setContent(response.data.content);
        setTitle(response.data.title);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);


  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`faq/${id}`, {title, content});

      if(response) return navigate(-1)

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bloqEdit">
      <h4>Bloq Redaktə et</h4>
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
          <button type="submit" onClick={() => navigate("/admin/faq")}>Geri Qayıt</button>
        </form>
      </div>
    </div>
  );
};

export default FaqEdit;
