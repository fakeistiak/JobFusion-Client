import ThemeToggle from "@/components/ThemeToggle";
import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, SignOutUser } = useContext(AuthContext);
  const [imgError, setImgError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
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
    <nav
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-xl bg-white/30" : "bg-teal-600"
      }`}
    >
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`text-3xl font-bold font-poppins transition-colors duration-300 ${
          isScrolled ? "text-black hover:text-gray-400" : "text-white"
        }`}
      >
        JobFusion
      </Link>

      <div
        className={`md:hidden text-2xl cursor-pointer transition-colors duration-300 ${
          isScrolled ? "text-black hover:text-gray-400" : "text-white"
        }`}
        onClick={() => setOpen(!open)}
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-lg md:hidden z-40"></div>
      )}

      <ul
        className={`absolute md:static left-0 w-full md:w-auto flex flex-col md:flex-row items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 py-6 md:py-0 transition-all duration-300 ease-in-out bg-teal-600 md:bg-transparent text-white ${
          open ? "top-16 z-50" : "-top-96"
        }`}
      >
        {routes.map((route) => (
          <li key={route.id} className="px-1 rounded-lg text-center">
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 ${
                  isActive
                    ? isScrolled
                      ? "text-black text-xl"
                      : "text-white text-xl"
                    : isScrolled
                    ? "text-gray-400 hover:text-black"
                    : "text-gray-300 hover:text-white"
                }`
              }
              onClick={handleRouteClick}
            >
              {route.name}
            </NavLink>
          </li>
        ))}

        <button
          className={`transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
          onClick={() => setOpen(false)}
        >
          <ThemeToggle />
        </button>

        <li>
          {user ? (
            <CustomDropdown
              trigger={
                <div
                  className={`flex items-center space-x-2 cursor-pointer transition-colors duration-300 ${
                    isScrolled ? "text-black hover:text-gray-400" : "text-white"
                  }`}
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
              }
              menu={(closeDropdown) => (
                <div className="py-2 px-2">
                  <h1 className="text-left px-4 py-2 text-sm text-teal-600 hover:bg-gray-100">
                    {user?.displayName}
                  </h1>
                  <Link to="/userProfile" onClick={() => setOpen(false)}>
                    <button className="block w-full text-left px-4 py-2 text-sm text-teal-600 hover:bg-gray-100">
                      My Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeDropdown();
                      setOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-teal-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            />
          ) : (
            <Link
              to="/login"
              className={`text-lg transition-colors duration-300 ${
                isScrolled
                  ? "text-black hover:text-gray-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
