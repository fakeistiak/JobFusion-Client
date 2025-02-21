import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import app from "@/firebase/firebase.init";
import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from "@/Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Timer } from "lucide-react";

const Login = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth(app);
  const emailRef = useRef();
  const githubProvider = new GithubAuthProvider();
  const googleProvider = new GoogleAuthProvider();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  //Login With Email Password
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("");
    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
        setTimeout(() => {
          toast.success("Login successful!", { position: "top-right" });
        }, 800);
        e.target.reset();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error("Wrong username or password check again " , {
          position: "top-right",
        });
      });
  };

  //Login with Google
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
  
  

  //Login with Github
  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      setErrorMessage("Please provide an email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErrorMessage("Password reset email sent! Please check your inbox.");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
        <div className="w-full max-w-md bg-gray-50 text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-md p-8">
          <h2 className="lg:text-4xl md:text-4xl text-3xl font-bold text-center mb-6 text-teal-600 dark:text-white">
            Login Now
          </h2>
          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2">
                <MdEmail className="text-2xl text-teal-600 dark:text-teal-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  ref={emailRef}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-black dark:bg-gray-700 dark:text-white"
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
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-black dark:bg-gray-700 dark:text-white"
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
              <div>
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="pl-8 text-teal-600 dark:text-teal-400 underline hover:text-teal-800 dark:hover:text-teal-300"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <Button type="submit" variant="custom2">
                Sign In
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
              <div className="flex justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="gap-2 flex items-center justify-center bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded border border-gray-300 dark:border-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  <FcGoogle className="lg:text-2xl text-xl" />
                </button>
                <button
                  type="button"
                  onClick={handleGithubSignin}
                  className="gap-2 flex items-center justify-center bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded border border-gray-300 dark:border-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  <FaGithub className="lg:text-2xl text-xl" />
                </button>
              </div>
            </div>
            <p className="py-4 text-lg text-center">
              New to JobFusion?{" "}
              <a className="text-teal-600 dark:text-teal-400" href="/register">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
