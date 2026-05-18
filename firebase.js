// Firebase SDK (MODULAR VERSION)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Config (YOUR PROJECT)
const firebaseConfig = {
  apiKey: "AIzaSyAj2f4XR9OyXEebYjQXersn1CRo-Egnf1o",
  authDomain: "wikifansx.firebaseapp.com",
  projectId: "wikifansx",
  storageBucket: "wikifansx.firebasestorage.app",
  messagingSenderId: "58018151336",
  appId: "1:58018151336:web:f35be145c0a5bcc783bb9d",
  measurementId: "G-EQTKJN28K0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics (only works in browser)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
