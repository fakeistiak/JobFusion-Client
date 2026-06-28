import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileReminderModal from "@/components/ProfileReminderModal";

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
      <ProfileReminderModal />
      <ToastContainer />
    </div>
  );
};

export default Main;
