import {  useState } from 'react';
import './categoryModal.scss';
import { toast } from 'react-toastify';
import api from '../../../../../admin/api/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CategoryModal = ({ setShowModal}) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');


  const createCategory = async (newCategory) => {
    const res = await api.post('analyses-categories', newCategory);
    if (res.status >= 200 && res.status < 300) {
      return res.data; 
    } else {
      throw new Error(`Error: ${res.statusText}`);
    }
  };

  const { mutate } = useMutation(createCategory, {
    onSuccess: () => {
      toast.success('Elave olundu');
      queryClient.invalidateQueries('categories');
      setShowModal(false);
    },
    onError: (error) => {
      toast.error('Xəta baş verdi');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ name });
  };

 

  return (
    <div className="modal">
      <div className="modalInto" style={{position:"relative"}}>
        <form  onSubmit={handleSubmit}>
          <h2 style={{ color: "black" }}>Yenisini yarat</h2>
          <label>Analizin növü</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name || ""} />
          <button type="submit">Yadda saxla</button>
        </form>
        <span onClick={() => setShowModal(false)} style={{ color: "black", position:"absolute", top:"10px", right:"10px", cursor:"pointer" }}>X</span>
      </div>
    </div>
  );
};

export default CategoryModal;