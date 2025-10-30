import { auth } from "@/firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const SignOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch backend profile by email
          const res = await fetch(
            `https://job-fusion-server-9yho.vercel.app//users?email=${currentUser.email}`
          );
          const backendUser = await res.json();

          // Merge Firebase and backend info
          const mergedUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: backendUser.name || currentUser.displayName,
            photoURL: backendUser.photoURL
              ? `https://job-fusion-server-9yho.vercel.app/${backendUser.photoURL}`
              : currentUser.photoURL,
            number: backendUser.number || "",
            // add more backend fields if needed here
          };

          setUser(mergedUser);
          setIsAdmin(backendUser?.role === "admin"); // Set admin status here
        } catch (error) {
          console.error("Failed to fetch backend user profile:", error);
          setUser(currentUser); // fallback to firebase user only
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    isAdmin,
    loading,
    createUser,
    signInUser,
    SignOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
