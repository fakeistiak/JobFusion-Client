import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase.init";

const candidateFields = [
  { key: "name", label: "Full Name", type: "text" },
  { key: "number", label: "Phone Number", type: "tel" },
  { key: "portfolio", label: "Portfolio URL", type: "url" },
  { key: "resume", label: "Resume URL", type: "url" },
  { key: "github", label: "GitHub URL", type: "url" },
  { key: "linkedIn", label: "LinkedIn URL", type: "url" },
  { key: "education", label: "Education", type: "text" },
];

const recruiterFields = [
  { key: "name", label: "Full Name", type: "text" },
  { key: "company_name", label: "Company Name", type: "text" },
  { key: "company_website", label: "Company Website", type: "url" },
  { key: "industry", label: "Industry", type: "text" },
  { key: "company_size", label: "Company Size", type: "text" },
  { key: "number", label: "Phone Number", type: "tel" },
  { key: "linkedIn", label: "LinkedIn URL", type: "url" },
];

const adminFields = [
  { key: "name", label: "Full Name", type: "text" },
  { key: "number", label: "Phone Number", type: "tel" },
];

const roleLabels = {
  candidate: "Candidate",
  recruiter: "Recruiter",
  admin: "Admin",
};

const roleColors = {
  candidate: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  recruiter: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const UserProfile = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [saving, setSaving] = useState(false);

  const role = user?.role || profile?.role || "candidate";
  const fields = role === "recruiter" ? recruiterFields : role === "admin" ? adminFields : candidateFields;

  const fetchProfile = () => {
    if (!user?.email) return;
    setLoading(true);
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
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = Object.fromEntries(formData.entries());
    updatedProfile.email = user.email;

    setSaving(true);
    try {
      const res = await fetch("/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      const data = await res.json();

      if (data.modifiedCount > 0 || data.upsertedId) {
        toast.success("Profile updated");

        await updateProfile(auth.currentUser, {
          displayName: updatedProfile.name,
          photoURL: updatedProfile.photoURL,
        }).catch(() => {});

        refreshUser();
        fetchProfile();
        setIsEditing(false);
      } else {
        toast.warn("No changes detected");
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="relative bg-teal-600 dark:bg-teal-700 h-32">
          <div className="absolute -bottom-16 left-6 flex items-end gap-4">
            <img
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
              src={
                imgError || !(user?.photoURL || profile?.photoURL)
                  ? `https://ui-avatars.com/api/?name=${
                      profile?.name || user?.displayName || "User"
                    }&background=random`
                  : user?.photoURL || profile?.photoURL
              }
              alt={profile?.name || user?.displayName || "User"}
              onError={() => setImgError(true)}
            />
          </div>
        </div>
        <div className="px-6 pt-20 pb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {profile?.name || user?.displayName || "User"}
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[role] || "bg-gray-100 text-gray-700"}`}>
                {roleLabels[role] || role}
              </span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-2 rounded-lg flex gap-2 items-center transition-colors duration-200 ${
                isEditing ? "bg-red-600 hover:bg-red-700" : "bg-teal-600 hover:bg-teal-700"
              } text-white`}
            >
              {isEditing ? "Cancel" : "Edit"}{" "}
              {isEditing ? <FaTimes className="text-xl" /> : <FaEdit className="text-xl" />}
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{profile?.email || user?.email}</p>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <FadeLoader color="#4A90E2" size={60} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    <input
                      name={field.key}
                      type={field.type}
                      defaultValue={profile?.[field.key] || ""}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full p-3 border border-teal-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full p-3 rounded-lg transition-colors duration-200 text-white font-semibold ${
                    saving ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
