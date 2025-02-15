import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const AddJob = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = e.target;
    const logo = formData.logo.value;
    const job_title = formData.job_title.value;
    const company_name = formData.company_name.value;
    const remote_or_onsite = formData.remote_or_onsite.value;
    const location = formData.location.value;
    const job_type = formData.job_type.value;
    const salary = formData.salary.value;
    const job_responsibility = formData.job_responsibility.value;
    const educational_requirements = formData.educational_requirements.value;
    const experiences = formData.experiences.value;
    const phone = formData.phone.value;
    const email = formData.email.value;

    const job = {
      logo,
      job_title,
      company_name,
      remote_or_onsite,
      location,
      job_type,
      salary,
      job_responsibility,
      educational_requirements,
      experiences,
      contact_information: { phone, email},
    };

    console.log(job);

    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Job added successfully");
          formData.reset();
        }
      });
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-700">
        <div className="w-full max-w-6xl mx-auto shadow-md rounded-lg p-6">
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold pb-2">Add a new Job</h2>
            <p className=" text-lg font-poppins">Fill in the details for your job posting</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="">
                <label htmlFor="logo" className="block text-md font-medium ">
                  Company Logo URL
                </label>
                <input
                  id="logo"
                  name="logo"
                  type="url"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="job_title" className="block text-md font-medium ">
                  Job Title
                </label>
                <input
                  id="job_title"
                  name="job_title"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="company_name" className="block text-md font-medium ">
                  Company Name
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="remote_or_onsite" className="block text-md font-medium ">
                  Remote or Onsite
                </label>
                <input
                  id="remote_or_onsite"
                  name="remote_or_onsite"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-md font-medium ">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="job_type" className="block text-md font-medium ">
                  Job Type
                </label>
                <input
                  id="job_type"
                  name="job_type"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-md font-medium ">
                  Salary
                </label>
                <input
                  id="salary"
                  name="salary"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="job_responsibility" className="block text-md font-medium ">
                  Job Responsibility
                </label>
                <input
                  id="job_responsibility"
                  name="job_responsibility"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="educational_requirements" className="block text-md font-medium ">
                  Educational Requirements
                </label>
                <input
                  id="educational_requirements"
                  name="educational_requirements"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="experiences" className="block text-md font-medium ">
                  Experiences
                </label>
                <input
                  id="experiences"
                  name="experiences"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-md font-medium ">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-md font-medium ">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 p-2 dark:bg-white dark:text-black border-black w-full border-2 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="w-full bg-sky-600 text-white p-2 rounded-md hover:bg-sky-700">
                Submit Job
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddJob;
