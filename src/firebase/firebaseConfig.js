import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "labpenso-weather-stations.firebaseapp.com",
  projectId: "labpenso-weather-stations",
  storageBucket: "labpenso-weather-stations.firebasestorage.app",
  messagingSenderId: "77532248566",
  appId: "1:77532248566:web:4b43fbb876f04fcc78efd7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
