// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail,createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGwpnVKWcl3I5VyarxN_5iZ3QVOCdQ4y4",
  authDomain: "grant-block.firebaseapp.com",
  projectId: "grant-block",
  storageBucket: "grant-block.appspot.com",
  messagingSenderId: "866685109854",
  appId: "1:866685109854:web:9c6acca8e8cfaaacb116cf",
  measurementId: "G-E6JRNHRVDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { app, db, auth, provider, addDoc, collection, doc, getDoc };
