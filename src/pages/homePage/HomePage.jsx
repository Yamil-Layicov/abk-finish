import About from "../../components/about/About";
import Feedback from "../../components/feedback/Feedback";
import Gallery from "../../components/gallery/Gallery";
import Header from "../../components/header/Header";
import HelmetMeta from "../../components/helmet/HelmetMeta";
import Services from '../../components/services/Services'
import Team from "../../components/team/Team";
import WhyChooseUs from "../../components/whyChooseUs/WhyChooseUs";

const HomePage = () => {
  return (
    <main style={{maxWidth:"2100px", margin:"auto"}}>
      <HelmetMeta title="Agro Bitki Klinikasi" content="Ən son texnoloji avadanlıqlarla təmin olunmuş tam lisenziyalı və akkreditə olunmuş laboratoriya."/>
      <Header />
      <Services/>
      <About/>
      <Gallery/>
      <WhyChooseUs/>
      <Team/>
      <Feedback/>
    </main>
  );
};

export default HomePage;
