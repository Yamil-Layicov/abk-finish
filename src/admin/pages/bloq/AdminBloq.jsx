import "./adminBloq.scss";
import api from "../../api/posts";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProgressBar } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useState } from "react";
import CategoryModal from "./categoryModal/CategoryModal";
import CategoryEdit from "./categoryEdit/Categoryedit";

const AdminNews = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [categoryId, setCategoryId] = useState("")

  const createCategory = () => {
    setShowModal(!showModal);
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleCreate = () => {
    navigate("create");
  };

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handleEditCategory = (id) => {
    setShowModalEdit(true)
    setCategoryId(id)
  };

  const handleDeleteCategory = (id) => {
    mutationCategory.mutate(id);
  };

  const queryClient = useQueryClient();

  const { isLoading: isLoadingBlogs, data: blogData } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => api.get("blogs"),
  });


  const { isLoading: isLoadingCategories, data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("categories"),
  });

  const mutationCategory = useMutation({
    mutationFn: (id) => {
      return api.delete(`categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]).then(
        toast.success("Uğurla silindi") 
      );
    },
  }); 

  
  const mutation = useMutation({
    mutationFn: (id) => {
      return api.delete(`blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]).then(
        toast.success("Uğurla silindi")
      );
    },
  }); 

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.slice(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(" ");

      if (lastSpaceIndex !== -1 && lastSpaceIndex < maxLength - 1) {
        return truncatedText.slice(0, lastSpaceIndex) + "...";
      } else {
        return truncatedText + "...";
      }
    }
  };

  return (
    <div className="adminBloqMain">
      {showModal && <CategoryModal  setShowModal={setShowModal} />}
      {showModalEdit && <CategoryEdit categoryId={categoryId} setShowModalEdit={setShowModalEdit} />}
      <h4>Xəbərlər</h4>

      <div className="categoryContent">
        <div className="createNewBtn">
          <button onClick={createCategory}>Yeni kateqoriya yarat +</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>KATEQORIYA</th>
              <th>Y.TARIXI</th>
              <th>D.TARIXI</th>
              <th style={{ width: "100px" }}>Parametrlər</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingCategories ? (
              <tr>
                <td colSpan="5">
                  <div className="progressBar">
                    <ProgressBar
                      height="80"
                      width="80"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor="white"
                      barColor="#51E5FF"
                    />
                  </div>
                </td>
              </tr>
            ) : (
              categoryData?.data?.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category?.name}</td>
                  <td>{index}</td>
                  <td>{index}</td>
                  <td>
                    <button onClick={() => handleEditCategory(category?.id)}>
                      <BiEditAlt />
                    </button>
                    <button onClick={() => handleDeleteCategory(category?.id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="tableContent">
        <div className="createNewBtn">
          <button onClick={handleCreate}>Yeni xeber yarat +</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Şəkil *</th>
              <th>Kateqoriya *</th>
              <th style={{ width: "110px", padding: "12px" }}>Başlıq *</th>
              <th>Məzmun *</th>
              <th style={{ width: "100px" }}>Parametrlər</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingBlogs ? (
              <tr>
                <td colSpan="4">
                  <div className="progressBar">
                    <ProgressBar
                      height="80"
                      width="80"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor="white"
                      barColor="#51E5FF"
                    />
                  </div>
                </td>
              </tr>
            ) : (
              blogData.data?.map((item) => (
                <tr key={item.id}>
                  <td style={{ width: "110px", padding: "12px" }}>
                    <img
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt=""
                    />
                  </td>
                  <td style={{ width: "150px", padding: "12px" }}>
                    {item.category?.name}
                  </td>
                  <td style={{ width: "150px", padding: "12px" }}>
                    {item.title}
                  </td>
                  <td>{truncateText(item.content, 300)}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>
                      <BiEditAlt />
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNews;
