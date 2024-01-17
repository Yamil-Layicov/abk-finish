import './modal.scss';
import {AiOutlineClose} from 'react-icons/ai';

const Modal = ({setShowModal}) => {
  return (
    <div className='videoModal'>
      <div className="modalInto">
        <div onClick={() => setShowModal(false)} className="clsoeBtn"><AiOutlineClose/></div>
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/CA6AGfI1ORY?si=lZulQSkA63DMSU8D" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  )
}

export default Modal