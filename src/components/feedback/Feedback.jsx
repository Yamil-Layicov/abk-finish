import "./feedback.scss";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
    {
      id: 1,
      title:
        "Məhsullarımız ixrac olunduğu üçün daima analizlərin aparılması vacibdir. Agro Bitki Klinikası böyük həcmli sifarişlərin öhdəsindən operativ və keyfiyyətli gələn bir laboratoriya olaraq bizim etimadımızı qazanmış bir komandadır. Bu cür keyifiyyətli iş üçün komandaya təşəkkürlərimizi bildiririk.",
        h3:"Həsən Əliyev ",
        h6:"Bine Agro"
    },
    {
      id: 2,
      title:
        "Toxumların keyfiyyətindən əmin olmaq üçün daima Agro Bitki Klinikasında analizlər aparılır. Göstərdiyiniz sürətli və peşəkar xidmətə görə Sizə dərin minnətdarlığımızı bildiririk. Əməkdaşlığmızın daha da möhkəmlənmasinə ümüdü ilə Sizə uğurlar arzu edirik.",
        h3:"Xəqani Məmmədov  ",
        h6:"Toxumçuluq Tingçilik"
    },
    {
      id: 3,
      title:
        "Meyvə bağlarımıza nə qədər qulluq etsək də, istənilən nəticə əldə edə bilmirdik. Agro Bitki Klinikasının mütəxəssisləri tərəfindən keçirilən monitprinqlər, edilən analizlər və məsləhətlərin köməyi ilə artıq bol məhsul əldə edirik",
        h3:"Tural Hacıyev",
        h6:"Fermer"
    },
  ];


const Feedback = () => {


  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);


  return (
    <div className="feedback">
      <div className="galleryHeader">
        <h6>___RƏYLƏR___</h6>
        <h1>Müştəri Məmnuniyyəti</h1>
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
                className={`item`}
              >
                 <p>{image.title}</p>
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

export default Feedback;
