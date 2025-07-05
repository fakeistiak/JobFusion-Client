import { toast, ToastContainer } from "react-toastify";

const InputField = ({ label, name, type = "text", placeholder }) => (
  <div className="space-y-2">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
    />
  </div>
);

const TextAreaField = ({ label, name, placeholder }) => (
  <div className="space-y-2">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={4}
      required
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 resize-none"
    />
  </div>
);

const SectionTitle = ({ title, description, color }) => (
  <div className={`border-l-4 border-${color}-500 pl-4`}>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

const AddJob = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const role = localStorage.getItem("role");
    if (role !== "admin") {
      toast.error("Only admins can post jobs!");
      return;
    }

    const form = e.target;
    const job = {
      logo: form.logo.value,
      job_title: form.job_title.value,
      company_name: form.company_name.value,
      remote_or_onsite: form.remote_or_onsite.value,
      location: form.location.value,
      job_type: form.job_type.value,
      salary: form.salary.value,
      job_responsibility: form.job_responsibility.value,
      educational_requirements: form.educational_requirements.value,
      experiences: form.experiences.value,
      contact_information: {
        phone: form.phone.value,
        email: form.email.value,
      },
      userEmail: localStorage.getItem("email"),
    };

    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Job added successfully");
          form.reset();
        } else if (data.message) {
          toast.error(data.message);
        }
      })
      .catch(() => toast.error("Failed to post job"));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-3">
                Hey Admin, Let's Post a New Job
              </h2>
              <p className="text-teal-100 text-lg font-medium">
                Create your job listing and find the perfect candidate
              </p>
            </div>
            <div className="px-8 py-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                <SectionTitle
                  title="Company Information"
                  description="Tell us about your company"
                  color="teal"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InputField
                    label="Company Logo URL"
                    name="logo"
                    type="url"
                    placeholder="https://example.com/logo.png"
                  />
                  <InputField
                    label="Company Name"
                    name="company_name"
                    placeholder="Enter company name"
                  />
                </div>

                <SectionTitle
                  title="Job Details"
                  description="Provide specific information about the position"
                  color="blue"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InputField
                    label="Job Title"
                    name="job_title"
                    placeholder="e.g., Senior Software Engineer"
                  />
                  <InputField
                    label="Job Type"
                    name="job_type"
                    placeholder="e.g., Full-time"
                  />
                  <InputField
                    label="Work Arrangement"
                    name="remote_or_onsite"
                    placeholder="e.g., Remote"
                  />
                  <InputField
                    label="Location"
                    name="location"
                    placeholder="e.g., Dhaka or Remote"
                  />
                  <div className="lg:col-span-2">
                    <InputField
                      label="Salary Range"
                      name="salary"
                      placeholder="e.g., ৳60k - ৳100k/month"
                    />
                  </div>
                </div>

                <SectionTitle
                  title="Job Requirements"
                  description="Define the role responsibilities and requirements"
                  color="purple"
                />
                <div className="grid grid-cols-1 gap-6">
                  <TextAreaField
                    label="Job Responsibilities"
                    name="job_responsibility"
                    placeholder="Describe responsibilities..."
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField
                      label="Educational Requirements"
                      name="educational_requirements"
                      placeholder="e.g., BSc in CSE"
                    />
                    <InputField
                      label="Experience Required"
                      name="experiences"
                      placeholder="e.g., 2+ years experience"
                    />
                  </div>
                </div>

                <SectionTitle
                  title="Contact Information"
                  description="How candidates can reach you"
                  color="green"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    placeholder="e.g., +8801XXXXXXXXX"
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="hr@example.com"
                  />
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
                  >
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Post Job Listing
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddJob;
