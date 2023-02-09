// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvkUuOVFyD_B2a7KAvxywQkIK1eC67bKE",
  authDomain: "nerg-one.firebaseapp.com",
  projectId: "nerg-one",
  storageBucket: "nerg-one.appspot.com",
  messagingSenderId: "765501377766",
  appId: "1:765501377766:web:6cf6cb09c7a5537186bf27",
  measurementId: "G-6507QF8CEZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
