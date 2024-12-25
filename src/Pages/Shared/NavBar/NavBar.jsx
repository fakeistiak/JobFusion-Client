import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/statistics", name: "Statistics" },
    { id: 3, path: "/applied", name: "Applied Jobs" },
    { id: 4, path: "/blog", name: "Blog" },
  ];

  const handleRouteClick = () => {
    setOpen(false);
  };

  return (
    <nav className="bg-sky-600 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-3xl font-bold font-serif">
        JobFusion
      </Link>
      <div
        className="md:hidden text-2xl cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      <ul
        className={`absolute md:static left-0 w-full md:w-auto bg-sky-600md:bg-transparent flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 py-6 md:py-0 transition-all duration-300 ease-in-out ${
          open ? "top-16" : "-top-96"
        }`}
      >
        {routes.map((route) => (
          <li
            key={route.id}
            className="px-1 rounded-lg text-center w-full hover:bg-sky-600hover:text-white transition duration-300 whitespace-nowrap"
          >
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? "text-white rounded-lg" : "text-gray-300"
                }`
              }
              onClick={handleRouteClick}
            >
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
