import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "@/utility/localstorage";
import { MapPin, DollarSign } from 'lucide-react';

const AppliedJobs = () => {
  const jobs = useLoaderData();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedJobsId = getStoredJobApplication();
    if (jobs.length > 0) {
      const jobsApplied = jobs.filter(job => storedJobsId.includes(job.id));
      setAppliedJobs(jobsApplied);
    }
  }, [jobs]);

  const filteredJobs = filter === 'all' ? appliedJobs : appliedJobs.filter(job => job.remote_or_onsite.toLowerCase() === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="lg:text-5xl text-4xl mb-4 font-bold text-center text-black ">Total Applied jobs: {appliedJobs.length}</h2>
      
      <div className="mb-6 flex justify-end">
        <select 
          className="bg-sky-600 border-sky-600 font-semibold text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-gray-300 rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 p-6 flex items-center justify-center">
              <img src={job.logo} alt={job.company_name} className="lg:w-[150px] lg:h-[200px] w-32 h-32 object-contain" />
            </div>
            <div className="w-full md:w-3/4 p-6">
              <h3 className="text-xl font-semibold mb-2">{job.job_title}</h3>
              <p className="text-gray-600 mb-4">{job.company_name}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {job.remote_or_onsite}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {job.job_type}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  <span>{job.salary}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;

