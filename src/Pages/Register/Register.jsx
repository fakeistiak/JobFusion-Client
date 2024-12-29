import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
    createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "@/firebase/firebase.init";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Register = () => {

    const [user, setUser] = useState(null);
    const [registerError,setRegisterError]=useState('');
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
  
    const handleRegister=e=>{
      e.preventDefault();
      const name=e.target.name.value;
      const number=e.target.number.value;
      const email=e.target.email.value;
      const password=e.target.password.value;
      console.log(email,password,name,number)
      setRegisterError('');
      createUserWithEmailAndPassword(auth,email,password)
      .then(result=>{
        console.log(result.user)
      })
      .catch(error=>{
        console.error(error)
        setRegisterError(error.message)
      })
    }
    //Login With Github
    const handleGoogleSignin = () => {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const loggedInUser = result.user;
          setUser(loggedInUser);
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
      });
    };
  
    //SignOut
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
  }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <h2 className="lg:text-4xl md:text-4xl text-3xl font-bold text-center mb-6 text-sky-600">Register</h2>
                    <h2 className="text-2xl font-bold text-center mb-6">
                      Email : {user ? user.displayName : "Guest"}
                    </h2>
                      <form onSubmit={handleRegister}>
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Name
                            </label>
                            <input
                              id="name"
                              type="name"
                              name="name"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="number"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Number
                            </label>
                            <input
                              id="number"
                              type="number"
                              name="number"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your number"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Password
                            </label>
                            <input
                              id="password"
                              type="password"
                              name="password"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your password"
                            />
                          </div>
                        </div>
                        <div className="mt-6 space-y-4">
                          {user ? (
                            <div className="flex justify-center">
                              <Button onClick={handleSignOut} variant="custom2">
                                Signout
                              </Button>
                            </div>
                          ) : (
                            <Button type="submit" variant="custom2">
                              Sign Up
                            </Button>
                          )}
            
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
                        <p className="py-4 text-lg text-center">Already Have an account? <a className="text-sky-600" href="/login">SignIn</a> </p>
                        </form>
                        {
                            registerError && <p className="text-red-600 text-center">{registerError}</p>
                        }
                    </div>
                  </div>
        </div>
    );
};

export default Register;