import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcqZ-79Fj6M-2bpB0CikGjuxhVmvLEclA",
  authDomain: "movie-app-96ce7.firebaseapp.com",
  projectId: "movie-app-96ce7",
  storageBucket: "movie-app-96ce7.appspot.com",
  messagingSenderId: "982793765025",
  appId: "1:982793765025:web:f7165b0eb7881c4f22b0e0",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { db, auth };
