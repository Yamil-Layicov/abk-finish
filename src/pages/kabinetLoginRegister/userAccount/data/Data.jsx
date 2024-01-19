import "./data.scss";
import api from '../../../../admin/api/posts';
import { toast } from "react-toastify";
import { convertDate } from "../../../../helpers/DateFns";
import { useSearchParams } from "react-router-dom";

const Data = ({ posts }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDelete = (postId) => {
    api.delete(`analyses/${postId}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
       toast.error('Error deleting:',error);
      });
  }

  const data = JSON.parse(localStorage.getItem('user2'));
  const isDoctor = data?.user?.is_doctor


  return (
    <>
     {posts?.length === 0 ?  <h4 style={{paddingTop:"30px", color:"#231781"}}>Heç bir analiz mövcud deyil</h4> :  <div className="insideRightSide">
        <div className="headerBox">
          <span className="firstSpan">Tarix</span>
          <span className="secondSpan">Fayl adı</span>
          {isDoctor === 1 ? <span className="thirdSpan">İstifadəçi</span> : ''}
        </div>
        <div className="bodyMainBox">
          {posts && posts.map(post =>
            <div className="bodyBox" key={post?.id}>
              <div className="dateText">
                <span className="date">{convertDate(post?.created_at)}</span>
                <span className="text">{post?.name}</span>
                {isDoctor === 1 ? <span className="text2">{post?.user?.full_name}</span> : ""}
              </div>
              <div className="buttons">
                <a href={post?.file} rel="noreferrer" target="_blank" className="dowBtn">
                  Yüklə
                </a>
                {isDoctor === 1 && <button onClick={() => handleDelete(post?.id)} className="delBtn">Sil</button>}
              </div>
            </div>
          )}
        </div>
      </div>}
    </>
  );
};

export default Data;
