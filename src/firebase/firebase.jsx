// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdOLQ2Z6CvtMKtYADhhviqL4WXZ7ajvyM",
  authDomain: "ballerina-46dec.firebaseapp.com",
  databaseURL: "https://ballerina-46dec-default-rtdb.firebaseio.com",
  projectId: "ballerina-46dec",
  storageBucket: "ballerina-46dec.appspot.com",
  messagingSenderId: "665170896079",
  appId: "1:665170896079:web:d607ec337183cd0f3703ba"
};

// Initialize Firebase
const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
export { auth, app };