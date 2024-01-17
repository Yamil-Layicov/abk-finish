// import "./bloqEdit.scss";
// import { useEffect, useState } from "react";
// import api from "../../../api/posts";
// import { useParams, useNavigate } from "react-router-dom";


// const BloqEdit = () => {
//   const [title, setTitle] = useState([]);
//   const [content, setContent] = useState([]);

//   const [image, setImage] = useState(null);
//   const [previousImage, setPreviousImage] = useState(null);

//   const {id} = useParams();
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await api.get(`blogs/${id}`);

//         setContent(response.data.content);
//         setTitle(response.data.title);
//         setImage(response.data.image);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     setImage(file);

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         setPreviousImage(e.target.result);
//       };

//       reader.readAsDataURL(file);
//     } else {
//       setPreviousImage(null);
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("content", content);
//       formData.append("title", title);

//       formData.append("image", image);

//       const response = await api.post(`blogs/${id}`, formData);

//       if(response) return navigate(-1)

//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div className="bloqEdit">
//       <h4>Bloq Redaktə et</h4>
//       <div className="intoSettings">
//         <form onSubmit={handleUpload}>
//           <div>
//             <label>Başlıq *</label>
//             <input
//               type="text"
//               value={title || ""}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Məzmun *</label>
//             <textarea
//               cols="30"
//               rows="7"
//               value={content || ""}
//               onChange={(e) => setContent(e.target.value)}
//             ></textarea>
//           </div>
//           <div className="imageFile">
//             <div className="inputBox">
//               <label>Kiçik şəkil</label>
//               <img style={{objectFit:"cover"}} src={previousImage || image} alt="" />
//               <input type="file" accept="image/*"  onChange={handleImage} />
//             </div>
//           </div>
//           <button type="submit">Yadda saxla</button>
//           <button type="submit" onClick={() => navigate("/admin/bloq")}>Geri Qayıt</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BloqEdit;


import "./bloqEdit.scss";
import { useEffect, useState } from "react";
import api from "../../../api/posts";
import { useParams, useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const BloqEdit = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState();

  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get(`blogs/${id}`);

        setContent(response.data.content);
        setTitle(response.data.title);
        setImage(response.data.image);
        setCategory(response.data.category.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const response = await api.get(`categories/${id}`);
  //       setCategory(response?.data?.name)

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchSettings();
  // }, []);

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
      formData.append("category_id", category)

      formData.append("image", image);

      const response = await api.post(`blogs/${id}`, formData);

      if (response) {
        toast.success("Redaktə olundu");
        navigate(-1);
      }
    } catch (error) {
      toast.error("xeta bas verdi");
      console.log(error);
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
            >
              <option value="" disabled>
                Kategoriya seçin
              </option>
              {data &&
                data?.data?.map((category) => (
                  <option
                    style={{ color: "black" }}
                    key={category?.id}
                    value={category?.id}
                  >
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
            ></textarea>
          </div>
          <div className="div">
            <label>Məzmun *</label>
            <textarea
              cols="30"
              rows="7"
              value={content || ""}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="imageFile div">
            <div className="logoBox">
              <label htmlFor="logo">
                <div className="logo">
                  <span>
                    <FiUploadCloud />{" "}
                  </span>
                  <span className="text">Şəkil</span>
                </div>
                <img src={previousImage || image} alt="" />
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
            <button type="submit" onClick={() => navigate("/admin/bloq")}>
              Geri Qayıt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloqEdit;