import "./faqPage.scss";
import bgImg from "../../assets/abk-banner-3.jpg";
import api from "../../admin/api/posts";
import { useEffect, useState } from "react";
import HelmetMeta from "../../components/helmet/HelmetMeta";

const FaqPage = () => {
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

  return (
    <div className="faqPage">
       <HelmetMeta title="FAQ" content="Bitki Xəstəliklərinin Diaqnostikası Nədir?"/>
      <div className="hedaerSection">
        <div className="img">
          <img src={bgImg} alt="" />
        </div>
        <h1>FAQ</h1>
      </div>
      <div className="faqText">
        <h1>Tez-tez soruşulan suallar</h1>
        <p>
          Aşağıda Agro Bitki Klinikasına ən çox verilən suallara cavab tapa
          bilərsiniz. <br /> Əlavə sual yaranarsa faq@abk-fito.az ünvanına
          e-poçt göndərmək və tezliklə cavab almaq mümkündür
        </p>
      </div>
      <div className="accordion accordions" id="accordionExample">
        {faqData?.map((faqBox, index) => (
          <>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseOne${index}`}
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  {faqBox.title}
                </button>
              </h2>
              <div
                id={`collapseOne${index}`}
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {faqBox.content}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="messageBox">
        <h1>Hər hansı bir kömək lazımdır</h1>
        <div className="form">
          <h4>Bizimlə Birbaşa Əlaqə</h4>
          <form>
            <input type="text" placeholder="adınızı daxil edin" />
            <input type="text" placeholder="e-poçt daxil edin " />
            <textarea
              name=""
              id=""
              cols="30"
              placeholder="mesajınızı yazın"
              rows="10"
            ></textarea>
          </form>
          <button>Mesaj göndərin</button>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
