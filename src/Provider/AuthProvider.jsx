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
            `/users?email=${currentUser.email}`,
          );
          const backendUser = await res.json();

          // Merge Firebase and backend info
          const mergedUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: backendUser.name || currentUser.displayName,
            photoURL: backendUser.photoURL
              ? backendUser.photoURL.startsWith("http")
                ? backendUser.photoURL
                : `${backendUser.photoURL}`
              : currentUser.photoURL,
            number: backendUser.number || "",
            role: backendUser.role || "candidate",
            portfolio: backendUser.portfolio || "",
            resume: backendUser.resume || "",
            github: backendUser.github || "",
            education: backendUser.education || "",
            linkedIn: backendUser.linkedIn || "",
            company_name: backendUser.company_name || "",
            company_website: backendUser.company_website || "",
            industry: backendUser.industry || "",
            company_size: backendUser.company_size || "",
          };

          setUser(mergedUser);
          setIsAdmin(backendUser?.role === "admin");
          localStorage.setItem("role", mergedUser.role);
          localStorage.setItem("email", mergedUser.email);
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

  const [showProfileModal, setShowProfileModal] = useState(false);

  const isProfileComplete = (u) => {
    if (!u) return true;
    if (u.role === "admin") return true;
    if (u.role === "candidate") return !!(u.displayName && u.number && u.portfolio && u.github && u.linkedIn && u.resume && u.education);
    if (u.role === "recruiter") return !!(u.displayName && u.number && u.company_name && u.company_website && u.industry && u.company_size && u.linkedIn);
    return true;
  };

  useEffect(() => {
    if (!user) return;
    if (isProfileComplete(user)) return;

    const shouldRemind = sessionStorage.getItem("profileReminder");
    if (shouldRemind !== "true") return;
    sessionStorage.removeItem("profileReminder");

    const timer = setTimeout(() => {
      setShowProfileModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  const closeProfileModal = () => setShowProfileModal(false);

  const refreshUser = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;
    try {
      const res = await fetch(`/users?email=${email}`);
      const backendUser = await res.json();
      if (backendUser && backendUser.email) {
        setUser((prev) => ({
          ...prev,
          displayName: backendUser.name || prev?.displayName || "",
          photoURL: backendUser.photoURL
            ? backendUser.photoURL.startsWith("http")
              ? backendUser.photoURL
              : `${backendUser.photoURL}`
            : prev?.photoURL || "",
          number: backendUser.number || "",
          role: backendUser.role || "candidate",
          portfolio: backendUser.portfolio || "",
          resume: backendUser.resume || "",
          github: backendUser.github || "",
          education: backendUser.education || "",
          linkedIn: backendUser.linkedIn || "",
          company_name: backendUser.company_name || "",
          company_website: backendUser.company_website || "",
          industry: backendUser.industry || "",
          company_size: backendUser.company_size || "",
        }));
      }
    } catch {
      // silent
    }
  };

  const authInfo = {
    user,
    setUser,
    isAdmin,
    loading,
    createUser,
    signInUser,
    SignOutUser,
    signInWithGoogle,
    refreshUser,
    showProfileModal,
    closeProfileModal,
    isProfileComplete,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
