// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kenny-estate.firebaseapp.com",
  projectId: "kenny-estate",
  storageBucket: "kenny-estate.firebasestorage.app",
  messagingSenderId: "326541007437",
  appId: "1:326541007437:web:16e8046e9e5d90c8f51a04",
  measurementId: "G-QMREN0K94K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);