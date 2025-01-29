// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_yLc-K-ObR4N75qpwrRvs1dTuQI7jm8s",
  authDomain: "jobfusion-1f848.firebaseapp.com",
  projectId: "jobfusion-1f848",
  storageBucket: "jobfusion-1f848.firebasestorage.app",
  messagingSenderId: "953980021284",
  appId: "1:953980021284:web:aabdba2cbc8a28d11a86b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;