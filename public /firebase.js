// Firebase config (demo)
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "bondhonos.firebaseapp.com",
  projectId: "bondhonos",
  storageBucket: "bondhonos.appspot.com",
  messagingSenderId: "0000000000",
  appId: "1:0000000000:web:abcd1234"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
}
