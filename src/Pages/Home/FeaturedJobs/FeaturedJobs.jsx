import { useEffect, useState } from "react";
import Job from "./Job";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("jobs.json")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);
  return (
    <div>
      <div className="pb-20">
        <div className="text-center py-8">
        <h2 className="lg:text-5xl text-4xl pb-2 font-semibold text-primary">
          Featured Jobs
        </h2>
        <p className="text-gray-600">
          Explore Top Career Opportunities and Featured Job Openings.
        </p>
        </div>
        <div className="grid grid-cols-2 max-w-5xl mx-auto gap-6">
            {
                jobs.map(job=><Job key={job.id} job={job}></Job>)
            }
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
