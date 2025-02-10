import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = e.target;
    const phone = formData.phone.value;
    const email = formData.email.value;
    const portfolio = formData.portfolio.value;
    const resume = formData.resume.value;
    const github = formData.github.value;
    const education = formData.education.value;
    const profileInfo = {
      phone,
      email,
      portfolio,
      resume,
      github,
      education,
    };

    console.log(profileInfo);

    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(profileInfo),
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
    <div className="w-full  max-w-6xl mx-auto border p-6 rounded-lg shadow-md">
      <div className="mb-4 text-center ">
        <h2 className="text-3xl font-bold font-poppins">
          {user?.displayName} Profile Information
        </h2>
        <p className="text-lg font-poppins">
          Fill in your details to apply for a job
        </p>
      </div>
      <div className="mb-4 flex justify-center">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="lg:w-80 lg:h-72 md:w-48 md:h-48 w-40 h-40  rounded-xl object-cover border-2 border-gray-300"
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              disabled={!!user?.name}
              value={user?.displayName || ""}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Phone" className="block font-medium">
              Phone
            </label>
            <input
              name="phone"
              type="number"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block font-medium">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="portfolio" className="block font-medium">
              Portfolio Link
            </label>
            <input
              name="portfolio"
              type="url"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="resume" className="block font-medium">
              Resume Link
            </label>
            <input
              name="resume"
              type="url"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="github" className="block font-medium">
              GitHub Link
            </label>
            <input
              name="github"
              type="url"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Education" className="block font-medium">
              Education
            </label>
            <input
              name="education"
              type="text"
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-sky-600 text-white rounded"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
