import { auth, db, provider } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Email/Password Signup
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore এ সেভ
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
      role: "free",
      points: 0
    });

    alert("Signup Successful ✅");
    window.location.href = "dashboard.html";

  } catch (error) {
    alert("Error ❌ " + error.message);
  }
});

// Google Signup/Login
const googleBtn = document.getElementById("google-signup");
googleBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Firestore এ চেক ও সেভ
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      createdAt: new Date(),
      role: "free",
      points: 0
    }, { merge: true });

    alert("Google Login Successful ✅");
    window.location.href = "dashboard.html";

  } catch (error) {
    alert("Error ❌ " + error.message);
  }
});
