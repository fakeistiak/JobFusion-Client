import { useParams } from "react-router-dom";

const JobApply = () => {
    const {id,}=useParams();
    console.log(id)


    const handleJobApply=e=>{
       e.preventDefault();
       const form=e.target;
       const portfolio=form.portfolio.value;
       const resume=form.resume.value;
       const github=form.github.value;
       const linkedIn=form.linkedIn.value;
       console.log(portfolio,resume,linkedIn,github)
    }


    return (
        <div className="max-w-7xl px-6 mx-auto py-20">
            <h1 className="text-4xl text-center font-poppins font-semibold text-teal-500">Fill up the form to apply</h1>
            <form onSubmit={handleJobApply} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number
          </label>
          <input
            name="number"
            type="number"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700"
          />
        </div> */}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Portfolio
          </label>
          <input
            name="portfolio"
            type="url"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Resume
          </label>
          <input
            name="resume"
            type="url"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            GitHub
          </label>
          <input
            name="github"
            type="url"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700"
          />
        </div>

        {/* <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Education
          </label>
          <select
            name="education"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700"
          >
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
          </select>
        </div> */}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            LinkedIn
          </label>
          <input
            name="linkedIn"
            type="url"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700"
          />
        </div>

        {/* <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            readOnly
            className="w-full p-3 border bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
          />
        </div> */}
      </div>
        <button
          type="submit"
          className="w-full p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
        >
          Save Changes
        </button>
    </form>
        </div>
    );
};

export default JobApply;