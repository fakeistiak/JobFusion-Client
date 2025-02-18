import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachMoney, MdWork, MdOutlineBusiness } from "react-icons/md";

const Job = ({ job }) => {
  const {
    _id,
    remote_or_onsite,
    logo,
    job_type,
    company_name,
    job_title,
    location,
    salary,
  } = job;

  return (
    <Link
      to={`/job/${_id}`}
      className="block transform transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl">
        <div className="p-4 flex justify-center items-center bg-gray-100">
          <img
            className="object-contain w-32 h-32"
            src={logo}
            alt={company_name}
          />
        </div>
        <div className="px-5 py-2 bg-gray-600 text-white flex items-center justify-center text-sm font-medium">
          <MdWork className="w-5 h-5 mr-2" />
          {remote_or_onsite}
        </div>
        <div className="p-5">
          <h1 className="text-xl font-semibold text-gray-800">{job_title}</h1>
          <div className="flex items-center mt-2 text-gray-600 text-sm">
            <MdOutlineBusiness className="w-5 h-5 mr-2" />
            {company_name}
          </div>
          <div className="flex items-center mt-3 text-gray-700 text-sm">
            <MdWork className="w-5 h-5 text-gray-500 mr-2" />
            <span className="font-medium">{job_type}</span>
          </div>
          <div className="flex items-center mt-2 text-gray-700 text-sm">
            <IoLocationSharp className="w-5 h-5 text-gray-500 mr-2" />
            {location}
          </div>
          <div className="flex items-center mt-2 text-gray-700 text-sm">
            <MdAttachMoney className="w-5 h-5 text-gray-500 mr-2" />
            {salary}
          </div>
          <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg font-medium transition hover:bg-teal-700">
            Job Detail
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Job;
