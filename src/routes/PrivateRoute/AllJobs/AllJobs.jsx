import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Job from "@/Pages/Home/FeaturedJobs/Job";
import { useLoaderData } from "react-router-dom";
import { Search, SlidersHorizontal, X, MapPin, Briefcase, DollarSign } from "lucide-react";

const jobTypes = ["", "full-time", "part-time", "contract", "internship"];
const workTypes = ["", "remote", "onsite", "hybrid"];

const AllJobs = () => {
  const jobs = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterWorkType, setFilterWorkType] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const parseSalary = (salaryStr) => {
    if (!salaryStr) return 0;
    const match = salaryStr.match(/\d+/g);
    return match ? Number(match[0]) : 0;
  };

  const filteredSortedJobs = useMemo(() => {
    let filtered = jobs || [];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.job_title?.toLowerCase().includes(term) ||
          job.company_name?.toLowerCase().includes(term) ||
          job.location?.toLowerCase().includes(term)
      );
    }

    if (filterWorkType) {
      filtered = filtered.filter(
        (job) => job.remote_or_onsite?.toLowerCase() === filterWorkType
      );
    }

    if (filterJobType) {
      filtered = filtered.filter(
        (job) => job.job_type?.toLowerCase() === filterJobType
      );
    }

    if (sortOption === "salary-asc") {
      filtered = filtered.slice().sort((a, b) => parseSalary(a.salary) - parseSalary(b.salary));
    } else if (sortOption === "salary-desc") {
      filtered = filtered.slice().sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    }

    return filtered;
  }, [jobs, searchTerm, sortOption, filterWorkType, filterJobType]);

  const hasActiveFilters = searchTerm || filterWorkType || filterJobType || sortOption;
  const activeCount = [searchTerm, filterWorkType, filterJobType, sortOption].filter(Boolean).length;

  const clearFilters = () => {
    setSearchTerm("");
    setFilterWorkType("");
    setFilterJobType("");
    setSortOption("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 dark:from-teal-800 dark:via-emerald-800 dark:to-cyan-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Find Your Dream Job
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-teal-100 max-w-2xl mx-auto">
              Browse through thousands of opportunities and take the next step in your career
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by job title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-0 shadow-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-teal-600 rounded-full">
                    {activeCount}
                  </span>
                )}
              </button>
              <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredSortedJobs.length}</span>
                {" "}of{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">{jobs?.length || 0}</span>
                {" "}jobs found
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Sort: Default</option>
                <option value="salary-asc">Salary: Low to High</option>
                <option value="salary-desc">Salary: High to Low</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition shrink-0"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Work Type</label>
                  <select
                    value={filterWorkType}
                    onChange={(e) => setFilterWorkType(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    {workTypes.map((t) => (
                      <option key={t} value={t}>{t || "All Work Types"}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Job Type</label>
                  <select
                    value={filterJobType}
                    onChange={(e) => setFilterJobType(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    {jobTypes.map((t) => (
                      <option key={t} value={t}>{t || "All Job Types"}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">
                  <Search className="w-3 h-3" />
                  {searchTerm}
                  <button onClick={() => setSearchTerm("")} className="ml-0.5 hover:text-teal-900 dark:hover:text-teal-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterWorkType && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  <MapPin className="w-3 h-3" />
                  {filterWorkType}
                  <button onClick={() => setFilterWorkType("")} className="ml-0.5 hover:text-blue-900 dark:hover:text-blue-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterJobType && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                  <Briefcase className="w-3 h-3" />
                  {filterJobType}
                  <button onClick={() => setFilterJobType("")} className="ml-0.5 hover:text-purple-900 dark:hover:text-purple-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {sortOption && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                  <DollarSign className="w-3 h-3" />
                  {sortOption === "salary-asc" ? "Low to High" : "High to Low"}
                  <button onClick={() => setSortOption("")} className="ml-0.5 hover:text-amber-900 dark:hover:text-amber-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {filteredSortedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredSortedJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              No jobs found
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button
              onClick={clearFilters}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6 py-2.5"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
