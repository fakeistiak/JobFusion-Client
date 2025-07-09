import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import ProfileSetting from "./ProfileSetting";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase.init";

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const fetchProfile = () => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:5000/users?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setProfile(data);
        else setProfile({});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
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

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      const data = await res.json();

      if (data.modifiedCount > 0 || data.upsertedId) {
        toast.success("Profile updated");

        // 🔄 Update Firebase display name and photo
        await updateProfile(auth.currentUser, {
          displayName: updatedProfile.name,
          photoURL: updatedProfile.photoURL,
        });

        // 🟢 Update user context
        setUser({ ...auth.currentUser });

        // 🔁 Refetch updated profile from backend
        fetchProfile();

        setIsEditing(false);
      } else {
        toast.warn("No changes detected");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="relative bg-teal-600 dark:bg-teal-700 h-32">
          <div className="absolute -bottom-16 left-6">
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
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {profile?.name || user?.displayName || "User"} Profile
          </h2>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <FadeLoader color="#4A90E2" size={60} />
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-2 rounded-lg flex gap-2 items-center transition-colors duration-200 ${
                    isEditing
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-teal-600 hover:bg-teal-700"
                  } text-white`}
                >
                  {isEditing ? "Cancel" : "Edit"}{" "}
                  {isEditing ? (
                    <FaTimes className="text-xl" />
                  ) : (
                    <FaEdit className="text-xl" />
                  )}
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "name",
                    "number",
                    "portfolio",
                    "resume",
                    "github",
                    "education",
                    "linkedIn",
                  ].map((field) => (
                    <div key={field} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        name={field}
                        type="text"
                        defaultValue={profile?.[field] || ""}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
                      defaultValue={user.email}
                      readOnly
                      className="w-full p-3 border border-teal-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    className="w-full p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                )}
              </form>
              <ProfileSetting />
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
