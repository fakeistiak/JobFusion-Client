import ThemeToggle from "@/components/ThemeToggle";
import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, SignOutUser } = useContext(AuthContext);

  const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/statistics", name: "Statistics" },
    ...(user
      ? [
          { id: 3, path: "/applied", name: "Applied Jobs" },
          { id: 4, path: "/addjob", name: "Add Job" },
        ]
      : []),
  ];

  const handleSignOut = () => {
    SignOutUser()
      .then(() => console.log("Successfully signed out"))
      .catch((error) => console.log(error.message));
  };

  const handleRouteClick = () => {
    setOpen(false);
  };

  const CustomDropdown = ({ trigger, menu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    return (
      <div className="relative" ref={menuRef}>
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
            {menu(() => setIsOpen(false))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-600 p-4 flex justify-between items-center text-white z-50">
      <Link to="/" className="text-3xl font-bold font-poppins">JobFusion</Link>
      <div
        className="md:hidden text-2xl cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      <ul
        className={`absolute md:static left-0 w-full md:w-auto bg-sky-600 md:bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 py-6 md:py-0 transition-all duration-300 ease-in-out ${
          open ? "top-16" : "-top-96"
        }`}
      >
        {routes.map((route) => (
          <li key={route.id} className="px-1 rounded-lg text-center">
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`
              }
              onClick={handleRouteClick}
            >
              {route.name}
            </NavLink>
          </li>
        ))}
        <ThemeToggle />
        <li>
          
          {user ? (
            <CustomDropdown
              trigger={
                <img
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  src={
                    user?.photoURL ||
                    "https://ui-avatars.com/api/?name=User&background=random"
                  }
                  alt={user?.displayName || "User"}
                />
              }
              menu={(closeDropdown) => (
                <div className="py-2 px-2">
                  <Link to="/profile" onClick={closeDropdown}>
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      My Profile
                    </button>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeDropdown();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            />
          ) : (
            <Link to="/login" className="text-lg text-gray-300 hover:text-white">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
