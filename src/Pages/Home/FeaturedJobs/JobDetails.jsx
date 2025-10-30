import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLoaderData } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Book,
  Phone,
  Mail,
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

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://job-fusion-server-9yho.vercel.app/jobApplication?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Adjust "job_id" to your actual applied job field if needed
        const isApplied = data.some((job) => job.job_id === _id);
        setAlreadyApplied(isApplied);
      })
      .catch(() => {
        setAlreadyApplied(false);
      });
  }, [user, _id]);

  const handleApplyJob = () => {
    toast.success("Applied Successfully");
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen lg:py-20">
        <div className="max-w-7xl mx-auto bg-primary text-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="bg-white text-black dark:bg-gray-700 dark:text-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <img
                  src={logo}
                  alt={`${company_name} logo`}
                  className="w-24 h-24 object-contain"
                />
                <div className="text-right">
                  <span className="inline-block border-2 border-blue-800 bg-blue-100 text-blue-800 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-300 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {remote_or_onsite}
                  </span>
                  <span className="inline-block border-2 border-green-800 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900 dark:text-green-300 text-sm font-semibold px-2.5 py-0.5 rounded">
                    {job_type}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{job_title}</h1>
              <h2 className="text-xl mb-6">{company_name}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 pt-4">
              <div className="flex items-center text-white dark:text-white">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Location: {location}</span>
              </div>
              <div className="flex items-center text-white dark:text-white">
                <DollarSign className="w-5 h-5 mr-2" />
                <span>Salary: {salary}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center text-white dark:text-white">
                <Briefcase className="w-5 h-5 mr-2" />
                Job Description
              </h3>
              <p className="text-white dark:text-gray-300 leading-relaxed">
                {job_description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center text-white dark:text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Job Responsibility
              </h3>
              <p className="text-white dark:text-gray-300 leading-relaxed">
                {job_responsibility}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center text-white dark:text-white">
                <Book className="w-5 h-5 mr-2" />
                Educational Requirements
              </h3>
              <p className="text-white dark:text-gray-300 leading-relaxed">
                {educational_requirements}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center text-white dark:text-white">
                <Briefcase className="w-5 h-5 mr-2" />
                Experiences
              </h3>
              <p className="text-white dark:text-gray-300 leading-relaxed">
                {experiences}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white dark:text-white">
                Contact Information
              </h3>
              <div className="p-4 rounded-lg">
                <p className="flex items-center text-white dark:text-gray-300 mb-2">
                  <Phone className="w-5 h-5 mr-2" />
                  {contact_information?.phone || "N/A"}
                </p>
                <p className="flex items-center text-white dark:text-gray-300 mb-2">
                  <Mail className="w-5 h-5 mr-2" />
                  {contact_information?.email || "N/A"}
                </p>
                <div className="pt-6 flex w-full justify-center">
                  {alreadyApplied ? (
                    <Button disabled variant="custom2">
                      Already Applied
                    </Button>
                  ) : (
                    <Link to={`/jobApply/${_id}`}>
                      <Button onClick={handleApplyJob} variant="custom2">
                        Apply Now
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default JobDetails;
