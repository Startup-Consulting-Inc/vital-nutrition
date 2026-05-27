import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  writeBatch,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile } from '@/hooks/useUserProfile';
import type { MealEntry } from './mealLog';

/* ------------------------------------------------------------------ */
/*  User Profile                                                       */
/* ------------------------------------------------------------------ */

export async function syncUserProfile(uid: string, profile: UserProfile): Promise<void> {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, {
    profile,
    updatedAt: Date.now(),
  }, { merge: true });
}

export async function loadUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  return data.profile as UserProfile ?? null;
}

export function subscribeUserProfile(
  uid: string,
  onUpdate: (profile: UserProfile | null) => void
): Unsubscribe {
  const ref = doc(db, 'users', uid);
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      onUpdate(null);
      return;
    }
    const data = snap.data();
    onUpdate(data.profile as UserProfile ?? null);
  });
}

/* ------------------------------------------------------------------ */
/*  Meal Log                                                           */
/* ------------------------------------------------------------------ */

export async function syncMealEntry(uid: string, entry: MealEntry): Promise<void> {
  const ref = doc(db, 'users', uid, 'mealLogs', entry.id);
  await setDoc(ref, entry);
}

export async function deleteMealEntry(uid: string, entryId: string): Promise<void> {
  const ref = doc(db, 'users', uid, 'mealLogs', entryId);
  await deleteDoc(ref);
}

export async function loadMealLog(uid: string, date?: string): Promise<MealEntry[]> {
  const col = collection(db, 'users', uid, 'mealLogs');
  let q;
  if (date) {
    q = query(col, where('date', '==', date));
  } else {
    q = query(col);
  }
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as MealEntry);
}

export async function loadAllMealLogs(uid: string): Promise<MealEntry[]> {
  const col = collection(db, 'users', uid, 'mealLogs');
  const snap = await getDocs(col);
  return snap.docs.map((d) => d.data() as MealEntry);
}

export function subscribeMealLog(
  uid: string,
  date: string,
  onUpdate: (entries: MealEntry[]) => void
): Unsubscribe {
  const col = collection(db, 'users', uid, 'mealLogs');
  const q = query(col, where('date', '==', date));
  return onSnapshot(q, (snap) => {
    const entries = snap.docs.map((d) => d.data() as MealEntry);
    // Sort by addedAt
    entries.sort((a, b) => a.addedAt - b.addedAt);
    onUpdate(entries);
  });
}

/* ------------------------------------------------------------------ */
/*  Bulk sync (for migration)                                          */
/* ------------------------------------------------------------------ */

export async function pushLocalToCloud(uid: string, entries: MealEntry[], profile: UserProfile): Promise<void> {
  const batch = writeBatch(db);

  // Push profile
  const userRef = doc(db, 'users', uid);
  batch.set(userRef, { profile, updatedAt: Date.now() }, { merge: true });

  // Push meal log entries
  for (const entry of entries) {
    const entryRef = doc(db, 'users', uid, 'mealLogs', entry.id);
    batch.set(entryRef, entry);
  }

  await batch.commit();
}

export async function pullCloudToLocal(uid: string): Promise<{ entries: MealEntry[]; profile: UserProfile | null }> {
  const [profile, entries] = await Promise.all([
    loadUserProfile(uid),
    loadAllMealLogs(uid),
  ]);
  return { entries, profile };
}
