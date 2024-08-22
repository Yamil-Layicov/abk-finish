import { useState } from "react";
import api from "../../../api/posts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./bloqCreate.scss";
import { FiUploadCloud } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

const BloqCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category_id", category);

      if (image) {
        formData.append("image", image);
      }

      const response = await api.post("blogs", formData, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("categories"),
  });

  return (
    <div className="bloqCreate">
      <h4>Yeni Xəbər</h4>
      <div className="intoSettings">
        <form onSubmit={handleUpload}>
          <div className="div">
            <label>Kategoriyalar *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Kategoriya seçin
              </option>
              {isLoading && <option>Yüklənir...</option>}
              {error && <option>Xəta baş verdi</option>}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="div">
            <label>Məzmun *</label>
            <textarea
              cols="30"
              rows="7"
              value={content}
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Yüklənir..." : "Yadda Saxla"}
            </button>
            <button type="button" onClick={() => navigate(-1)}>
              Geri Qayıt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloqCreate;
