import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVXEWpE_lXF8VvR5uOD9JhqnGIJF-mySk",
  authDomain: "ambikamart-b2b.firebaseapp.com",
  projectId: "ambikamart-b2b",
  storageBucket: "ambikamart-b2b.firebasestorage.app",
  messagingSenderId: "587602119689",
  appId: "1:587602119689:web:ac6d8e4901181ea07ebcd8",
  measurementId: "G-TD38L7VNQ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };  // <-- YE LINE IMPORTANT HAI