import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-20">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
