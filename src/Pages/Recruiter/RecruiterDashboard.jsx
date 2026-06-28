import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  X, ExternalLink, Calendar, Mail, Phone, BookOpen,
  Linkedin, Github, Globe, FileText, User, ChevronLeft, Eye,
  CheckCircle, XCircle, Clock, Loader2, Search, CalendarClock, Trash2,
} from "lucide-react";

const statusConfig = {
  pending: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", label: "Pending" },
  reviewing: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", label: "Reviewing" },
  accepted: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", label: "Accepted" },
  rejected: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", label: "Rejected" },
};

const RecruiterDashboard = () => {
  const { user } = useContext(AuthContext);
  const [myJobs, setMyJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [imgErrors, setImgErrors] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewMessage, setInterviewMessage] = useState("");
  const [interviewAppId, setInterviewAppId] = useState(null);
  const [applicantTab, setApplicantTab] = useState("active");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const photoSrc = (url, name) => {
    if (imgErrors[url] || !url) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "U")}&background=10A881&color=fff`;
    }
    return url.startsWith("http") ? url : url.startsWith("/") ? url : `/${url}`;
  };

  const email = user?.email || localStorage.getItem("email");

  const fetchData = () => {
    if (!email) return;
    setLoading(true);
    Promise.all([
      fetch(`/my-jobs/${email}`).then((r) => r.json()),
      fetch(`/job-applications/for-recruiter/${email}`).then((r) => r.json()),
    ])
      .then(([jobsData, appsData]) => {
        setMyJobs(jobsData);
        setApplications(appsData);
      })
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [email]);

  const handleStatusUpdate = async (appId, newStatus, date, msg) => {
    setUpdatingStatus(appId);
    try {
      const body = { status: newStatus };
      if (newStatus === "accepted" && date) {
        body.interviewDate = date;
        body.interviewMessage = msg || "";
      }
      const res = await fetch(`/jobApplication/${appId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setApplications((prev) =>
          prev.map((a) =>
            a._id === appId
              ? { ...a, status: newStatus, interviewDate: date || a.interviewDate, interviewMessage: msg || a.interviewMessage }
              : a
          )
        );
        if (selectedApplicant?._id === appId) {
          setSelectedApplicant((prev) => ({
            ...prev,
            status: newStatus,
            interviewDate: date || prev.interviewDate,
            interviewMessage: msg || prev.interviewMessage,
          }));
        }
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getApplicantsForJob = (jobId) =>
    applications.filter((app) => app.job_id === jobId);

  const getActiveApplicantsForJob = (jobId) =>
    applications.filter((app) => app.job_id === jobId && app.status !== "rejected" && app.status !== "accepted");

  const handleDeleteJob = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(`/jobs/${deleteConfirm}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setMyJobs((prev) => prev.filter((j) => j._id !== deleteConfirm));
        setApplications((prev) => prev.filter((a) => a.job_id !== deleteConfirm));
      } else {
        toast.error(data.message || "Failed to delete job");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setSelectedApplicant(null);
  };

  const countByStatus = (jobId) => {
    const apps = getApplicantsForJob(jobId);
    const active = apps.filter((a) => a.status !== "rejected");
    return {
      total: active.length,
      accepted: apps.filter((a) => a.status === "accepted").length,
      rejected: apps.filter((a) => a.status === "rejected").length,
      pending: apps.filter((a) => a.status === "pending" || !a.status).length,
      reviewing: apps.filter((a) => a.status === "reviewing").length,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-slate-50 dark:bg-slate-900">
      <ToastContainer />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Recruiter Dashboard</h1>
        <button
          onClick={fetchData}
          className="px-4 py-2 text-sm font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/40 transition flex items-center gap-2"
        >
          <Loader2 className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{myJobs.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Posted Jobs</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-2xl font-bold text-blue-600">{applications.filter((a) => a.status === "reviewing" || a.status === "pending" || !a.status).length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Awaiting Review</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-2xl font-bold text-green-600">{applications.filter((a) => a.status === "accepted").length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Accepted</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-2xl font-bold text-red-600">{applications.filter((a) => a.status === "rejected").length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Job Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Applicants</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Interviews</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Salary</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {myJobs.map((job) => {
              const counts = countByStatus(job._id);
              return (
                <tr
                  key={job._id}
                  onClick={() => {
                    setSelectedJob(job);
                    setSelectedApplicant(null);
                    setApplicantTab("active");
                  }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-teal-600 dark:text-teal-400">{job.job_title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.company_name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      job.status === "approved"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : job.status === "rejected"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    }`}>
                      {job.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                      {counts.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {counts.accepted}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                      <CalendarClock className="w-3 h-3" />
                      {getApplicantsForJob(job._id).filter((a) => a.status === "accepted" && a.interviewDate).length}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{job.location}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{job.salary}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirm(job._id); }}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      title="Delete job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {myJobs.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500 dark:text-gray-400">
                  You haven't posted any jobs yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b dark:border-slate-700 shrink-0">
              <div className="flex items-center gap-3">
                {selectedApplicant && (
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                  </button>
                )}
                <div>
                  {selectedApplicant ? (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Applicant Details</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedJob.job_title} &middot; {selectedJob.company_name}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedJob.job_title}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {selectedJob.company_name} &middot;{" "}
                        {applicantTab === "active"
                          ? `${getActiveApplicantsForJob(selectedJob._id).length} active applicant${getActiveApplicantsForJob(selectedJob._id).length !== 1 ? "s" : ""}`
                          : `${getApplicantsForJob(selectedJob._id).filter((a) => a.status === "accepted" && a.interviewDate).length} interview${getApplicantsForJob(selectedJob._id).filter((a) => a.status === "accepted" && a.interviewDate).length !== 1 ? "s" : ""} scheduled`
                        }
                      </p>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedApplicant ? (
                <div className="space-y-6">
                  {/* Status & Actions */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={photoSrc(selectedApplicant.photoURL, selectedApplicant.name || selectedApplicant.applicant_email)}
                          alt={selectedApplicant.name || "Applicant"}
                          className="w-16 h-16 rounded-full object-cover shrink-0"
                          onError={() => setImgErrors((prev) => ({ ...prev, [selectedApplicant.photoURL]: true }))}
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {selectedApplicant.name || selectedApplicant.applicant_email}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${
                            statusConfig[selectedApplicant.status]?.bg || statusConfig.pending.bg
                          } ${
                            statusConfig[selectedApplicant.status]?.text || statusConfig.pending.text
                          }`}>
                            {selectedApplicant.status === "reviewing" && <Search className="w-3 h-3" />}
                            {selectedApplicant.status === "accepted" && <CheckCircle className="w-3 h-3" />}
                            {selectedApplicant.status === "rejected" && <XCircle className="w-3 h-3" />}
                            {(!selectedApplicant.status || selectedApplicant.status === "pending") && <Clock className="w-3 h-3" />}
                            {statusConfig[selectedApplicant.status]?.label || "Pending"}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {selectedApplicant.status !== "reviewing" && (
                          <button
                            onClick={() => handleStatusUpdate(selectedApplicant._id, "reviewing")}
                            disabled={updatingStatus === selectedApplicant._id}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20 transition disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {updatingStatus === selectedApplicant._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                            Review
                          </button>
                        )}
                        {selectedApplicant.status !== "accepted" && (
                          <button
                            onClick={() => {
                              setInterviewAppId(selectedApplicant._id);
                              setInterviewDate("");
                              setInterviewMessage("");
                              setShowInterviewModal(true);
                            }}
                            disabled={updatingStatus === selectedApplicant._id}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {updatingStatus === selectedApplicant._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                            Accept
                          </button>
                        )}
                        {selectedApplicant.status !== "rejected" && (
                          <button
                            onClick={() => handleStatusUpdate(selectedApplicant._id, "rejected")}
                            disabled={updatingStatus === selectedApplicant._id}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {updatingStatus === selectedApplicant._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Name</p>
                        <p className="text-gray-900 dark:text-white font-medium">{selectedApplicant.name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                        <p className="text-gray-900 dark:text-white font-medium">{selectedApplicant.applicant_email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</p>
                        <p className="text-gray-900 dark:text-white font-medium">{selectedApplicant.phone || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Education</p>
                        <p className="text-gray-900 dark:text-white font-medium">{selectedApplicant.education || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Applied Date</p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {selectedApplicant.appliedAt
                            ? new Date(selectedApplicant.appliedAt).toLocaleDateString("en-US", {
                                year: "numeric", month: "long", day: "numeric",
                              })
                            : "-"}
                        </p>
                      </div>
                      {selectedApplicant.salaryExpectation && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Salary Expectation</p>
                          <p className="text-gray-900 dark:text-white font-medium">{selectedApplicant.salaryExpectation}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interview Details */}
                  {selectedApplicant.status === "accepted" && selectedApplicant.interviewDate && (
                    <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Interview Scheduled</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-green-700 dark:text-green-400">
                          <span className="font-semibold">Date & Time:</span>{" "}
                          {new Date(selectedApplicant.interviewDate).toLocaleString("en-US", {
                            dateStyle: "full",
                            timeStyle: "short",
                          })}
                        </p>
                        {selectedApplicant.interviewMessage && (
                          <p className="text-sm text-green-600 dark:text-green-500 italic">
                            "{selectedApplicant.interviewMessage}"
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Links &amp; Resume</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedApplicant.linkedIn && (
                        <a href={selectedApplicant.linkedIn} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                          <Linkedin className="w-4 h-4" /> LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {selectedApplicant.github && (
                        <a href={selectedApplicant.github} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                          <Github className="w-4 h-4" /> GitHub <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {selectedApplicant.resume && (
                        <a href={selectedApplicant.resume} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/40 transition">
                          <FileText className="w-4 h-4" /> Resume <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {selectedApplicant.portfolio && (
                        <a href={selectedApplicant.portfolio} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 transition">
                          <Globe className="w-4 h-4" /> Portfolio <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  {selectedApplicant.coverLetter && (
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cover Letter</h3>
                      <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-5">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                          {selectedApplicant.coverLetter}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-700 rounded-xl p-1 w-fit">
                    <button
                      onClick={() => { setApplicantTab("active"); setSelectedApplicant(null); }}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                        applicantTab === "active"
                          ? "bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <Clock className="w-4 h-4 inline mr-1.5" />
                      Active ({getActiveApplicantsForJob(selectedJob._id).length})
                    </button>
                    <button
                      onClick={() => { setApplicantTab("scheduled"); setSelectedApplicant(null); }}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                        applicantTab === "scheduled"
                          ? "bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <CalendarClock className="w-4 h-4 inline mr-1.5" />
                      Interviews ({getApplicantsForJob(selectedJob._id).filter((a) => a.status === "accepted" && a.interviewDate).length})
                    </button>
                  </div>

                  {applicantTab === "active" ? (
                    (() => {
                      const applicants = getActiveApplicantsForJob(selectedJob._id);
                      if (applicants.length === 0) {
                        return (
                          <div className="text-center py-16">
                            <User className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No active applicants for this job</p>
                          </div>
                        );
                      }
                      return (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-700">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Applicant</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Phone</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Salary Exp.</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Applied</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                              {applicants.map((app) => (
                                <tr
                                  key={app._id}
                                  onClick={() => setSelectedApplicant(app)}
                                  className="hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition"
                                >
                                  <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={photoSrc(app.photoURL, app.name || app.applicant_email)}
                                        alt={app.name || "Applicant"}
                                        className="w-9 h-9 rounded-full object-cover shrink-0"
                                        onError={() => setImgErrors((prev) => ({ ...prev, [app.photoURL]: true }))}
                                      />
                                      <span className="font-medium text-gray-900 dark:text-white">
                                        {app.name || app.applicant_email}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{app.applicant_email}</td>
                                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{app.phone || "-"}</td>
                                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{app.salaryExpectation || "-"}</td>
                                  <td className="px-4 py-4">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                      statusConfig[app.status]?.bg || statusConfig.pending.bg
                                    } ${
                                      statusConfig[app.status]?.text || statusConfig.pending.text
                                    }`}>
                                      {app.status === "reviewing" && <Search className="w-3 h-3" />}
                                      {app.status === "accepted" && <CheckCircle className="w-3 h-3" />}
                                      {app.status === "rejected" && <XCircle className="w-3 h-3" />}
                                      {(!app.status || app.status === "pending") && <Clock className="w-3 h-3" />}
                                      {statusConfig[app.status]?.label || "Pending"}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap">
                                    {app.appliedAt
                                      ? new Date(app.appliedAt).toLocaleDateString()
                                      : "-"}
                                  </td>
                                  <td className="px-4 py-4 text-right">
                                    <span className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm font-medium">
                                      <Eye className="w-4 h-4" /> View
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()
                  ) : (
                    (() => {
                      const interviews = getApplicantsForJob(selectedJob._id)
                        .filter((a) => a.status === "accepted" && a.interviewDate)
                        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));
                      if (interviews.length === 0) {
                        return (
                          <div className="text-center py-16">
                            <CalendarClock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No interviews scheduled yet</p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Accept candidates with a date & time to schedule interviews</p>
                          </div>
                        );
                      }
                      return (
                        <div className="space-y-4">
                          {interviews.map((app) => (
                            <div
                              key={app._id}
                              onClick={() => setSelectedApplicant(app)}
                              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl hover:shadow-md hover:border-teal-300 dark:hover:border-teal-600 cursor-pointer transition-all"
                            >
                              <div className="flex flex-col items-center min-w-[60px]">
                                <span className="text-lg font-bold text-teal-600">
                                  {new Date(app.interviewDate).toLocaleDateString("en-US", { day: "numeric" })}
                                </span>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                  {new Date(app.interviewDate).toLocaleDateString("en-US", { month: "short" })}
                                </span>
                              </div>
                              <div className="w-px h-12 bg-slate-200 dark:bg-slate-600" />
                              <img
                                src={photoSrc(app.photoURL, app.name || app.applicant_email)}
                                alt={app.name || "Applicant"}
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                                onError={() => setImgErrors((prev) => ({ ...prev, [app.photoURL]: true }))}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 dark:text-white truncate">
                                  {app.name || app.applicant_email}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{app.applicant_email}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {new Date(app.interviewDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {new Date(app.interviewDate).toLocaleDateString("en-US", { weekday: "short" })}
                                </p>
                              </div>
                              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180 shrink-0" />
                            </div>
                          ))}
                        </div>
                      );
                    })()
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Delete Job</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              Are you sure you want to delete this job? All applications and interview data for this position will also be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteJob}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowInterviewModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-teal-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Schedule Interview</h2>
              </div>
              <button onClick={() => setShowInterviewModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Set a date, time and optional message for the interview call with this candidate.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={interviewMessage}
                  onChange={(e) => setInterviewMessage(e.target.value)}
                  placeholder="e.g. Please prepare a brief introduction about yourself and your previous projects."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8 justify-end">
              <button
                onClick={() => setShowInterviewModal(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!interviewDate) {
                    toast.error("Please select a date and time");
                    return;
                  }
                  await handleStatusUpdate(interviewAppId, "accepted", interviewDate, interviewMessage);
                  setShowInterviewModal(false);
                }}
                disabled={updatingStatus === interviewAppId}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {updatingStatus === interviewAppId ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
