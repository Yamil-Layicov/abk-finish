import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import api from "../../admin/api/posts";
import "./services.scss";
import {useNavigate} from 'react-router-dom'

const Team = () => {
  const [serviceData, setServiceData] = useState([]);
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const [color, setColor] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("services");
        setServiceData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [serviceData]);

  const navigate = useNavigate()

  const handleNav = (id) => {
    navigate(`/xidmetler/${id}`)
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.slice(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(" ");

      if (lastSpaceIndex !== -1 && lastSpaceIndex < maxLength - 1) {
        return truncatedText.slice(0, lastSpaceIndex) + "...";
      } else {
        return truncatedText + "...";
      }
    }
  };

  const handleColor = (id) => {
    setColor(id);
  };

  return (
    <div className="services">
      <div className="galleryHeader">
        <h6>____XİDMƏTLƏRİMİZ</h6>
        <h1>Xidmət Sahəsi</h1>
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
            {serviceData.map((item) => (
              <motion.div
                key={item.id}
                className="item"
                onMouseOver={() => handleColor(item.id)}
                onMouseOut={() => setColor(null)}
              >
                <div className="labIcon" >
                  <img src={item.image} alt="" />
                  <span
                    style={{
                      backgroundColor: color === item?.id && item?.color,
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      transition: "all .5s",
                      opacity: ".5",
                    }}
                  ></span>
                </div>
                  <div className="deatilSpecialist">
                    <h3>{item.title}</h3>
                    <p>{truncateText(item?.content, 250)}</p>
                  </div>
                  <div className="readMore" onClick={() => handleNav(item.id)}>
                  <span style={{backgroundColor: color === item?.id && item?.color,}}></span>
                  <span>DAHA ƏTRAFLI</span>
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
