import { NextResponse } from "next/server";
import {
  getFirebaseConfigurationError,
  isFirebaseAdminConfigured,
  isFirebaseStorageConfigured,
} from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const firestore = isFirebaseAdminConfigured();
  const storage = isFirebaseStorageConfigured();
  const adminConfigured = Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.FIREBASE_ADMIN_EMAILS &&
      process.env.ADMIN_SESSION_SECRET
  );
  const firebaseConfigurationError = getFirebaseConfigurationError();
  const ok = firestore && adminConfigured;

  return NextResponse.json(
    {
      ok,
      app: "qyasat-cms",
      environment: process.env.VERCEL ? "vercel" : process.env.NODE_ENV,
      services: { firestore, storage, adminConfigured },
      ...(firebaseConfigurationError ? { firebaseConfigurationError } : {}),
      timestamp: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 }
  );
}
