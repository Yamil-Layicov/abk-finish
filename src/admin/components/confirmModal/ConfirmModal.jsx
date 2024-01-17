import "./style.scss";
import { IoIosInformationCircle } from "react-icons/io";

const ConfirmModal = ({ handleConfirmDelete, handleCancelDelete, title }) => {
  return (
    <div className="confirmModal">
      <div className="intoModal">
        <IoIosInformationCircle className="confirmIcon"/>
        <h5>{title} silmək istədiyinizə əminsiniz?</h5>
        <div className="buttons">
          <button onClick={handleConfirmDelete}>Sil</button>
          <button onClick={handleCancelDelete}>Ləğv et</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
