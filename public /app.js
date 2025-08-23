// Import Firebase SDK (for browser CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// তোমার Firebase config (তুমি যেটা দিলে সেটাই বসানো হয়েছে)
const firebaseConfig = {
  apiKey: "AIzaSyCP8RjRCubcRcnUrRT7dWFaNMeoqC2hxeo",
  authDomain: "bhondhun-os.firebaseapp.com",
  projectId: "bhondhun-os",
  storageBucket: "bhondhun-os.firebasestorage.app",
  messagingSenderId: "874462142352",
  appId: "1:874462142352:web:7833f2528f40f5cfdf5d15",
  measurementId: "G-D5EN3W71P0"
};

// Firebase init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// === UI Elements ===
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");
const copyBtn = document.getElementById("copyReferral");

// === Login with Google ===
loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Referral Check
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get("ref");

    const userDoc = doc(db, "users", user.uid);
    const snap = await getDoc(userDoc);

    if (!snap.exists()) {
      // নতুন ইউজার হলে
      await setDoc(userDoc, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        wallet: 0,
        referrals: 0
      });

      if (refId && refId !== user.uid) {
        const refDoc = doc(db, "users", refId);
        await updateDoc(refDoc, {
          wallet: increment(1),
          referrals: increment(1)
        });
      }
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});

// === Logout ===
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// === Auth state change ===
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const data = userDoc.data();

    userInfo.innerHTML = `
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Wallet:</b> ${data.wallet} points</p>
      <p><b>Referrals:</b> ${data.referrals}</p>
      <p><b>Referral Link:</b> ${window.location.origin}/?ref=${user.uid}</p>
    `;
    copyBtn.style.display = "block";
  } else {
    userInfo.innerHTML = "<p>Please login</p>";
    copyBtn.style.display = "none";
  }
});

// === Copy referral link ===
copyBtn.addEventListener("click", () => {
  const text = `${window.location.origin}/?ref=${auth.currentUser.uid}`;
  navigator.clipboard.writeText(text);
  alert("Referral link copied!");
});
