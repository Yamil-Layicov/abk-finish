import {  useState } from 'react';
import './categoryModal.scss';
import api from "../../../api/posts";
import { toast } from 'react-toastify';

const CategoryModal = ({ setShowModal}) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("categories", { name });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Elave olundu");
        setShowModal(false);
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

  return (
    <div className="modal">
      <div className="modalInto" style={{position:"relative"}}>
        <form  onSubmit={handleSubmit}>
          <h2 style={{ color: "black" }}>Yenisini yarat</h2>
          <label>Kategoriya adı</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name || ""} />
          <button type="submit">Yadda saxla</button>
        </form>
        <span onClick={() => setShowModal(false)} style={{ color: "black", position:"absolute", top:"10px", right:"10px", cursor:"pointer" }}>X</span>
      </div>
    </div>
  );
};

export default CategoryModal;