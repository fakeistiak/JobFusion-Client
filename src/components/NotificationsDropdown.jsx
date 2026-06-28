import { useEffect, useState, useRef } from "react";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const fetchNotifications = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/notifications?email=${email}`,
      );
      const data = await res.json();
      setNotifications(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [email]);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(`/notifications/${id}/read`, {
        method: "PATCH",
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch {
      // silent
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (n) => {
    markAsRead(n._id);
    if (n.link) {
      navigate(n.link);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          setOpen(!open);
          if (!open && unreadCount > 0) {
            fetch("/notifications/read-all", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }).catch(() => {});
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }
        }}
        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <IoNotifications className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
            <h3 className="font-semibold text-sm">Notifications</h3>
          </div>

          {loading && notifications.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              Loading...
            </div>
          )}

          {!loading && notifications.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          )}

          {notifications.map((n) => (
            <button
              key={n._id}
              onClick={() => handleNotificationClick(n)}
              className={`w-full text-left px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                !n.read ? "bg-teal-50 dark:bg-teal-900/20" : ""
              }`}
            >
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
