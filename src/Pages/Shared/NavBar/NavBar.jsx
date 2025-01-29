import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const {user,SignOutUser}=useContext(AuthContext);
  console.log(user)
  const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/statistics", name: "Statistics" },
    { id: 4, path: "/blog", name: "Blog" },
  ];
  
  const handleSignOut = () => {
    SignOutUser()
      .then(() => {
        console.log('Successfully sign out')
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
        className={`absolute md:static left-0 w-full md:w-auto bg-sky-600 bg-sky-600md:bg-transparent flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 py-6 md:py-0 transition-all duration-300 ease-in-out ${
          open ? "top-16" : "-top-96"
        }`}
      >
        {routes.map((route) => (
          <li
            key={route.id}
            className="px-1 rounded-lg text-center w-full  transition duration-300 whitespace-nowrap"
          >
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? "text-white rounded-lg" : "text-gray-300 hover:text-white transition"
                }`
              }
              onClick={handleRouteClick}
            >
              {route.name}
            </NavLink>
          </li>
        ))}
        <div className="flex-col items-center">
          {
            user?
            <>
            <img className="rounded-full object-cover w-10 h-10" src={user.photoURL} alt="" />
            <p className="text-sm">{user.displayName}</p>
            <Button onClick={handleSignOut} variant="destructive">Sign Out</Button>
            </>
            :<Link to="/login">Login</Link>
          }
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
