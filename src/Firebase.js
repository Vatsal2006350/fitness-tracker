// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl6XKajpF0E2nddGtePKjRIfh9kLuEJ8o",
  authDomain: "fitness-app-f4933.firebaseapp.com",
  projectId: "fitness-app-f4933",
  storageBucket: "fitness-app-f4933.appspot.com",
  messagingSenderId: "12108275495",
  appId: "1:12108275495:web:4396eefe425db19d219302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('User info: ', user);
    // You can add additional handling here if needed
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error('Error during sign in with Google: ', errorCode, errorMessage, email, credential);
  }
};
