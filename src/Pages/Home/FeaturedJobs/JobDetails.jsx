import { ToastContainer, toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
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
  const job = useLoaderData();
  const handleApplyJob = () => {
    toast.success("Applied Successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-primary text-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="bg-white text-black p-4 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <img
                src={job.logo}
                alt={`${job.company_name} logo`}
                className="w-24 h-24 object-contain"
              />
              <div className="text-right">
                <span className="inline-block border-2 border-blue-800 bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {job.remote_or_onsite}
                </span>
                <span className="inline-block border-2 border-green-800 bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                  {job.job_type}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 ">{job.job_title}</h1>
            <h2 className="text-xl mb-6">{job.company_name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 pt-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Location: {job.location}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>Salary: {job.salary}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Job Description
            </h3>
            <p className="text-white leading-relaxed">{job.job_description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Job Responsibility
            </h3>
            <p className="text-white leading-relaxed">
              {job.job_responsibility}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Book className="w-5 h-5 mr-2" />
              Educational Requirements
            </h3>
            <p className="text-white leading-relaxed">
              {job.educational_requirements}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Experiences
            </h3>
            <p className="text-white leading-relaxed">{job.experiences}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <div className="p-4 rounded-lg">
              <p className="flex items-center text-white mb-2">
                <Phone className="w-5 h-5 mr-2" />
                {job.contact_information?.phone || "N/A"}
              </p>
              <p className="flex items-center text-white mb-2">
                <Mail className="w-5 h-5 mr-2" />
                {job.contact_information?.email || "N/A"}
              </p>
              <div className="pt-6 flex justify-center">
                <Button onClick={handleApplyJob} variant="custom2">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobDetails;
