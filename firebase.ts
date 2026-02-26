import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmPQ5fK9PPn_Wv-rIFFUfYiDA1vSXILTY",
  authDomain: "livetv-c2912.firebaseapp.com",
  projectId: "livetv-c2912",
  storageBucket: "livetv-c2912.firebasestorage.app",
  messagingSenderId: "680763910622",
  appId: "1:680763910622:web:baf61bf7eba115a623d54f",
  measurementId: "G-HCQN42B204"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
