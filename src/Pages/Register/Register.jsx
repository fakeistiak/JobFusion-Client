import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import app from "@/firebase/firebase.init";
import { useContext, useState } from "react";
import { FaGithub, FaEye, FaPhoneAlt, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "@/Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const {createUser,signInWithGoogle}=useContext(AuthContext);
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
      .then((result) => {
        console.log("User registered:", result.user);
        sendEmailVerification(result.user)
        e.target.reset();
        navigate(location?.state ? location.state :'/')
      .then(() => {
          console.log("Verification email sent.");
        });
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        setRegisterError(error.message);
      });
  };
  

  //Login With Google
  const handleGoogleSignin = () => {
    signInWithGoogle(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        navigate(location?.state ? location.state :'/')
      })
      .catch((error) => {
        console.log("error", error.message);
      });
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
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="lg:text-4xl md:text-4xl text-3xl font-bold text-center mb-6 text-sky-600">
            Register Now
          </h2>
          {/* <h2 className="text-2xl font-bold text-center mb-6">
            Email : {user ? user.displayName : "Guest"}
          </h2> */}
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2">
                <MdDriveFileRenameOutline className="text-2xl text-sky-600" />
                <input
                  id="name"
                  type="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <FaPhoneAlt className="text-2xl text-sky-600" />
                <input
                  id="number"
                  type="number"
                  name="number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your number"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <MdEmail className="text-2xl text-sky-600" />
                <input
                  id="email"
                  type="email"
                  name="email"
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
            </div>
            <div className="mt-6 space-y-4">
            <Button type="submit" variant="custom2">
                  Sign Up
                </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="w-full gap-2 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                <FcGoogle className="lg:text-2xl text-xl" />
                Sign up with Google
              </button>
              <button
                type="button"
                onClick={handleGithubSignin}
                className="w-full gap-2 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                <FaGithub className="lg:text-2xl text-xl" />
                Sign up with Github
              </button>
            </div>
            <p className="py-4 text-lg text-center">
              Already Have an account?{" "}
              <a className="text-sky-600" href="/login">
                SignIn
              </a>{" "}
            </p>
          </form>
          {registerError && (
            <p className="text-red-600 text-center">{registerError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
