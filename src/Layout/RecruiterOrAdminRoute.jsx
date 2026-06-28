import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FadeLoader } from "react-spinners";

const RecruiterOrAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#4A90E2" size={60} />
      </div>
    );
  }

  const role = user?.role;
  if (!user || (role !== "recruiter" && role !== "admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RecruiterOrAdminRoute;
