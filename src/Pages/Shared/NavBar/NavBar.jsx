import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineFileText,
  AiOutlinePlus,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const NavBar = () => {
  const [open, setOpen] = useState(false); // Controls sidebar visibility
  const { user, SignOutUser } = useContext(AuthContext);
  const [imgError, setImgError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const routes = [
    {
      id: 1,
      path: "/",
      name: "Home",
      icon: <AiOutlineHome className="text-2xl" />,
    },
    {
      id: 2,
      path: "/statistics",
      name: "Statistics",
      icon: <AiOutlineBarChart className="text-2xl" />,
    },
    ...(user
      ? [
          {
            id: 3,
            path: "/appliedJobs",
            name: "Applied Jobs",
            icon: <AiOutlineFileText className="text-2xl" />,
          },
          {
            id: 4,
            path: "/addjob",
            name: "Add Job",
            icon: <AiOutlinePlus className="text-2xl" />,
          },
        ]
      : []),
  ];

  const handleSignOut = () => {
    SignOutUser()
      .then(() => console.log("Successfully signed out"))
      .catch((error) => console.log(error.message));
  };

  const handleRouteClick = () => {
    setOpen(false); // Close sidebar when a route is clicked
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled && !open ? "backdrop-blur-xl bg-white/30" : "bg-teal-600"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`text-3xl font-bold font-poppins transition-colors duration-300 ${
          isScrolled && !open ? "text-teal-500 dark:text-teal-400 hover:text-gray-400" : "text-white"
        }`}
      >
        JobFusion
      </Link>

      {/* Mobile Menu Toggle Button */}
      <div
        className={`md:hidden text-2xl cursor-pointer transition-colors duration-300 ${
          isScrolled && !open ? "text-black hover:text-gray-400" : "text-white"
        }`}
        onClick={() => setOpen(!open)}
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      {/* Navigation Links for Desktop */}
      <ul className="hidden md:flex items-center space-x-6">
        {routes.map((route) => (
          <li key={route.id}>
            <NavLink
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to={route.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 ${
                  isActive
                    ? isScrolled
                      ? "text-teal-600 font-bold text-xl dark:text-teal-400"
                      : "text-white"
                    : isScrolled
                    ? "text-gray-600 hover:text-gray-900 dark:text-gray-200"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {route.name}
            </NavLink>
          </li>
        ))}

        {/* Theme Toggle */}
        <li>
          <button
            className={`transition-colors duration-300 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            <ThemeToggle />
          </button>
        </li>

        {/* Profile Menu Button */}
        <li>
          <div
            className={`flex items-center space-x-2 cursor-pointer transition-colors duration-300 ${
              isScrolled ? "text-black hover:text-gray-400" : "text-white"
            }`}
            onClick={() => setOpen(!open)}
          >
            <img
              className="w-12 h-12 rounded-full object-cover"
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
        </li>
      </ul>

      {/* Sidebar for Mobile */}
      
      <div
        className={`fixed top-0 right-0 h-full w-64 dark:bg-black bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0 px-4 pt-8" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-black dark:text-white">
              Profile
            </span>
            <button onClick={() => setOpen(false)}>
              <AiOutlineClose className="text-2xl text-black dark:text-white" />
            </button>
          </div>

          {/* User Profile Section */}
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  className="lg:w-20 lg:h-20 w-12 h-12 rounded-full object-cover"
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
                <span className="text-lg font-medium text-black dark:text-white">
                  {user?.displayName}
                </span>
              </div>
              <div className="my-6">
                <ThemeToggle />
              </div>

              <Link
                to="/userProfile"
                onClick={() => setOpen(false)}
                className="items-center flex gap-2 text-lg font-medium text-black dark:text-white hover:text-gray-500"
              >
                <CgProfile className="text-2xl" />
                My Profile
              </Link>
            </div>
          ) : (
            <h1
              className="block text-md font-medium text-black dark:text-white "
            >
              Login to see your Profile Info
            </h1>
          )
          }

          {/* Navigation Links for Mobile */}
          <ul className="mt-3">
            {routes.map((route) => (
              <li key={route.id} className="mb-4">
                <NavLink
                  to={route.path}
                  onClick={() => {
                    handleRouteClick();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-lg font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-teal-600 dark:text-teal-400 "
                        : "text-black dark:text-white hover:text-gray-600"
                    }`
                  }
                >
                  {route.icon}
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Theme Toggle for Mobile */}

          {user ? (
            <button
              onClick={() => {
                handleSignOut();
                setOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 text-lg font-medium text-black dark:text-white hover:text-gray-500"
            >
              <PiSignOutBold className="text-2xl" />
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="w-full text-left flex items-center gap-2 text-lg font-medium text-black dark:text-white hover:text-gray-500"
            >
              <CgProfile className="text-2xl" />
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-lg z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default NavBar;
