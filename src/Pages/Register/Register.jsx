import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "@/firebase/firebase.init";
import { useContext, useState } from "react";
import {
  FaGithub,
  FaEye,
  FaPhoneAlt,
  FaEyeSlash,
  FaImage,
} from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (name, number, email, password) => {
    const errs = {};
    if (!name || name.trim().length < 2)
      errs.name = "Name must be at least 2 characters";
    if (!number || !/^\+?[\d\s\-()]{7,15}$/.test(number.trim()))
      errs.number = "Enter a valid phone number";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      errs.email = "Enter a valid email address";
    if (!password || password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (!photo) errs.photo = "Please select a profile photo";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const { createUser, setUser: setAuthContextUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const number = e.target.number.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    setRegisterError("");

    if (!validateForm(name, number, email, password)) return;

    setSubmitting(true);

    try {
      const result = await createUser(email, password);

      // Prepare form data for backend
      const formData = new FormData();
      const role = document.querySelector('input[name="role"]:checked')?.value || "candidate";
      formData.append("name", name);
      formData.append("number", number);
      formData.append("email", email);
      formData.append("role", role);
      if (photo) formData.append("photo", photo);

      const response = await fetch(
        "/users/with-photo",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      await updateProfile(result.user, {
        displayName: name,
        photoURL: data.photoURL || null,
      });

      // Update context user with merged data
      setAuthContextUser({
        uid: result.user.uid,
        email,
        displayName: data.name,
        photoURL: data.photoURL || null,
        number: data.number || "",
      });

      e.target.reset();
      setPhoto(null);
      setErrors({});
      sessionStorage.setItem("profileReminder", "true");
      navigate(location?.state || "/");
      toast.success("Registration successful!");
    } catch (error) {
      setRegisterError(error.message);
      toast.error("Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      // Fetch backend user or create if missing
      const res = await fetch(
        `/users?email=${loggedInUser.email}`
      );
      let data = await res.json();

      if (!data || Object.keys(data).length === 0) {
        const createRes = await fetch(
          "/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: loggedInUser.displayName,
              email: loggedInUser.email,
              photoURL: loggedInUser.photoURL,
              number: "",
            }),
          }
        );
        data = await createRes.json();
      }

      const photoURL = data.photoURL
        ? data.photoURL.startsWith("http")
          ? data.photoURL
          : `${data.photoURL}`
        : loggedInUser.photoURL;

      setAuthContextUser({
        ...loggedInUser,
        displayName: data.name || loggedInUser.displayName,
        photoURL,
        email: loggedInUser.email,
      });

      navigate(location?.state || "/");
      toast.success("Login successful!", { position: "top-right" });
    } catch (error) {
      toast.error("Google sign-in failed!", { position: "top-right" });
    }
  };

  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const loggedUser = result.user;
      setAuthContextUser(loggedUser);
      navigate(location?.state || "/");
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
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-10">{errors.name}</p>
              )}
            </div>
            <div className="flex justify-center items-start gap-2">
              <FaPhoneAlt className="text-2xl text-teal-600 dark:text-teal-400 mt-2" />
              <div className="w-full">
                <input
                  id="number"
                  type="tel"
                  name="number"
                  required
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white ${
                    errors.number ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your number"
                />
                {errors.number && (
                  <p className="text-red-500 text-xs mt-1">{errors.number}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-start gap-2">
              <FaImage className="text-2xl text-teal-600 dark:text-teal-400 mt-2" />
              <div className="w-full">
                <input
                  id="photo"
                  type="file"
                  name="photo"
                  accept="image/*"
                  required
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className={`w-full ${errors.photo ? "text-red-500" : ""}`}
                />
                {errors.photo && (
                  <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-start gap-2">
              <span className="text-2xl text-teal-600 dark:text-teal-400 mt-1">👤</span>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Register as
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="role" value="candidate" defaultChecked className="accent-teal-600" />
                    <span>Candidate</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="role" value="recruiter" className="accent-teal-600" />
                    <span>Recruiter</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <MdEmail className="text-2xl text-teal-600 dark:text-teal-400" />
              <input
                id="email"
                type="email"
                name="email"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-10">{errors.email}</p>
              )}
            </div>
            <div className="flex items-start gap-2">
              <RiLockPasswordFill className="text-2xl text-teal-600 dark:text-teal-400 mt-2" />
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FaEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer" />
                  ) : (
                    <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer" />
                  )}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Button type="submit" variant="custom2" disabled={submitting}>
              {submitting ? "Creating Account..." : "Sign Up"}
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
            {/* <button
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
            </button> */}
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
