import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlTpQUOSZvgujSOVLkP3Ykz27c6ghD6-0",
  authDomain: "petconnect-a9069.firebaseapp.com",
  databaseURL:
    "https://petconnect-a9069-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "petconnect-a9069",
  storageBucket: "petconnect-a9069.firebasestorage.app",
  messagingSenderId: "53583460493",
  appId: "1:53583460493:web:5bb3a9a8efb685606ccac4",
  measurementId: "G-1QCYJTW10W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
