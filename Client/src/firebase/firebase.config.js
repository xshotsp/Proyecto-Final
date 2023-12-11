// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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

  try {
    const {user} = await signInWithPopup(auth, new GoogleAuthProvider());
    return user
  } catch (error) {
    return error.message
  }
};

export const facebookSignInFunction = async () => {
  try {
    await signInWithPopup(auth, new FacebookAuthProvider());
    return "Login correcto"
  } catch (error) {
    const message = error.message
    if (message === 'Firebase: Error (auth/account-exists-with-different-credential).'){
      return "Este email está asociado a una cuenta de Google"
    }
  }
};
