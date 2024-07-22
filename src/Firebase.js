// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export { db, auth, googleProvider };

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // Check if user exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, { subscribed: false });
    }
  } catch (error) {
    console.error('Error during sign in with Google: ', error);
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Set default subscription status in Firestore
    await setDoc(doc(db, 'users', user.uid), { subscribed: false });
  } catch (error) {
    console.error('Error during email sign up: ', error);
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error during email sign in: ', error);
  }
};
