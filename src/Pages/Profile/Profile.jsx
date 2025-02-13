import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/profileInfo?userId=${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = Object.fromEntries(formData.entries());
    updatedProfile.userId = user.uid;

    fetch("http://localhost:5000/profileInfo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.upsertedId) {
          toast.success("Profile updated successfully");
          setProfile(updatedProfile);
          setIsEditing(false);
        } else {
          toast.error("No changes detected");
        }
      })
      .catch((err) => toast.error("Update failed"));
  };

  return (
    <div className="w-full max-w-6xl mx-auto border p-6 rounded-lg shadow-md">
      <div className="mb-4 text-center flex justify-end">
        {profile && (
          <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 rounded lg:text-lg flex gap-2 items-center 
            ${isEditing ? "bg-red-600" : "bg-sky-600"} text-white`}
        >
          {isEditing ? "Cancel" : "Edit"} {isEditing ? <FaTimes className="text-2xl"/> : <FaEdit/>}
        </button>
        
        )}
      </div>
      <h2 className="text-3xl font-bold text-center pb-3">{user?.displayName} Profile</h2>
      {user?.photoURL && (
        <div className="mb-4 flex justify-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="lg:w-72 lg:h-72 md:h-60 md:w-60 h-40 w-40 rounded-xl border-2 border-gray-300 object-cover"
          />
        </div>
      )}
      {profile ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["name","phone", "email", "portfolio", "resume", "github", "education","linkedIn"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  defaultValue={profile[field]}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          {isEditing && (
            <button type="submit" className="w-full p-3 bg-sky-600 text-white rounded">
              Save Changes
            </button>
          )}
        </form>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
