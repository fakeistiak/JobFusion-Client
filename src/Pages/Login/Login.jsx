import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "@/firebase/firebase.init";
import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from "@/Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth(app);
  const emailRef = useRef();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const {signInUser}=useContext(AuthContext);
  const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("");
    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        e.target.reset();
        navigate('/')
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };


  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        navigate('/')
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        navigate('/')
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="lg:text-4xl md:text-4xl text-3xl font-bold text-center mb-6 text-sky-600">
            Login Now
          </h2>
          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2">
                <MdEmail className="text-2xl text-sky-600" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  ref={emailRef}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex items-center gap-2">
                <RiLockPasswordFill className="text-2xl text-sky-600" />
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <FaEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    ) : (
                      <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="pl-8 text-sky-600 underline hover:text-sky-800"
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
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="gap-2 flex items-center justify-center bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  <FcGoogle className="lg:text-2xl text-xl" />
                </button>
                <button
                  type="button"
                  onClick={handleGithubSignin}
                  className="gap-2 flex items-center justify-center bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  <FaGithub className="lg:text-2xl text-xl" />
                </button>
              </div>
            </div>
            <p className="py-4 text-lg text-center">
              New to JobFusion?{" "}
              <a className="text-sky-600" href="/register">
                Sign Up
              </a>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
