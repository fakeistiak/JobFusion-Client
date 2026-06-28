import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Link, useLoaderData } from "react-router-dom";
import {
  MapPin, Briefcase, DollarSign, Calendar, Book, Phone, Mail,
  Building2, Clock, GraduationCap, CheckCircle, ArrowRight,
  Share2, Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const JobDetails = () => {
  const {
    _id,
    logo,
    company_name,
    remote_or_onsite,
    job_type,
    job_title,
    location,
    salary,
    job_description,
    job_responsibility,
    educational_requirements,
    experiences,
    contact_information,
  } = useLoaderData();

  const { user } = useContext(AuthContext);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/jobApplication?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAlreadyApplied(data.some((job) => job.job_id === _id));
      })
      .catch(() => setAlreadyApplied(false));
  }, [user, _id]);

  const formatSalary = (s) => {
    if (!s) return "Negotiable";
    return s.replace(/k$/i, "") + "k";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <ToastContainer />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-700 dark:to-teal-900 pb-28">
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl shrink-0">
              {logo && !logoError ? (
                <img
                  src={logo}
                  alt={`${company_name} logo`}
                  className="w-20 h-20 object-contain rounded-xl"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                  {remote_or_onsite}
                </span>
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                  {job_type}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{job_title}</h1>
              <p className="text-teal-100 text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {company_name}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-teal-100">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {formatSalary(salary)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {job_description && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  Job Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {job_description}
                </p>
              </div>
            )}

            {job_responsibility && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  Responsibilities
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {job_responsibility}
                </p>
              </div>
            )}

            {educational_requirements && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-teal-600" />
                  Educational Requirements
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {educational_requirements}
                </p>
              </div>
            )}

            {experiences && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Experience Required
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {experiences}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Job Type</p>
                    <p className="font-medium text-gray-900 dark:text-white">{job_type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">{location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Salary</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatSalary(salary)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Work Type</p>
                    <p className="font-medium text-gray-900 dark:text-white">{remote_or_onsite}</p>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                {user ? (
                  alreadyApplied ? (
                    <Button disabled variant="custom2" className="w-full py-6 text-base">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Already Applied
                    </Button>
                  ) : (
                    <Link to={`/jobApply/${_id}`}>
                      <Button variant="custom2" className="w-full py-6 text-base">
                        Apply Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  )
                ) : (
                  <Link to="/login">
                    <Button variant="custom2" className="w-full py-6 text-base">
                      Login to Apply
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Contact */}
            {contact_information && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
                <div className="space-y-3">
                  {contact_information.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{contact_information.phone}</span>
                    </div>
                  )}
                  {contact_information.email && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{contact_information.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
