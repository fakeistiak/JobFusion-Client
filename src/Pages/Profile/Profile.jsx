import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://job-fusion-server-9yho.vercel.app/profileInfo?userId=${user.uid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile(data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = Object.fromEntries(formData.entries());
    updatedProfile.userId = user.uid;

    fetch("https://job-fusion-server-9yho.vercel.app/profileInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.upsertedId) {
          toast.success("Profile updated successfully");
          setProfile(updatedProfile);
          setIsEditing(false);
        } else {
          toast.warn("No changes detected");
        }
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="lg:py-16 py-8 my-8 ">
      <div className="w-full max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto border p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center pb-3 text-teal-600 dark:text-teal-400">
          {user?.displayName || "User"} Profile
        </h2>
        {loading ? (
          <p className="text-center">Loading profile...</p>
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
            <div className="mb-4 text-center flex justify-end">
              {profile && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-2 rounded lg:text-lg flex gap-2 items-center 
              ${isEditing ? "bg-red-600" : "bg-teal-600"} text-white`}
                >
                  {isEditing ? "Cancel" : "Edit"}{" "}
                  {isEditing ? <FaTimes className="text-2xl" /> : <FaEdit />}
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "name",
                  "phone",
                  "email",
                  "portfolio",
                  "resume",
                  "github",
                  "education",
                  "linkedIn",
                ].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      defaultValue={profile[field] || ""}
                      disabled={!isEditing}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="w-full p-3 bg-teal-600 text-white rounded"
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
