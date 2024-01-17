import './modal.scss';

const Modal = ({ showModal, closeModal, images, currentIndex, handlePrev, handleNext }) => {
  const image = images[currentIndex];

  return (
    <div className={`modal ${showModal ? 'show' : ''}`} onClick={closeModal}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img src={image.title} alt={image.title} />

        <button className="prev" onClick={handlePrev}>&#10094;</button>
        <button className="next" onClick={handleNext}>&#10095;</button>
      </div>
    </div>
  );
};

export default Modal;