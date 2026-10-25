// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.db = db;

// for creating a reference to a specific document
window.firestoreDoc = doc;
// for creating or overwriting a document
window.firestoreSetDoc = setDoc;
// for loading a single document
window.firestoreGetDoc = getDoc;
// Provides access to Firebase Authentication
window.firebaseAuth = auth;
// for registering a user with email and password
window.firebaseCreateUserWithEmailAndPassword = createUserWithEmailAndPassword;
// for signing in a user with email and password
window.firebaseSignInWithEmailAndPassword = signInWithEmailAndPassword;
// for updating the user's profile data
window.firebaseUpdateProfile = updateProfile;
// Signs in a user anonymously
window.firebaseSignInAnonymously = signInAnonymously;
// Signs out the current user
window.firebaseSignOut = signOut;
