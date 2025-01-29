import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {FadeLoader } from "react-spinners";

const PrivateRoute = ({children}) => {
  const {user,loading}=useContext(AuthContext);
  const location =useLocation()

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
      <FadeLoader color="#4A90E2" size={60} />
    </div>
    )
  }

  if(user){
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>

};

export default PrivateRoute;