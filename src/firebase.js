// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEHti1tna1hl7hTZw1NADEBb_Zg7REVWk",
  authDomain: "pray-for-ukraine.firebaseapp.com",
  projectId: "pray-for-ukraine",
  storageBucket: "pray-for-ukraine.appspot.com",
  messagingSenderId: "893102549817",
  appId: "1:893102549817:web:3c87f716af342fc7b1d6e8",
  measurementId: "G-13K6WZ93PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();