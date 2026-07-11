// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
console.log("ich bin config", import.meta.env);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.db = db;
window.firebaseAuth = auth;

// for accessing a Firestore collection
window.firestoreCollection = collection;

// for saving a new document to Firestore
window.firestoreAddDoc = addDoc;

// for loading multiple documents from Firestore
window.firestoreGetDocs = getDocs;

// for creating a reference to a specific document
window.firestoreDoc = doc;

// for creating or overwriting a document
window.firestoreSetDoc = setDoc;

// for loading a single document
window.firestoreGetDoc = getDoc;

// for building database queries
window.firestoreQuery = query;

// for registering a user with email and password
window.firebaseCreateUserWithEmailAndPassword = createUserWithEmailAndPassword;

// for signing in a user with email and password
window.firebaseSignInWithEmailAndPassword = signInWithEmailAndPassword;

//nur zu testzwecken, später löschen!!
// window.testFirebaseWrite = async function () {
//   try {
//     console.log("Vor addDoc");

//     const docRef = await addDoc(collection(db, "test"), {
//       message: "Firebase funktioniert!",
//       createdAt: new Date().toISOString(),
//     });

//     console.log("Nach addDoc");
//     console.log("Dokument gespeichert:", docRef.id);
//   } catch (error) {
//     console.error(error);
//   }
// };
