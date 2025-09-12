// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA3ibp9sbmuQfiPWx--GrCdROmQB92YLc",
  authDomain: "bhondhun-os-tm.firebaseapp.com",
  projectId: "bhondhun-os-tm",
  storageBucket: "bhondhun-os-tm.appspot.com",
  messagingSenderId: "130936996088",
  appId: "1:130936996088:web:50584da37eb951b0a13b0d",
  measurementId: "G-XD2M104XGV"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// Export Auth, Firestore, and Google Auth Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
