// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLO5npHmHaFcE4jfwA5GeqhgdO8AAVS3Q",
  authDomain: "x-z-pc-s.firebaseapp.com",
  projectId: "x-z-pc-s",
  storageBucket: "x-z-pc-s.appspot.com",
  messagingSenderId: "347444623352",
  appId: "1:347444623352:web:dde9eaa81698cf18bc080d",
  measurementId: "G-ENH6HZHX20"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };