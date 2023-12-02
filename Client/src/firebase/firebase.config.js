// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEe94lOHk4PUS_yHbf8QE0esdjrVUrz2o",
  authDomain: "quirkz-firebase.firebaseapp.com",
  projectId: "quirkz-firebase",
  storageBucket: "quirkz-firebase.appspot.com",
  messagingSenderId: "559285880456",
  appId: "1:559285880456:web:d20e047008ad6a2a80813d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Cierra la sección del usuario
export const signOutFunction = async () => {
  await signOut(auth);
  console.log("User Signed out");
};

export const googleSignInFunction = async () => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

export const facebookSignInFunction = async () => {
  const provider = new FacebookAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};
