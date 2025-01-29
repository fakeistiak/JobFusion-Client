import { AuthContext } from "@/Provider/AuthProvider"
import { useContext, useState, useRef, useEffect } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { Link, NavLink } from "react-router-dom"


const NavBar = () => {
  const [open, setOpen] = useState(false)
  const { user, SignOutUser } = useContext(AuthContext)

  const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/statistics", name: "Statistics" },
    ...(user ? [{ id: 3, path: "/applied", name: "Applied Jobs" }] : []),
    { id: 4, path: "/blog", name: "Blog" },
  ]

  const handleSignOut = () => {
    SignOutUser()
      .then(() => {
        console.log("Successfully sign out")
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const handleRouteClick = () => {
    setOpen(false)
  }

  const dropdownTrigger = (
    <div className="w-12 h-12">
      <img
        className="rounded-full object-cover w-full h-full cursor-pointer"
        src={user?.photoURL || "https://ui-avatars.com/api/?name=User&background=random"}
        onError={(e) => (e.target.src = "https://ui-avatars.com/api/?name=User&background=random")}
        alt={user?.displayName || "User"}
      />
    </div>
  );

  const dropdownMenu = (
    <div className="py-1">
      <div className="px-4 py-2">
      <p className="text-sm font-medium text-gray-900">
  {user?.displayName ? user.displayName : user?.email}
</p>
        <p className="text-sm text-gray-500"><span className="text-gray-600 font-bold">Last Login:</span> {user?.metadata.lastSignInTime || "No email available"}</p>

      </div>
      <div className="border-t border-gray-100"></div>
      <button
        onClick={handleSignOut}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Sign Out
      </button>
    </div>
  )


  const CustomDropdown = ({ trigger, menu }) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
  
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setOpen(false)
        }
      }
  
      document.addEventListener("mousedown", handleOutsideClick)
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick)
      }
    }, [])
  
    return (
      <div className="relative">
        <div onClick={() => setOpen(!open)}>{trigger}</div>
        {open && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
            {menu}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className="bg-sky-600 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-3xl font-bold font-serif">
        JobFusion
      </Link>
      <div className="md:hidden text-2xl cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      <ul
        className={`absolute md:static left-0 w-full md:w-auto bg-sky-600 md:bg-transparent flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 py-6 md:py-0 transition-all duration-300 ease-in-out ${
          open ? "top-16" : "-top-96"
        }`}
      >
        {routes.map((route) => (
          <li key={route.id} className="px-1 rounded-lg text-center w-full transition duration-300 whitespace-nowrap">
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
        <li className="flex-col items-center">
          {user ? (
            <CustomDropdown trigger={dropdownTrigger} menu={dropdownMenu} />
          ) : (
            <Link to="/login" className="text-lg font-medium text-gray-300 hover:text-white transition">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default NavBar

