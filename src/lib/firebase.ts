import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJf1xxeJb-kuyUSCu0li4B7lfbB3yZILs",
  authDomain: "petconnect-tempo.firebaseapp.com",
  projectId: "petconnect-tempo",
  storageBucket: "petconnect-tempo.firebasestorage.app",
  messagingSenderId: "502476080804",
  appId: "1:502476080804:web:a52ca8dcf016c8186e8831",
  measurementId: "G-Q81DP4M0GW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Initialize analytics only in browser environment
let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Analytics not initialized:", error);
  }
}

export { app, analytics };
