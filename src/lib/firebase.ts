import { initializeApp } from "firebase/app";
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
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enable emulators if in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}
