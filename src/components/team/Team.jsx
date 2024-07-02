import "./team.scss";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import img1 from "./imgs/Gulnar-Kazimova.jpg";
import img2 from "./imgs/aysun-babayeva.jpg";
import img3 from "./imgs//Ilahe-Salmanova.jpg"; 
import img4 from "./imgs/Jale-Huseynova.jpg";
import img5 from "./imgs/Sara-Ferzeliyeva.jpg";
import img6 from "./imgs/telli-mahmudova.jpg";
import img7 from "./imgs/teravet-tagizade.jpg";
import img8 from "./imgs/Uftade-Guner.jpg";
import img9 from "./imgs/Ulduz-Seferli.jpg";

const images = [
  {
    id: 2,
    title: img2,
    h3: "Aysun Babayeva",
    h6: "N/Q-mütəxəssis",
  },
  {
    id: 3,
    title: img3,
    h3: "İlahə Salmanova",
    h6: "Virusoloq",
  },
  {
    id: 4,
    title: img4,
    h3: "Jalə Hüseynova",
    h6: "Laborant",
  },
  {
    id: 5,
    title: img5,
    h3: "Sara Fərzəliyeva",
    h6: "Fitohelmintor",
  },
  {
    id: 6,
    title: img6,
    h3: "Telli Mahmudova",
    h6: "Bakterioloq",
  },
  {
    id: 7,
    title: img7,
    h3: "Təravət Tağızadə",
    h6: "Entemoloq",
  },
  {
    id: 1,
    title: img1,
    h3: "Gülnar Kazımova",
    h6: "Herboloq",
  },
  {
    id: 9,
    title: img9,
    h3: "Ulduz Səfərli",
    h6: "Mikoloq",
  },
];

const Team = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div className="team">
      <div className="galleryHeader">
        <h6>___KOMANDAMIZ</h6>
        <h1>Əməkdaşlarımızla tanış olun</h1>
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
              <motion.div key={index} className={`item`}>
                <img src={image.title} alt={`Item ${index}`} />
                <div className="deatilSpecialist">
                  <h3>{image.h3}</h3>
                  <h6>{image.h6}</h6>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
