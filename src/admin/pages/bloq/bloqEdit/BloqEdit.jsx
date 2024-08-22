import "./bloqEdit.scss";
import { useEffect, useState } from "react";
import api from "../../../api/posts";
import { useParams, useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const BloqEdit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get(`blogs/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category.id);
        setPreviousImage(response.data.image);
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
      }
    };

    fetchSettings();
  }, [id]); 

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviousImage(e.target.result); 
      reader.readAsDataURL(file);
    } else {
      setPreviousImage(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category_id", category);

      if (image) {
        formData.append("image", image);
      }


      const response = await api.post(`blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        toast.success("Redaktə olundu");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Xəta baş verdi");
    }
  };

  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("categories"),
  });

  return (
    <div className="bloqEdit">
      <h4>Redaktə et</h4>
      <div className="intoSettings">
        <form onSubmit={handleUpload}>
          <div className="div">
            <label>Kategoriyalar *</label>
            <select
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Kategoriya seçin
              </option>
              {isLoading && <option>Yüklənir...</option>}
              {data &&
                data?.data?.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="div">
            <label>Başlıq *</label>
            <textarea
              cols="30"
              rows="2"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="div">
            <label>Məzmun *</label>
            <textarea
              cols="30"
              rows="7"
              value={content || ""}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="imageFile div">
            <div className="logoBox">
              <label htmlFor="logo">
                <div className="logo">
                  <span>
                    <FiUploadCloud />
                  </span>
                  <span className="text">Şəkil</span>
                </div>
                {previousImage && <img src={previousImage} alt="Preview" />}
              </label>
              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>
          </div>
          <div className="buttons">
            <button type="submit">Yadda saxla</button>
            <button type="button" onClick={() => navigate("/admin/bloq")}>
              Geri Qayıt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloqEdit;
