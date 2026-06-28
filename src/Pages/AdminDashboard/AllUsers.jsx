import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this user?</p>
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => closeToast()}
            >
              No
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => {
                handleDelete(id);
                closeToast();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ),
      {
        closeOnClick: false,
        autoClose: false,
        closeButton: false,
        draggable: false,
      },
    );
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/users/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success(result.message || "User deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleRoleToggle = async (userId, newRole) => {
    try {
      const res = await fetch(
        `/users/${userId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        },
      );
      const result = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, role: newRole } : u,
          ),
        );
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to update role");
      }
    } catch {
      toast.error("Error updating role");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-slate-50">
      <ToastContainer />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">All Users</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : user.role === "recruiter"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                  }`}>
                    {user.role || "candidate"}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  {user.role !== "admin" && (
                    <button
                      className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                      onClick={() => handleRoleToggle(user._id, "admin")}
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    className="px-3 py-1 text-red-600 hover:text-red-800"
                    onClick={() => confirmDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
