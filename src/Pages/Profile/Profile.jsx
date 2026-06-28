import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTimes } from "react-icons/fa";

const candidateFields = [
  { key: "name", label: "Full Name" },
  { key: "number", label: "Phone Number" },
  { key: "portfolio", label: "Portfolio URL" },
  { key: "resume", label: "Resume URL" },
  { key: "github", label: "GitHub URL" },
  { key: "linkedIn", label: "LinkedIn URL" },
  { key: "education", label: "Education" },
];

const recruiterFields = [
  { key: "name", label: "Full Name" },
  { key: "company_name", label: "Company Name" },
  { key: "company_website", label: "Company Website" },
  { key: "industry", label: "Industry" },
  { key: "company_size", label: "Company Size" },
  { key: "number", label: "Phone Number" },
  { key: "linkedIn", label: "LinkedIn URL" },
];

const adminFields = [
  { key: "name", label: "Full Name" },
  { key: "number", label: "Phone Number" },
];

const roleLabels = {
  candidate: "Candidate",
  recruiter: "Recruiter",
  admin: "Admin",
};

const roleColors = {
  candidate: "bg-green-100 text-green-700",
  recruiter: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const role = user?.role || profile?.role || "candidate";
  const fields = role === "recruiter" ? recruiterFields : role === "admin" ? adminFields : candidateFields;

  useEffect(() => {
    if (!user?.email) return;
    fetch(`/users?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data || {});
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = Object.fromEntries(formData.entries());
    updatedProfile.email = user.email;

    fetch("/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.upsertedId) {
          toast.success("Profile updated successfully");
          setProfile((prev) => ({ ...prev, ...updatedProfile }));
          setIsEditing(false);
        } else {
          toast.warn("No changes detected");
        }
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="lg:py-16 py-8 my-8">
      <div className="w-full max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto border p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-3xl font-bold text-center text-teal-600 dark:text-teal-400">
            {user?.displayName || "User"}
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[role] || "bg-gray-100"}`}>
            {roleLabels[role] || role}
          </span>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">{user?.email}</p>

        {loading ? (
          <p className="text-center py-8">Loading profile...</p>
        ) : (
          <>
            <div className="mb-4 flex justify-center">
              <img
                className="lg:w-72 lg:h-72 md:h-60 md:w-60 h-40 w-40 rounded-xl border-2 border-gray-300 object-cover"
                src={
                  imgError || !user?.photoURL
                    ? `https://ui-avatars.com/api/?name=${
                        user?.displayName || "User"
                      }&background=random`
                    : user?.photoURL
                }
                alt={user?.displayName || "User"}
                onError={() => setImgError(true)}
              />
            </div>
            <div className="mb-4 text-center">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded lg:text-lg flex gap-2 items-center mx-auto ${
                  isEditing ? "bg-red-600" : "bg-teal-600"
                } text-white`}
              >
                {isEditing ? "Cancel" : "Edit"}{" "}
                {isEditing ? <FaTimes className="text-2xl" /> : <FaEdit />}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    <input
                      name={field.key}
                      type="text"
                      defaultValue={profile[field.key] || ""}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Save Changes
                </button>
              )}
            </form>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
