import { useEffect, useState, useCallback, createContext, useContext } from 'react';
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  linkWithPopup,
  linkWithCredential,
  EmailAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
  type User,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export interface AuthState {
  user: User | null;
  isAnonymous: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  linkWithGoogle: () => Promise<void>;
  linkWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<(AuthState & AuthActions) | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-sign-in anonymously on mount if no user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);

      // If no user at all, sign in anonymously
      if (!firebaseUser) {
        signInAnonymously(auth).catch((err) => {
          console.error('Anonymous sign-in failed:', err);
          setError('Failed to initialize guest session. Please refresh.');
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
      throw err;
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Email sign-in failed');
      throw err;
    }
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string, displayName?: string) => {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && cred.user) {
        await updateProfile(cred.user, { displayName });
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      throw err;
    }
  }, []);

  const linkWithGoogle = useCallback(async () => {
    if (!user) throw new Error('No user to link');
    setError(null);
    try {
      await linkWithPopup(user, googleProvider);
    } catch (err: any) {
      setError(err.message || 'Account linking failed');
      throw err;
    }
  }, [user]);

  const linkWithEmail = useCallback(async (email: string, password: string) => {
    if (!user) throw new Error('No user to link');
    setError(null);
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential);
    } catch (err: any) {
      setError(err.message || 'Account linking failed');
      throw err;
    }
  }, [user]);

  const signOut = useCallback(async () => {
    setError(null);
    try {
      await firebaseSignOut(auth);
      // After sign out, anonymous auth will auto-trigger via onAuthStateChanged
    } catch (err: any) {
      setError(err.message || 'Sign out failed');
      throw err;
    }
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
      throw err;
    }
  }, []);

  const value: AuthState & AuthActions = {
    user,
    isAnonymous: user ? user.isAnonymous : true,
    isLoading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    linkWithGoogle,
    linkWithEmail,
    signOut,
    sendPasswordReset,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState & AuthActions {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
