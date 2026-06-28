import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Briefcase, MapPin, Clock, CheckCircle, XCircle, Search, Loader2, Trash2, Calendar,
} from "lucide-react";

const statusConfig = {
  pending: { icon: Clock, bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", label: "Pending", bar: "bg-yellow-400" },
  reviewing: { icon: Search, bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", label: "Reviewing", bar: "bg-blue-400" },
  accepted: { icon: CheckCircle, bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", label: "Accepted", bar: "bg-green-400" },
  rejected: { icon: XCircle, bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", label: "Rejected", bar: "bg-red-400" },
};

const pipelineSteps = [
  { key: "pending", label: "Submitted" },
  { key: "reviewing", label: "Under Review" },
  { key: "accepted", label: "Accepted" },
];

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role && user.role !== "candidate") {
      toast.info("Only candidates can access applied jobs");
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const fetchApplications = useCallback(() => {
    if (!user) return;
    fetch(`/jobApplication?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchApplications();
    const interval = setInterval(fetchApplications, 15000);
    return () => clearInterval(interval);
  }, [fetchApplications]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/jobApplication/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j._id !== id));
        toast.success("Application removed");
      } else {
        toast.error(result.message || "Failed to remove");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FadeLoader color="#4A90E2" size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Applications</h1>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-16 text-center">
            <Briefcase className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Applications Yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start applying to jobs that match your skills</p>
            <button
              onClick={() => navigate("/allJobs")}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-semibold"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((app) => {
              const stepIndex = pipelineSteps.findIndex((s) => s.key === (app.status || "pending"));
              const isRejected = app.status === "rejected";
              return (
                <div
                  key={app._id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {app.logo ? (
                          <img src={app.logo} alt={app.company_name} className="w-14 h-14 rounded-xl object-contain" />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-teal-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{app.job_title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{app.company_name}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {app.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {app.location}
                              </span>
                            )}
                            {app.salary && (
                              <span className="flex items-center gap-1">
                                <span className="font-medium text-teal-600">{app.salary}</span>
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(app.appliedAt).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold shrink-0 ${
                        statusConfig[app.status]?.bg || statusConfig.pending.bg
                      } ${
                        statusConfig[app.status]?.text || statusConfig.pending.text
                      }`}>
                        {(() => {
                          const Icon = statusConfig[app.status]?.icon || statusConfig.pending.icon;
                          return <Icon className="w-4 h-4" />;
                        })()}
                        {statusConfig[app.status]?.label || "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Pipeline Progress Bar */}
                  <div className="px-6 pb-6">
                    {isRejected ? (
                      <div className="flex items-center justify-between gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                        <div className="flex items-center gap-3">
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                            Your application was not selected for this position.
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                          title="Remove application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          {pipelineSteps.map((step, i) => {
                            const StepIcon = step.key === "pending" ? Clock : step.key === "reviewing" ? Search : CheckCircle;
                            const isActive = i <= stepIndex;
                            const isCurrent = i === stepIndex;
                            return (
                              <div key={step.key} className="flex flex-col items-center relative z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                  isActive
                                    ? isCurrent
                                      ? "bg-teal-600 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/30 scale-110"
                                      : "bg-teal-600 text-white"
                                    : "bg-gray-200 dark:bg-slate-600 text-gray-400 dark:text-gray-500"
                                }`}>
                                  <StepIcon className="w-4 h-4" />
                                </div>
                                <span className={`text-xs mt-1.5 font-medium ${
                                  isActive ? "text-teal-600 dark:text-teal-400" : "text-gray-400 dark:text-gray-500"
                                }`}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-slate-600 -translate-y-1/2">
                          <div
                            className="h-full bg-teal-500 transition-all duration-500"
                            style={{
                              width: `${stepIndex >= 0 ? (stepIndex / (pipelineSteps.length - 1)) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Interview Details */}
                    {app.status === "accepted" && app.interviewDate && (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-green-800 dark:text-green-300">Interview Scheduled</p>
                            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                              {new Date(app.interviewDate).toLocaleString("en-US", {
                                dateStyle: "full",
                                timeStyle: "short",
                              })}
                            </p>
                            {app.interviewMessage && (
                              <p className="text-sm text-green-600 dark:text-green-500 mt-2 italic">
                                "{app.interviewMessage}"
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppliedJobs;
