import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { requirePersistentStorage } from "@/lib/firebase/cms-store";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";

export type ContactMessageStatus = "new" | "in_progress" | "done" | "archived";
export type ContactMessagePriority = "low" | "normal" | "high";
export type ContactMessage = {
  id: string; locale: "ar" | "en"; name: string; phone: string; email: string; service: string;
  budget: string; message: string; status: ContactMessageStatus; priority: ContactMessagePriority;
  internalNotes: string; source: "website"; ip: string; userAgent: string; createdAt: string; updatedAt: string;
};

const COLLECTION = "contact_messages";
const localPath = runtimeStoragePath("storage", "private", "contact-messages.json");

async function readLocal(): Promise<ContactMessage[]> {
  try { return JSON.parse(await fs.readFile(localPath, "utf8")) as ContactMessage[]; } catch { return []; }
}
async function writeLocal(items: ContactMessage[]) {
  requirePersistentStorage();
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, JSON.stringify(items, null, 2) + "\n", "utf8");
}

export async function listContactMessages() {
  if (!isFirebaseAdminConfigured()) return (await readLocal()).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  const snapshot = await getAdminDb().collection(COLLECTION).orderBy("createdAt", "desc").limit(500).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<ContactMessage,"id">) }));
}

export async function createContactMessage(input: { locale:"ar"|"en"; name:string; phone?:string; email?:string; service:string; budget?:string; message:string; ip?:string; userAgent?:string; }) {
  const now = new Date().toISOString();
  const item: ContactMessage = { id: crypto.randomBytes(10).toString("hex"), locale:input.locale, name:input.name,
    phone:input.phone||"", email:input.email||"", service:input.service, budget:input.budget||"", message:input.message,
    status:"new", priority:"normal", internalNotes:"", source:"website", ip:input.ip||"", userAgent:input.userAgent||"", createdAt:now, updatedAt:now };
  if (isFirebaseAdminConfigured()) await getAdminDb().collection(COLLECTION).doc(item.id).set(item);
  else { const items = await readLocal(); items.unshift(item); await writeLocal(items.slice(0, 500)); }
  return item;
}

export async function updateContactMessage(id:string, patch:Partial<Pick<ContactMessage,"status"|"priority"|"internalNotes">>) {
  if (isFirebaseAdminConfigured()) {
    const ref=getAdminDb().collection(COLLECTION).doc(id); const snap=await ref.get();
    if(!snap.exists) throw new Error("Message not found.");
    const next={...(snap.data() as ContactMessage),...patch,id,updatedAt:new Date().toISOString()}; await ref.set(next); return next;
  }
  const items=await readLocal(); const index=items.findIndex((item)=>item.id===id); if(index<0) throw new Error("Message not found.");
  const next={...items[index],...patch,updatedAt:new Date().toISOString()}; items[index]=next; await writeLocal(items); return next;
}
export async function deleteContactMessage(id:string) {
  if (isFirebaseAdminConfigured()) { const ref=getAdminDb().collection(COLLECTION).doc(id); const snap=await ref.get(); if(!snap.exists) throw new Error("Message not found."); await ref.delete(); return true; }
  const items=await readLocal(); const next=items.filter((item)=>item.id!==id); if(next.length===items.length) throw new Error("Message not found."); await writeLocal(next); return true;
}
