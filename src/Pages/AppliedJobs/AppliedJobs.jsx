import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { FadeLoader } from "react-spinners";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/jobApplication?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors gracefully
  }, [user.email]);

  return (
    <div className="max-w-7xl mx-auto lg:py-20 py-8 px-6">
      {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <FadeLoader color="#4A90E2" size={60} />
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3">
            <h2 className="text-3xl font-medium text-teal-500 dark:text-teal-400">
              Applied Jobs
            </h2>
          </div>
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="py-3.5 px-4 text-lg font-semibold text-left text-black dark:text-gray-400">
                          Company Logo
                        </th>
                        <th className="py-3.5 px-4 text-lg font-semibold text-left text-black dark:text-gray-400">
                          Job Title
                        </th>
                        <th className="px-12 py-3.5 text-lg font-semibold text-left text-black dark:text-gray-400">
                          Salary
                        </th>
                        <th className="px-4 py-3.5 text-lg font-semibold text-left text-black dark:text-gray-400">
                          Job Type
                        </th>
                        <th className="px-4 py-3.5 text-lg font-semibold text-left text-black dark:text-gray-400">
                          Remote or Onsite
                        </th>
                        <th className="px-4 py-3.5 text-lg font-semibold text-left text-black dark:text-gray-400">
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {jobs.map((job) => (
                        <tr key={job._id} className="bg-gray-100">
                          <td className="px-4 py-4">
                            <img src={job.logo} className="w-12 h-12 rounded-full" />
                          </td>
                          <td className="px-4 py-4">
                            <h2 className="font-medium text-gray-800 dark:text-white">
                              {job.job_title}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {job.company_name}
                            </p>
                          </td>
                          <td className="px-12 py-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                              <h2 className="text-sm font-normal text-emerald-500">
                                {job.salary}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {job.job_type}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {job.remote_or_onsite}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {job.location}
                          </td>
                          <td>
                            <button title="Update The Apply" className="px-4 py-4">
                              <CiEdit className="text-3xl font-extrabold text-teal-500" />
                            </button>
                          </td>
                          <td>
                            <button title="Cancel The Apply" className="px-4 py-4">
                              <RxCross2 className="text-3xl font-extrabold text-red-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AppliedJobs;
