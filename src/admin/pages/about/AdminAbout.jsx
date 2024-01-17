import "./adminAbout.scss";
import { useEffect, useState } from "react";
import api from "../../api/posts";

const AdminAbout = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);

  const [image_1, setImage_1] = useState(null);
  const [previousImage_1, setPreviousImage_1] = useState(null);
  const [image_2, setImage_2] = useState(null);
  const [previousImage_2, setPreviousImage_2] = useState(null);
  const [image_3, setImage_3] = useState(null);
  const [previousImage_3, setPreviousImage_3] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("about");
        console.log(response.data);

        setContent(response.data.content);
        setTitle(response.data.title);

        setImage_1(response.data.image_1);
        setImage_2(response.data.image_2);
        setImage_3(response.data.image_3);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const handleImage_1 = (e) => {
    const file = e.target.files[0];
    setImage_1(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviousImage_1(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviousImage_1(null);
    }
  };

  const handleImage_2 = (e) => {
    const file = e.target.files[0];
    setImage_2(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviousImage_2(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviousImage_2(null);
    }
  };

  const handleImage_3 = (e) => {
    const file = e.target.files[0];
    setImage_3(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviousImage_3(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviousImage_3(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("title", title);

      formData.append("image_1", image_1);
      formData.append("image_2", image_2);
      formData.append("image_3", image_3);

      const response = await api.post("about", formData);

      // if(response) return setTimeout(() => {
      //   window.location.reload()
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="adminAbout">
      <h4>Haqqımızda</h4>
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
          <div className="imageFile">
            <div className="inputBox">
              <label>Böyük şəkil</label>
              <img src={previousImage_1 || image_1} alt="" />
              <input type="file" accept="image/*" onChange={handleImage_1} />
            </div>
            <div className="inputBox">
              <label>Ortancıl şəkil</label>
              <img src={previousImage_2 || image_2} alt="" />
              <input type="file" accept="image/*" onChange={handleImage_2} />
            </div>
            <div className="inputBox">
              <label>Kiçik şəkil</label>
              <img src={previousImage_3 || image_3} alt="" />
              <input type="file" accept="image/*" onChange={handleImage_3} />
            </div>
          </div>
          <button type="submit">Yadda saxla</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAbout;
