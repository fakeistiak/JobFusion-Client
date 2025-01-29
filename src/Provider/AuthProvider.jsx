import { auth } from "@/firebase/firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";


export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const SignOutUser=()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            console.log('Currently logged user ',currentUser)
            setUser(currentUser);
        })
        return()=>{
            unSubscribe();
        }
    },[])



    const authInfo={
        name,
        user,
        createUser,
        signInUser,
        SignOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;  