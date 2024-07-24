import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail as sendPasswordResetEmailFromAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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
const db = getFirestore(app);
const auth = getAuth(app);
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
    throw new Error('Something went wrong with Google sign-in. Please try again.'); // Propagate a generic error message
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
    throw new Error('Sign-up failed. Please try again.'); // Propagate a generic error message
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error during email sign in: ', error);
    throw new Error('Incorrect email or password. Please try again.'); // Propagate a generic error message
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmailFromAuth(auth, email);
  } catch (error) {
    console.error('Error sending password reset email: ', error);
    throw new Error('Failed to send password reset email. Please try again.'); // Propagate a generic error message
  }
};
