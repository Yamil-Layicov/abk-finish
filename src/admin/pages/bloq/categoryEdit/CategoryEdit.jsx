import { useEffect, useState } from 'react';
import api from "../../../api/posts";
import { toast } from 'react-toastify';

const CategoryEdit = ({ setShowModalEdit, categoryId }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`categories/${categoryId}`, { name });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Redaktə   olundu");
        setShowModalEdit(false);
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1000);
      } else {
        console.error("Error:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get(`categories/${categoryId}`);
        setName(response?.data?.name)
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="modal">
      <div className="modalInto" style={{position:"relative"}}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "black" }}>Redaktə et</h2>
          <label>Kategoriya adı</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name || ""} />
          <button type="submit">Yadda saxla</button>
        </form>
        <span onClick={() => setShowModalEdit(false)} style={{ color: "black", position:"absolute", top:"10px", right:"10px", cursor:"pointer" }}>X</span>
      </div>
    </div>
  );
};

export default CategoryEdit;