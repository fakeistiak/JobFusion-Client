import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Building2,
  User,
  Mail,
  Phone,
  BookOpen,
  Globe,
  Github,
  Linkedin,
  FileText,
  Send,
  Loader2,
} from "lucide-react";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`/jobs/${id}`).then((r) => r.json()),
      user?.email
        ? fetch(`/users?email=${user.email}`).then((r) => r.json())
        : Promise.resolve(null),
      user?.email
        ? fetch(`/jobApplication?email=${user.email}`).then((r) => r.json())
        : Promise.resolve([]),
    ])
      .then(([jobData, profileData, applications]) => {
        setJob(jobData);
        setProfile(profileData);
        if (applications.some((a) => a.job_id === id)) {
          setAlreadyApplied(true);
        }
      })
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  }, [id, user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    linkedIn: "",
    github: "",
    resume: "",
    portfolio: "",
    coverLetter: "",
    salaryExpectation: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || user?.displayName || "",
        email: profile.email || user?.email || "",
        phone: profile.number || "",
        education: profile.education || "",
        linkedIn: profile.linkedIn || "",
        github: profile.github || "",
        resume: profile.resume || "",
        portfolio: profile.portfolio || "",
        coverLetter: "",
        salaryExpectation: "",
      });
    }
  }, [profile, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateUrl = (value, label) => {
    if (!value) return `${label} is required`;
    try {
      const url = new URL(value);
      if (!["http:", "https:"].includes(url.protocol)) {
        return `${label} must start with http:// or https://`;
      }
      return null;
    } catch {
      return `${label} is not a valid URL`;
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.education.trim()) newErrors.education = "Education is required";

    const linkedInErr = validateUrl(formData.linkedIn.trim(), "LinkedIn URL");
    if (linkedInErr) newErrors.linkedIn = linkedInErr;

    const githubErr = validateUrl(formData.github.trim(), "GitHub URL");
    if (githubErr) newErrors.github = githubErr;

    const resumeErr = validateUrl(formData.resume.trim(), "Resume URL");
    if (resumeErr) newErrors.resume = resumeErr;

    if (formData.portfolio.trim()) {
      const portfolioErr = validateUrl(formData.portfolio.trim(), "Portfolio URL");
      if (portfolioErr) newErrors.portfolio = portfolioErr;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const normalizeUrl = (url) => {
      if (!url) return "";
      if (url.startsWith("http")) return url;
      return url.startsWith("/") ? url : `/${url}`;
    };

    const application = {
      job_id: id,
      applicant_email: user.email,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      education: formData.education.trim(),
      linkedIn: formData.linkedIn.trim(),
      github: formData.github.trim(),
      resume: formData.resume.trim(),
      photoURL: normalizeUrl(user.photoURL),
      salaryExpectation: formData.salaryExpectation.trim(),
      ...(formData.portfolio.trim() && { portfolio: formData.portfolio.trim() }),
      ...(formData.coverLetter.trim() && { coverLetter: formData.coverLetter.trim() }),
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/jobApplication", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(application),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success("Application submitted successfully!");
        setTimeout(() => navigate("/appliedJobs"), 800);
      } else {
        toast.error("Failed to submit application");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (alreadyApplied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 text-center max-w-lg mx-4">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Already Applied</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">You have already submitted an application for this position.</p>
          <button
            onClick={() => navigate("/appliedJobs")}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold"
          >
            View My Applications
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <p className="text-gray-500 text-lg">Job not found</p>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${
      errors[field] ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"
    }`;

  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
  const errorClass = "text-sm text-red-500 mt-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Job Summary Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-teal-500">
          <div className="flex items-start gap-4">
            {job.logo && (
              <img src={job.logo} alt={job.company_name} className="w-16 h-16 object-contain rounded-lg" />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{job.job_title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-1">
                <Building2 className="w-4 h-4" />
                {job.company_name}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {job.job_type}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Submit Your Application</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Fields marked with <span className="text-red-500">*</span> are required. Your profile data has been pre-filled.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                <User className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    Education <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g., BSc in Computer Science"
                    className={inputClass("education")}
                  />
                  {errors.education && <p className={errorClass}>{errors.education}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <span className="text-lg">৳</span>
                      Salary Expectation <span className="text-gray-400">(optional)</span>
                    </span>
                  </label>
                  <input
                    name="salaryExpectation"
                    value={formData.salaryExpectation}
                    onChange={handleChange}
                    placeholder="e.g., 60k - 80k/month"
                    className={inputClass("salaryExpectation")}
                  />
                </div>
              </div>
            </div>

            {/* Professional Links */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                <Globe className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Professional Links</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn URL <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={inputClass("linkedIn")}
                  />
                  {errors.linkedIn && <p className={errorClass}>{errors.linkedIn}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <Github className="w-4 h-4" />
                      GitHub URL <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                    className={inputClass("github")}
                  />
                  {errors.github && <p className={errorClass}>{errors.github}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Resume URL <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/your-resume"
                    className={inputClass("resume")}
                  />
                  {errors.resume && <p className={errorClass}>{errors.resume}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      Portfolio URL <span className="text-gray-400">(optional)</span>
                    </span>
                  </label>
                  <input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://your-portfolio.com"
                    className={inputClass("portfolio")}
                  />
                  {errors.portfolio && <p className={errorClass}>{errors.portfolio}</p>}
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Cover Letter <span className="text-gray-400 font-normal text-sm">(optional)</span>
                </h3>
              </div>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={5}
                placeholder="Tell the employer why you're a great fit for this role..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 text-lg bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobApply;
