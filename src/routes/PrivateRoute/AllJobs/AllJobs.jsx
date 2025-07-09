import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Job from "@/Pages/Home/FeaturedJobs/Job";
import { useLoaderData } from "react-router-dom";

const AllJobs = () => {
  const jobs = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const parseSalary = (salaryStr) => {
    if (!salaryStr) return 0;
    const match = salaryStr.match(/\d+/g);
    return match ? Number(match[0]) : 0;
  };

  const filteredSortedJobs = useMemo(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter((job) =>
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterOption) {
      filtered = filtered.filter(
        (job) => job.remote_or_onsite.toLowerCase() === filterOption.toLowerCase()
      );
    }

    if (sortOption === "salary-asc") {
      filtered = filtered.slice().sort((a, b) => parseSalary(a.salary) - parseSalary(b.salary));
    } else if (sortOption === "salary-desc") {
      filtered = filtered.slice().sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    }

    return filtered;
  }, [jobs, searchTerm, sortOption, filterOption]);

  return (
    <div className="lg:py-16 py-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <h1 className="lg:text-5xl text-4xl font-extrabold text-center py-10 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
        Find Your Dream Job
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto pb-12">
        <Input
          type="text"
          placeholder="Search job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-teal-500"
        />

        <select
          className="px-4 py-2 rounded-xl shadow-sm border border-gray-300 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by Salary</option>
          <option value="salary-asc">Lowest to Highest</option>
          <option value="salary-desc">Highest to Lowest</option>
        </select>

        <select
          className="px-4 py-2 rounded-xl shadow-sm border border-gray-300 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="">Work Type</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>

        <Button
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 rounded-xl"
          onClick={() => {
            setSearchTerm("");
            setSortOption("");
            setFilterOption("");
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 max-w-7xl px-4 mx-auto">
        {filteredSortedJobs.length ? (
          filteredSortedJobs.map((job) => <Job key={job._id} job={job} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full text-lg">
            No jobs found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
