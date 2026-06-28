import { useContext } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProfileReminderModal = () => {
  const { user, showProfileModal, closeProfileModal } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!showProfileModal || !user) return null;

  const role = user.role;
  const isCandidate = role === "candidate";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md mx-4 w-full">
        <div className="text-center">
          <div className="text-5xl mb-4">{isCandidate ? "🔍" : "📋"}</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isCandidate
              ? "Please fill up your profile info to get started searching for jobs!"
              : "Please fill up your profile info to get started posting jobs!"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                closeProfileModal();
                navigate("/userProfile");
              }}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Go to Profile
            </button>
            <button
              onClick={closeProfileModal}
              className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileReminderModal;
