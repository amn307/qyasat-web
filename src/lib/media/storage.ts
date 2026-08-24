import fs from "node:fs/promises";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import crypto from "node:crypto";
import { getAdminBucket, isFirebaseStorageConfigured } from "@/lib/firebase/admin";
import { requirePersistentStorage } from "@/lib/firebase/cms-store";

export type MediaFolder = "logos" | "home" | "services" | "blog" | "og" | "misc";
export type MediaItem = { name: string; folder: MediaFolder; path: string; url: string; size: number; mimeType: string; createdAt: string; };
export const mediaFolders: MediaFolder[] = ["logos", "home", "services", "blog", "og", "misc"];
const uploadRoot = runtimeStoragePath("storage", "uploads");
const mimeMap: Record<string,string> = { ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".webp":"image/webp", ".gif":"image/gif", ".svg":"image/svg+xml", ".pdf":"application/pdf" };
export function getUploadRoot(){ return uploadRoot; }
export function safeFolder(input: unknown): MediaFolder { return typeof input === "string" && mediaFolders.includes(input as MediaFolder) ? input as MediaFolder : "misc"; }
export function sanitizeFileName(name:string){ const ext=path.extname(name).toLowerCase(); const base=path.basename(name,ext).toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,70); return `${base||"file"}-${crypto.randomBytes(5).toString("hex")}${ext}`; }
export function getMimeType(filePath:string){ return mimeMap[path.extname(filePath).toLowerCase()] || "application/octet-stream"; }
export function safeResolveMediaPath(parts:string[]){ const full=path.resolve(uploadRoot,parts.join("/")); const root=path.resolve(uploadRoot); if(!full.startsWith(root+path.sep)&&full!==root) throw new Error("Invalid media path."); return full; }
export async function ensureMediaFolders(){ if(isFirebaseStorageConfigured()) return; await Promise.all(mediaFolders.map(f=>fs.mkdir(path.join(uploadRoot,f),{recursive:true}))); }

async function listLocalFolder(folder:MediaFolder):Promise<MediaItem[]>{ const dir=path.join(uploadRoot,folder); await fs.mkdir(dir,{recursive:true}); const entries=await fs.readdir(dir,{withFileTypes:true}); const out:MediaItem[]=[]; for(const e of entries){ if(!e.isFile()) continue; const fp=path.join(dir,e.name); const stat=await fs.stat(fp); out.push({name:e.name,folder,path:`${folder}/${e.name}`,url:`/media/${folder}/${e.name}`,size:stat.size,mimeType:getMimeType(fp),createdAt:stat.birthtime.toISOString()}); } return out; }
export async function listMedia(){
  if(!isFirebaseStorageConfigured()) return (await Promise.all(mediaFolders.map(listLocalFolder))).flat().sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt));
  const [files]=await getAdminBucket().getFiles({prefix:"media/"});
  return files.filter(f=>!f.name.endsWith("/")).map(f=>{ const rel=f.name.replace(/^media\//,""); const [folder,...rest]=rel.split("/"); const name=rest.join("/"); const meta=f.metadata; const token=(meta.metadata as Record<string,string>|undefined)?.firebaseStorageDownloadTokens; const bucket=process.env.FIREBASE_STORAGE_BUCKET!; const encoded=encodeURIComponent(f.name); const url=token ? `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encoded}?alt=media&token=${token}` : `https://storage.googleapis.com/${bucket}/${f.name}`; return {name,folder:safeFolder(folder),path:rel,url,size:Number(meta.size||0),mimeType:meta.contentType||getMimeType(name),createdAt:meta.timeCreated||new Date().toISOString()}; }).sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt));
}
export async function uploadMedia(folder:MediaFolder,name:string,buffer:Buffer,mimeType:string){
  if(!isFirebaseStorageConfigured()){ requirePersistentStorage(); await ensureMediaFolders(); const target=path.join(uploadRoot,folder,name); await fs.writeFile(target,buffer); return; }
  const token=crypto.randomUUID(); const file=getAdminBucket().file(`media/${folder}/${name}`); await file.save(buffer,{resumable:false,contentType:mimeType,metadata:{metadata:{firebaseStorageDownloadTokens:token}}});
}
export async function deleteMedia(relativePath:string){
  const parts=relativePath.split("/").filter(Boolean); if(parts.length<2) throw new Error("Invalid media path.");
  if(isFirebaseStorageConfigured()){ await getAdminBucket().file(`media/${parts.join("/")}`).delete({ignoreNotFound:true}); return true; }
  await fs.unlink(safeResolveMediaPath(parts)); return true;
}
