// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
