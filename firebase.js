// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "তোমার_api_key",
  authDomain: "bondhon-os-app.firebaseapp.com",
  projectId: "bondhon-os-app",
  storageBucket: "bondhon-os-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcd1234"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
