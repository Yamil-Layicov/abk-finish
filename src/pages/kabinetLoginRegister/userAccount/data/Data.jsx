import "./data.scss";
import api from '../../../../admin/api/posts';
import { toast } from "react-toastify";

const Data = ({ posts }) => {

  const handleDelete = (postId) => {
    api.delete(`analyses/${postId}`)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
       toast.error('Error deleting:');
      });
  }

  return (
    <>
      <div className="insideRightSide">
        <div className="headerBox">
          <span>Tarix</span>
          <span>Fayl adı</span>
        </div>
        <div className="bodyMainBox">
          {posts && posts.map(post =>
            <div className="bodyBox" key={post?.id}>
              <div className="dateText">
                <span className="date">{new Date().toLocaleDateString()}</span>
                <span className="text">{post?.name}</span>
              </div>
              <div className="buttons">
                <a href={post?.file} rel="noreferrer" target="_blank">
                  Yüklə
                </a>
                <button onClick={() => handleDelete(post?.id)}>Sil</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Data;
