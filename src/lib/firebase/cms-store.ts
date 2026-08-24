import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

const COLLECTION = "cms_documents";

export function requirePersistentStorage() {
  if (process.env.NODE_ENV === "production" && !isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin is required in production. Configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.");
  }
}

export async function readCmsDocument<T>(key: string): Promise<T | null> {
  if (!isFirebaseAdminConfigured()) return null;
  try {
    const snapshot = await getAdminDb().collection(COLLECTION).doc(key).get();
    return snapshot.exists ? (snapshot.data()?.value as T) ?? null : null;
  } catch (error) {
    // Public rendering should not fail just because Firestore is temporarily
    // unavailable. Callers can safely fall back to their local/default content.
    console.error(`FIREBASE_CMS_READ_FAILED:${key}`, error);
    return null;
  }
}

export async function writeCmsDocument<T>(key: string, value: T): Promise<T> {
  requirePersistentStorage();
  if (!isFirebaseAdminConfigured()) return value;
  await getAdminDb().collection(COLLECTION).doc(key).set(
    { value, updatedAt: new Date().toISOString() },
    { merge: true }
  );
  return value;
}
