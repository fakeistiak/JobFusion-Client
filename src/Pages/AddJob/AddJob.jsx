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
    const job_description = formData.job_description.value;
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
      job_description,
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
      <div className="py-20 bg-gray-100">
        <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold">Job Posting</h2>
            <p className="text-gray-600">Fill in the details for your job posting</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                  Company Logo URL
                </label>
                <input
                  id="logo"
                  name="logo"
                  type="url"
                  required
                  placeholder="Enter logo URL"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  id="job_title"
                  name="job_title"
                  required
                  placeholder="Enter job title"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  required
                  placeholder="Enter company name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="remote_or_onsite" className="block text-sm font-medium text-gray-700">
                  Remote or Onsite
                </label>
                <input
                  id="remote_or_onsite"
                  name="remote_or_onsite"
                  required
                  placeholder="Enter remote or onsite"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  required
                  placeholder="Enter job location"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="job_type" className="block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <input
                  id="job_type"
                  name="job_type"
                  required
                  placeholder="Enter job type"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  id="salary"
                  name="salary"
                  required
                  placeholder="Enter salary"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="job_description" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  id="job_description"
                  name="job_description"
                  required
                  placeholder="Enter job description"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="job_responsibility" className="block text-sm font-medium text-gray-700">
                  Job Responsibility
                </label>
                <textarea
                  id="job_responsibility"
                  name="job_responsibility"
                  required
                  placeholder="Enter job responsibilities"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="educational_requirements" className="block text-sm font-medium text-gray-700">
                  Educational Requirements
                </label>
                <input
                  id="educational_requirements"
                  name="educational_requirements"
                  required
                  placeholder="Enter educational requirements"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="experiences" className="block text-sm font-medium text-gray-700">
                  Experiences
                </label>
                <input
                  id="experiences"
                  name="experiences"
                  required
                  placeholder="Enter experiences"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder="Enter phone number"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email"
                  className="mt-1 p-2 w-full border rounded-md"
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
