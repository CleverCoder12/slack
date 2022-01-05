// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO1zJwTN5TFQNQrvCXY4sEjARKpPSxz04",
  authDomain: "slack-29f30.firebaseapp.com",
  projectId: "slack-29f30",
  storageBucket: "slack-29f30.appspot.com",
  messagingSenderId: "258858986204",
  appId: "1:258858986204:web:47bc6009977f1da180e219",
  measurementId: "G-0L78D7ZP5E",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export default db;

export { provider, auth };
