import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";
import { MdDriveFileRenameOutline, MdPassword } from "react-icons/md";

const ProfileSetting = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="py-12">
      <h1 className="py-6 text-4xl font-semibold  text-center">
        Account Settings
      </h1>
      <div>
        <h1 className="text-2xl font-semibold py-6">Change Password</h1>
        <form>
          <div className="flex justify-center items-center gap-2 pb-4">
            <MdDriveFileRenameOutline className="text-2xl dark:text-teal-400" />
            <input
              id="name"
              type="name"
              name="name"
              defaultValue={user?.displayName}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <MdPassword className="text-2xl text-black dark:text-teal-400" />
            <input
              id="password"
              name="password"
              defaultValue="123456"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-black dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
            />
          </div>
        </form>
      </div>
      <div className="py-6">
        <p className="text-sm font-semibold">
          Account created:{" "}
          <span className="font-light">{user?.metadata?.creationTime}</span>
        </p>
        <p className="text-sm font-semibold">
          Last sign in at:{" "}
          <span className="font-light">{user?.metadata?.lastSignInTime}</span>
        </p>
      </div>
    </section>
  );
};

export default ProfileSetting;
