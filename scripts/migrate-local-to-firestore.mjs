import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config({ path: ".env.local" });
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, "\n");
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
  throw new Error("Missing Firebase Admin environment variables.");
}
if (!getApps().length) initializeApp({ credential: cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey }) });
const db = getFirestore();
const mappings = [
  ["data/homepage-ar.json", "homepage-ar"], ["data/homepage-en.json", "homepage-en"],
  ["data/site-settings.json", "site-settings"], ["data/site-texts.json", "site-texts"],
  ["storage/private/site-content.json", "site-content"], ["storage/private/site-theme.json", "site-theme"],
  ["data/message-writer.json", "message-writer"]
];
for (const [file, key] of mappings) {
  try {
    const value = JSON.parse(await fs.readFile(path.join(process.cwd(), file), "utf8"));
    await db.collection("cms_documents").doc(key).set({ value, updatedAt: new Date().toISOString() }, { merge: true });
    console.log(`Migrated ${file} -> cms_documents/${key}`);
  } catch (error) { console.log(`Skipped ${file}: ${error.message}`); }
}
