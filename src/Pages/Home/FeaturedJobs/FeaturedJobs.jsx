import { useEffect, useState } from "react";
import Job from "./Job";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const [dataLength] = useState(6);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);


  return (
    <div>
      <div className="pb-20 lg:py-20 py-4 px-8">
        <div className="text-center py-8">
          <h2 className="lg:text-5xl font-poppins text-4xl pb-2 font-semibold text-sky-600">
            Featured Jobs
          </h2>
          <p className="text-gray-600 dark:text-white font-poppins">
            Explore Top Career Opportunities and Featured Job Openings.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-w-6xl mx-auto gap-12">
          {jobs.slice(0, dataLength).map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
        {!jobs.length || dataLength >= jobs.length ? null : (
          <div className="flex justify-center pt-12">
            <Link to="/alljobs">
            <Button variant="default">
              Show All Jobs
            </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
