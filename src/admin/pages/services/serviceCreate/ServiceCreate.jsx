import { useState } from "react";
import api from "../../../api/posts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ServiceEdit = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [color, setColor] = useState([]);

  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviousImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviousImage(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("title", title);
      formData.append("color", color);

      if (image) {
        formData.append("image", image);
      }

      const response = await api.post("services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        toast.success("Elave olundu");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Xeta bas verdi");
    }
  };

  return (
    <div className="bloqEdit">
      <h4>Yeni xidmət yarat</h4>
      <div className="intoSettings">
        <form onSubmit={handleUpload}>
          <div>
            <label>Şəkil rəngi *</label>
            <input
              type="color"
              value={color || ""}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: "100%", height: "50px", cursor: "pointer" }}
            />
          </div>
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
          <div className="imageFile">
            <div className="inputBox">
              <label>şəkil</label>
              <img src={previousImage || image} alt="" />
              <input type="file" accept="image/*" onChange={handleImage} />
            </div>
          </div>
          <button type="submit">Yadda saxla</button>
          <button type="submit" onClick={() => navigate(-1)}>
            Geri Qayıt
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceEdit;
