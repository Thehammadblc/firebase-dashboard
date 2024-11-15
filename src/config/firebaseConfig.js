// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB_Qm_-vCkN2xWKfgj2mEgxnU8BHqyND8c",
  authDomain: "repeatbatch-5da02.firebaseapp.com",
  databaseURL: "https://repeatbatch-5da02-default-rtdb.firebaseio.com",
  projectId: "repeatbatch-5da02",
  storageBucket: "repeatbatch-5da02.firebasestorage.app",
  messagingSenderId: "613844999421",
  appId: "1:613844999421:web:57cc5956d761fb2f933294",
  measurementId: "G-K7XV76YH0E"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export Firebase services for use in other files
export { db, auth, storage };
