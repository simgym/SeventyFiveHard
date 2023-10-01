// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgW3ms7N5VAQWtRAUgffwjeFyz0g5ZWOo",
  authDomain: "hard-88a4f.firebaseapp.com",
  databaseURL: "https://hard-88a4f-default-rtdb.firebaseio.com",
  projectId: "hard-88a4f",
  storageBucket: "hard-88a4f.appspot.com",
  messagingSenderId: "36302044654",
  appId: "1:36302044654:web:9262673c1f6dce3adf22ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
