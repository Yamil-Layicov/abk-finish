import "./gallery.scss";
import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import img1 from './imgs/abk-gallery-1.jpg';
import img2 from './imgs/abk-gallery-2.jpg';
import img3 from './imgs/abk-gallery-3.jpg';
import img4 from './imgs/abk-gallery-4.jpg';
import img5 from './imgs/abk-gallery-5.jpg';

const images = [
    {
      id: 1,
      title: img1
    },
    {
      id: 2,
      title: img2
    },
    {
      id: 3,
      title: img3
    },
    {
      id: 4,
      title: img4
    },
    {
      id: 5,
      title: img5
    },
  ];

const Modal = lazy(() => import("./modal/Modal"));

const Gallery = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const openModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="gallery">
      <div className="galleryHeader">
        <h6>___İŞ QALEREYASI___</h6>
        <h1>Agro Bitki Klinikası Qalereya</h1>
      </div>
      <div className="gallerySlider">
        <motion.div
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
          className="carousel"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`item ${hoveredItem === index ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img src={image.title} alt={`Item ${index}`} />
                {hoveredItem === index && (
                  <motion.div
                   initial={{opacity:0, y:-60}}
                   animate={{opacity:1, y:0, rotateY:180}}
                   transition={{duration:.5}}
                   className="plusIcon"
                   onClick={() => openModal(index)}
                   >
                    <span><AddIcon  fontSize="large"/></span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            showModal={showModal}
            closeModal={closeModal}
            images={images}
            currentIndex={currentIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Gallery;
