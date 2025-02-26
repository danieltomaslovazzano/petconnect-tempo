import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlTpQUOSZvgujSOVLkP3Ykz27c6ghD6-0",
  authDomain: "petconnect-a9069.firebaseapp.com",
  databaseURL:
    "https://petconnect-a9069-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "petconnect-a9069",
  storageBucket: "petconnect-a9069.appspot.com",
  messagingSenderId: "53583460493",
  appId: "1:53583460493:web:5bb3a9a8efb685606ccac4",
  measurementId: "G-1QCYJTW10W",
=======
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
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const storage = getStorage(app);
<<<<<<< HEAD

// Enable emulators if in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}
=======
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
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
