import { Button } from "@/components/ui/button";
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";

const Job = ({job}) => {
    const {id,logo,company_name,job_title,remote_or_onsite,job_type,location,salary}=job

    return (
        <div>
            <div className="max-w-sm mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="flex p-4 justify-center w-full">
        <img
          src={logo}
          className="lg:h-20 lg:w-20 w-12 h-12"
        />
      </div>
      <div className="p-6">
        <div className="text-center">
        <h2 className="lg:text-xl text-lg font-semibold dark:text-white">
          {job_title}
        </h2>
        <h3 className="lg:text-md font-medium dark mt-1">
          {company_name}
        </h3>
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          <Button variant="destructive">
            {remote_or_onsite}
          </Button>
          <Button variant="custom">
            {job_type}
          </Button>
        </div>
        <div className="lg:flex gap-4 text-sm text-gray-500 pt-4 justify-center">
            <p className="flex justify-center items-center"><IoLocationSharp />{location}</p> 
            <p className="flex justify-center items-center"><MdAttachMoney/> {salary}</p> 
        </div>
        <div className="mt-6">
          <Link to={`/job/${id}`}>
          <Button variant="default" className="w-full">
            Job Detail
          </Button>
          </Link>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Job;