import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!hideNavFooter && <NavBar />}
      <div className={hideNavFooter ? "mt-0" : "mt-12"}>
        <Outlet />
      </div>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default Main;
