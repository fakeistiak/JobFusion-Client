import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FadeLoader } from "react-spinners";

const AdminRoute = () => {
  const { isAdmin, loading } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetch("https://job-fusion-server-9yho.vercel.app/applications")
        .then((res) => res.json())
        .then((data) => {
          setApplications(data);
          setDataLoading(false);
        })
        .catch(() => setDataLoading(false));
    }
  }, [isAdmin]);

  if (loading || dataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#4A90E2" size={60} />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet context={{ applications }} />;
};

export default AdminRoute;
