‎// ভবিষ্যতে ইনকাম সিস্টেম, পেমেন্ট গেটওয়ে বা সাবস্ক্রিপশন সিস্টেম এখানে বসানো হবে
‎console.log("Bondhon OS script loaded!");
‎
function signup() {
  const email = document.getElementById("email").value;
  if(!email) {
    alert("ইমেইল লিখুন!");
    return;
  }

  // Firebase Firestore এ সাবমিট
  const db = firebase.firestore();
  db.collection("users").add({
    email: email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("সাইন আপ সফল!");
    document.getElementById("email").value = '';
  }).catch(err => {
    console.error(err);
    alert("কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
  });
}
