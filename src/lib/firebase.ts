import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkI4sk25WyqjGf7jNhDidXLl1j5W-UAmQ",
  authDomain: "nutrition-help.firebaseapp.com",
  projectId: "nutrition-help",
  storageBucket: "nutrition-help.firebasestorage.app",
  messagingSenderId: "60781925044",
  appId: "1:60781925044:web:ae49e1ff44cd97826c3de1",
  measurementId: "G-VHLGJHTSLN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Enable offline persistence for Firestore (multi-tab safe)
enableMultiTabIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.warn('Firestore persistence failed: multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support IndexedDB
    console.warn('Firestore persistence not available in this browser');
  }
});

export default app;
