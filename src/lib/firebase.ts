import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

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
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});
export const googleProvider = new GoogleAuthProvider();

export default app;
