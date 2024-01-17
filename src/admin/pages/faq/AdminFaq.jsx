import "./adminFaq.scss";
import { useEffect, useState } from "react";
import api from "../../api/posts";
import { useNavigate } from "react-router-dom";
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin5Line} from 'react-icons/ri'

const AdminFaq = () => {
  const navigate = useNavigate();

  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("faq");
        setFaqData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleCreate = () => {
    navigate("create");
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`faq/${id}`);

      // if(response) return setTimeout(() => {
      //   window.location.reload()
      // }, 1000);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="adminFaq">
      <h4>FAQ</h4>
      <div className="tableContent">
        <div className="createNewBtn">
          <button onClick={handleCreate}>Yenisini yarat +</button>
        </div>
      <table>
        <tr>
          <th>Başlıq *</th>
          <th>Məzmun *</th>
          <th>Parametrlər</th>
        </tr>
        {faqData.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}><BiEditAlt/></button>
                <button onClick={() => handleDelete(item.id)}><RiDeleteBin5Line/></button>
              </td>
            </tr>
          ))}
      </table>
      </div>
    </div>
  );
};

export default AdminFaq;
