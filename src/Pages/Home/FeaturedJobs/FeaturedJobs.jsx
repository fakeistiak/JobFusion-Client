import { useEffect, useState } from "react";
import Job from "./Job";
import { Button } from "@/components/ui/button";

const FeaturedJobs = () => {
  const [dataLength, setDataLength] = useState(4);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);
  return (
    <div>
      <div className="pb-20 px-8">
        <div className="text-center py-8">
          <h2 className="lg:text-5xl text-4xl pb-2 font-semibold text-sky-600">
            Featured Jobs
          </h2>
          <p className="text-gray-600">
            Explore Top Career Opportunities and Featured Job Openings.
          </p>
        </div>
        <div className="grid grid-cols-2 max-w-6xl mx-auto gap-12">
          {jobs.slice(0,dataLength).map(job => (
            <Job key={job.id} job={job}></Job>
          ))}
        </div>
        <div className={dataLength===jobs.length && 'hidden'}>
           <div className="flex justify-center pt-12">
           <Button onClick={()=>setDataLength(jobs.length)} variant="default">Show All</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
