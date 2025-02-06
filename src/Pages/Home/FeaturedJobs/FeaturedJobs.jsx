import { useEffect, useState } from "react";
import Job from "./Job";
import { Button } from "@/components/ui/button";

const FeaturedJobs = () => {
  const [dataLength, setDataLength] = useState(6);
  const [jobs, setJobs] = useState([]);
  const [isAllJobsVisible, setIsAllJobsVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleToggleJobs = () => {
    if (isAllJobsVisible) {
      setDataLength(6);
    } else {
      setDataLength(jobs.length);
    }
    setIsAllJobsVisible(!isAllJobsVisible);
  };

  return (
    <div>
      <div className="pb-20 px-8">
        <div className="text-center py-8">
          <h2 className="lg:text-5xl font-poppins text-4xl pb-2 font-semibold text-sky-600">
            Featured Jobs
          </h2>
          <p className="text-gray-600 font-poppins">
            Explore Top Career Opportunities and Featured Job Openings.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-w-6xl mx-auto gap-12">
          {jobs.slice(0, dataLength).map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
        <div className="flex justify-center pt-12">
          <Button onClick={handleToggleJobs} variant="default">
            {isAllJobsVisible ? "Hide All" : "Show All"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
