import { useState } from 'react';
import api from "../../../../../admin/api/posts";
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';


const CategoryEdit = ({ setShowModalEdit, categoryId }) => {
  const [name, setName] = useState('');

  const { data, isLoading, isError } = useQuery(
    ['analyses-category', categoryId],
    async () => {
      const response = await api.get(`analyses-categories/${categoryId}`);
      setName(response?.data.name);
    }
  );


  const editCategory = useMutation(
    async () => {
      const res = await api.post(`analyses-categories/${categoryId}`, { name });
      return res.data;
    },
    {
      onSuccess: () => {
        window.location.reload();
        setShowModalEdit(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory.mutate();
  };


  return (
    <div className="modal">
      <div className="modalInto" style={{position:"relative"}}>
        <form onSubmit={handleSubmit}>
          <h2>Redaktə et</h2>
          <label>Analizin növü</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name || ""} />
          <button type="submit">Yadda saxla</button>
        </form>
        <span className='closeModalBtn' onClick={() => setShowModalEdit(false)}>X</span>
      </div>
    </div>
  );
};

export default CategoryEdit;