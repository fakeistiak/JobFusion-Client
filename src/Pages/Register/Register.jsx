import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "@/firebase/firebase.init";
import { useContext, useState } from "react";
import { FaGithub, FaEye, FaPhoneAlt, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "@/Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const {createUser}=useContext(AuthContext);
  const navigate=useNavigate()
  const location=useLocation()


  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password, name, number);
    setRegisterError("");
  
    createUser(email, password)
      .then(result => {
        console.log("User registered:", result.user);
        // sendEmailVerification(result.user)
        const newUser={name,number,email}
        fetch('http://localhost:5000/users',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
            body:JSON.stringify(newUser)
        })
        e.target.reset();
        navigate(location?.state ? location.state :'/')
      .then(res=>res.json())
      .then(data=>{
        console.log('user created to db',data)
      })
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        setRegisterError(error.message);
      });
  };
  

  //Login With Google
  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      setUser(loggedInUser);
  
      const res = await fetch(`http://localhost:5000/users?email=${loggedInUser.email}`);
      const data = await res.json();
  
      if (!data || Object.keys(data).length === 0) {
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: loggedInUser.displayName,
            email: loggedInUser.email,
            photoURL: loggedInUser.photoURL,
            number: "",
          }),
        });
      }
  
      navigate(location?.state || "/");
  
      setTimeout(() => {
        toast.success("Login successful!", { position: "top-right" });
      }, 800);
    } catch (error) {
      console.error("Google sign-in error", error.message);
      toast.error("Google sign-in failed!", { position: "top-right" });
    }
  };
  

  //Login With Github
  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      setUser(loggedUser);
      navigate(location?.state ? location.state :'/')
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
  <div className="w-full max-w-md bg-gray-50 text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-md p-8">
    <h2 className="lg:text-4xl md:text-4xl text-3xl font-bold text-center mb-6 text-teal-600 dark:text-white">
      Register Now
    </h2>
    <form onSubmit={handleRegister}>
      <div className="space-y-4">
        <div className="flex justify-center items-center gap-2">
          <MdDriveFileRenameOutline className="text-2xl text-teal-600 dark:text-teal-400" />
          <input
            id="name"
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaPhoneAlt className="text-2xl text-teal-600 dark:text-teal-400" />
          <input
            id="number"
            type="tel"
            name="number"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            placeholder="Enter your number"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <MdEmail className="text-2xl text-teal-600 dark:text-teal-400" />
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex items-center gap-2">
          <RiLockPasswordFill className="text-2xl text-teal-600 dark:text-teal-400" />
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FaEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer" />
              ) : (
                <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer" />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Button type="submit" variant="custom2">
          Sign Up
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              Or
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleGoogleSignin}
          className="w-full gap-2 flex items-center justify-center bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded border border-gray-300 dark:border-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          <FcGoogle className="lg:text-2xl text-xl" />
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={handleGithubSignin}
          className="w-full gap-2 flex items-center justify-center bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded border border-gray-300 dark:border-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          <FaGithub className="lg:text-2xl text-xl" />
          Sign up with Github
        </button>
      </div>
      <p className="py-4 text-lg text-center">
        Already Have an account?{" "}
        <a className="text-teal-600 dark:text-teal-400" href="/login">
          Sign In
        </a>
      </p>
    </form>
    {registerError && (
      <p className="text-red-600 text-center">{registerError}</p>
    )}
  </div>
</div>

  );
};

export default Register;
