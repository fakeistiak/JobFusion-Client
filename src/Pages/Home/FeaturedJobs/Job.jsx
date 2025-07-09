import { Link } from "react-router-dom"
import { IoLocationSharp } from "react-icons/io5"
import { MdAttachMoney, MdWork, MdOutlineBusiness } from "react-icons/md"

const Job = ({ job }) => {
  const { _id, remote_or_onsite, logo, job_type, company_name, job_title, location, salary } = job

  return (
    <Link
      to={`/job/${_id}`}
      className="block group transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2"
    >
      <div className="relative w-full max-w-sm bg-white dark:bg-black rounded-3xl shadow-xl overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/10">
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="relative p-8 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
            <div className="relative w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
              <img
                className="object-contain w-full h-full"
                src={logo || "/placeholder.svg"}
                alt={company_name}
                onError={(e) => {
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "flex"
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl items-center justify-center text-white font-bold text-lg">
                {company_name?.charAt(0) || "C"}
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <div
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                remote_or_onsite?.toLowerCase() === "remote"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
              }`}
            >
              <div className="flex items-center">
                <MdWork className="w-3 h-3 mr-1" />
                {remote_or_onsite}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight duration-300">
                {job_title}
              </h1>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                <MdOutlineBusiness className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-medium">{company_name}</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center mr-3">
                  <MdWork className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium">{job_type}</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg flex items-center justify-center mr-3">
                  <IoLocationSharp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-sm">{location}</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center mr-3">
                  <MdAttachMoney className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  ${salary}k
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg font-medium transition hover:bg-teal-700">
                Job Detail
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/10 to-green-500/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
      </div>
    </Link>
  )
}

export default Job
