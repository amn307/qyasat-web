import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let cachedApp: App | null = null;
let cachedError: Error | null = null;

function stripWrappingQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function getFirebasePrivateKey() {
  const raw = process.env.FIREBASE_PRIVATE_KEY;
  if (!raw) return undefined;

  let key = stripWrappingQuotes(raw)
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim();

  // Also support a base64-encoded PEM value. This is often easier to paste into Vercel.
  if (!key.includes("BEGIN PRIVATE KEY")) {
    try {
      const decoded = Buffer.from(key, "base64").toString("utf8").trim();
      if (decoded.includes("BEGIN PRIVATE KEY")) key = decoded;
    } catch {
      // Leave the original value in place; validation below will reject it safely.
    }
  }

  return key;
}

function hasValidPrivateKeyShape(key?: string) {
  return Boolean(
    key?.includes("-----BEGIN PRIVATE KEY-----") &&
      key.includes("-----END PRIVATE KEY-----")
  );
}

export function getFirebaseConfigurationError() {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = getFirebasePrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    return "Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY.";
  }
  if (!clientEmail.includes("@")) return "FIREBASE_CLIENT_EMAIL is invalid.";
  if (!hasValidPrivateKeyShape(privateKey)) {
    return "FIREBASE_PRIVATE_KEY is not a valid PEM key. Paste the complete private_key from the Firebase service-account JSON, or use a base64-encoded PEM key.";
  }
  return null;
}

export function isFirebaseAdminConfigured() {
  return getFirebaseConfigurationError() === null;
}

export function isFirebaseStorageConfigured() {
  return isFirebaseAdminConfigured() && Boolean(process.env.FIREBASE_STORAGE_BUCKET?.trim());
}

export function getFirebaseAdminApp() {
  if (cachedApp) return cachedApp;
  if (cachedError) throw cachedError;
  if (getApps().length > 0) {
    cachedApp = getApps()[0];
    return cachedApp;
  }

  const configurationError = getFirebaseConfigurationError();
  if (configurationError) throw new Error(configurationError);

  try {
    cachedApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!.trim(),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!.trim(),
        privateKey: getFirebasePrivateKey()!,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET?.trim() || undefined,
    });
    return cachedApp;
  } catch (error) {
    cachedError = error instanceof Error ? error : new Error(String(error));
    throw cachedError;
  }
}

export function getAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getAdminBucket() {
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET?.trim();
  if (!bucketName) throw new Error("FIREBASE_STORAGE_BUCKET is not configured.");
  return getStorage(getFirebaseAdminApp()).bucket(bucketName);
}

export { FieldValue };
