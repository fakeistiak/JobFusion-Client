import { auth } from "@/firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";


export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider=new GoogleAuthProvider();

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    
    const signInWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider);
    }
    
    const SignOutUser=()=>{
        setLoading(true);
        return signOut(auth);
    }

    
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            console.log('Currently logged user ',currentUser)
            setUser(currentUser);
            setLoading(false);
        })
        return()=>{
            unSubscribe();
        }
    },[])


    const authInfo={
        user,
        loading,
        createUser,
        signInUser,
        SignOutUser,
        signInWithGoogle,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;  