import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


const HomeLayout = () => {
  return (
    <main style={{maxWidth:"2100px", margin:"auto"}}>
      <Navbar />
        <Outlet />
      <Footer />
    </main>
  );
};

export default HomeLayout;
