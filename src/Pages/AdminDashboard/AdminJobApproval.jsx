import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminJobApproval = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchPendingJobs = async () => {
    try {
      const res = await fetch("/jobs?status=pending");
      const data = await res.json();
      setJobs(data);
    } catch {
      toast.error("Failed to fetch pending jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const handleStatus = async (jobId, status) => {
    const adminEmail = localStorage.getItem("email");
    try {
      const res = await fetch(
        `/jobs/${jobId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, adminEmail }),
        },
      );
      const result = await res.json();
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j._id !== jobId));
        setSelectedJob(null);
        toast.success(result.message);
      } else {
        toast.error(result.message || "Action failed");
      }
    } catch {
      toast.error("Error updating job status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-slate-50">
      <ToastContainer />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Pending Job Approvals</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Job Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Company</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Posted By</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-slate-50">
                <td className="px-6 py-4">{job.job_title}</td>
                <td className="px-6 py-4">{job.company_name}</td>
                <td className="px-6 py-4">{job.postedBy}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleStatus(job._id, "approved")}
                    className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(job._id, "rejected")}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No pending jobs
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={() => setSelectedJob(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl mx-4 w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedJob.job_title}</h2>
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold text-gray-600 dark:text-gray-400">Company:</span> <span className="text-gray-800 dark:text-white">{selectedJob.company_name}</span></div>
              <div><span className="font-semibold text-gray-600 dark:text-gray-400">Location:</span> <span className="text-gray-800 dark:text-white">{selectedJob.location}</span></div>
              <div><span className="font-semibold text-gray-600 dark:text-gray-400">Work Type:</span> <span className="text-gray-800 dark:text-white">{selectedJob.remote_or_onsite}</span></div>
              <div><span className="font-semibold text-gray-600 dark:text-gray-400">Job Type:</span> <span className="text-gray-800 dark:text-white">{selectedJob.job_type}</span></div>
              <div><span className="font-semibold text-gray-600 dark:text-gray-400">Salary:</span> <span className="text-gray-800 dark:text-white">{selectedJob.salary}</span></div>
              <div><span className="font-semibold text-gray-600 dark:text-gray-400">Posted By:</span> <span className="text-gray-800 dark:text-white">{selectedJob.postedBy}</span></div>
              {selectedJob.logo && (
                <div className="col-span-2"><span className="font-semibold text-gray-600 dark:text-gray-400">Company Logo:</span> <img src={selectedJob.logo} alt="logo" className="h-12 mt-1" /></div>
              )}
              {selectedJob.job_responsibility && (
                <div className="col-span-2"><span className="font-semibold text-gray-600 dark:text-gray-400">Responsibilities:</span> <p className="text-gray-800 dark:text-white mt-1">{selectedJob.job_responsibility}</p></div>
              )}
              {selectedJob.educational_requirements && (
                <div className="col-span-2"><span className="font-semibold text-gray-600 dark:text-gray-400">Educational Requirements:</span> <p className="text-gray-800 dark:text-white mt-1">{selectedJob.educational_requirements}</p></div>
              )}
              {selectedJob.experiences && (
                <div className="col-span-2"><span className="font-semibold text-gray-600 dark:text-gray-400">Experience Required:</span> <p className="text-gray-800 dark:text-white mt-1">{selectedJob.experiences}</p></div>
              )}
              {selectedJob.contact_information && (
                <div className="col-span-2">
                  <span className="font-semibold text-gray-600 dark:text-gray-400">Contact:</span>
                  <p className="text-gray-800 dark:text-white mt-1">
                    {selectedJob.contact_information.phone && <>Phone: {selectedJob.contact_information.phone}<br /></>}
                    {selectedJob.contact_information.email && <>Email: {selectedJob.contact_information.email}</>}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-8 justify-end">
              <button
                onClick={() => handleStatus(selectedJob._id, "rejected")}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatus(selectedJob._id, "approved")}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobApproval;
