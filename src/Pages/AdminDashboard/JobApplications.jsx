import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch(
        "https://job-fusion-server-9yho.vercel.app//jobApplication"
      );
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      toast.error("Failed to fetch job applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this application?</p>
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => closeToast()}
            >
              No
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => {
                handleDelete(id);
                closeToast();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ),
      {
        closeOnClick: false,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://job-fusion-server-9yho.vercel.app//jobApplication/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();

      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        toast.success(result.message || "Application deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete application");
      }
    } catch (error) {
      toast.error("Error deleting application");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">All Job Applications</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Applicant Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Company
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Job Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Remote/Onsite
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Salary
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-slate-50">
                <td className="px-6 py-4">{app.applicant_email}</td>
                <td className="px-6 py-4">{app.job_title}</td>
                <td className="px-6 py-4">{app.company_name}</td>
                <td className="px-6 py-4">{app.location}</td>
                <td className="px-6 py-4">{app.job_type}</td>
                <td className="px-6 py-4">{app.remote_or_onsite}</td>
                <td className="px-6 py-4">{app.salary}</td>
                <td className="px-6 py-4">
                  <button
                    className="px-3 py-1 text-red-600 hover:text-red-800"
                    onClick={() => confirmDelete(app._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplications;
