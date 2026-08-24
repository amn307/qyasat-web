import fs from "node:fs/promises";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import crypto from "node:crypto";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { requirePersistentStorage } from "@/lib/firebase/cms-store";

export type Locale = "ar" | "en";
export type BlogStatus = "draft" | "published";

export type BlogPost = {
  id: string; slug: string; status: BlogStatus;
  title: Record<Locale, string>; excerpt: Record<Locale, string>; body: Record<Locale, string>;
  coverImageUrl: string; category: string; tags: string[]; author: string;
  seoTitle: Record<Locale, string>; seoDescription: Record<Locale, string>;
  ogImageUrl: string; publishedAt: string; createdAt: string; updatedAt: string;
};

const postsPath = runtimeStoragePath("storage", "private", "blog-posts.json");
const collectionName = "blog_posts";

export function slugify(input: string) {
  return input.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 90);
}

function normalizePost(input: Partial<BlogPost>): BlogPost {
  const now = new Date().toISOString();
  return {
    id: input.id || crypto.randomBytes(10).toString("hex"),
    slug: input.slug || `post-${Date.now()}`,
    status: input.status === "published" ? "published" : "draft",
    title: { ar: input.title?.ar || "", en: input.title?.en || "" },
    excerpt: { ar: input.excerpt?.ar || "", en: input.excerpt?.en || "" },
    body: { ar: input.body?.ar || "", en: input.body?.en || "" },
    coverImageUrl: input.coverImageUrl || "", category: input.category || "",
    tags: Array.isArray(input.tags) ? input.tags.filter(Boolean) : [], author: input.author || "قياسات",
    seoTitle: { ar: input.seoTitle?.ar || input.title?.ar || "", en: input.seoTitle?.en || input.title?.en || "" },
    seoDescription: { ar: input.seoDescription?.ar || input.excerpt?.ar || "", en: input.seoDescription?.en || input.excerpt?.en || "" },
    ogImageUrl: input.ogImageUrl || input.coverImageUrl || "",
    publishedAt: input.publishedAt || now, createdAt: input.createdAt || now, updatedAt: input.updatedAt || now,
  };
}

async function readLocal(): Promise<BlogPost[]> {
  try { return JSON.parse(await fs.readFile(postsPath, "utf8")).map(normalizePost); } catch { return []; }
}
async function writeLocal(posts: BlogPost[]) {
  requirePersistentStorage();
  await fs.mkdir(path.dirname(postsPath), { recursive: true });
  await fs.writeFile(postsPath, JSON.stringify(posts, null, 2) + "\n", "utf8");
}
async function readAll(): Promise<BlogPost[]> {
  const localPosts = await readLocal();
  if (!isFirebaseAdminConfigured()) return localPosts;
  try {
    const db = getAdminDb();
    const snap = await db.collection(collectionName).get();
    const firebasePosts = snap.docs.map((doc) => normalizePost({ id: doc.id, ...(doc.data() as Partial<BlogPost>) }));
    if (firebasePosts.length > 0) return firebasePosts;

    if (localPosts.length > 0) {
      const batch = db.batch();
      for (const post of localPosts) batch.set(db.collection(collectionName).doc(post.id), post, { merge: true });
      await batch.commit();
    }
    return localPosts;
  } catch (error) {
    console.error("BLOG_FIREBASE_READ_FAILED", error);
    return localPosts;
  }
}
async function saveOne(post: BlogPost) {
  if (!isFirebaseAdminConfigured()) {
    const posts = await readLocal(); const index = posts.findIndex((p) => p.id === post.id);
    if (index >= 0) posts[index] = post; else posts.unshift(post); await writeLocal(posts); return;
  }
  await getAdminDb().collection(collectionName).doc(post.id).set(post, { merge: true });
}
async function uniqueSlug(base: string, posts: BlogPost[], currentId?: string) {
  const clean = slugify(base) || `post-${Date.now()}`; let slug = clean; let i = 2;
  while (posts.some((p) => p.slug === slug && p.id !== currentId)) slug = `${clean}-${i++}`;
  return slug;
}

export async function listBlogPosts(options?: { includeDrafts?: boolean }) {
  const posts = await readAll();
  return (options?.includeDrafts ? posts : posts.filter((p) => p.status === "published"))
    .sort((a,b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
}
export async function getBlogPostBySlug(slug: string, options?: { includeDrafts?: boolean }) {
  const post = (await readAll()).find((p) => p.slug === slug);
  return post && (options?.includeDrafts || post.status === "published") ? post : null;
}
export async function createBlogPost(input: Partial<BlogPost>) {
  const posts = await readAll(); const now = new Date().toISOString();
  const post = normalizePost({ ...input, id: crypto.randomBytes(10).toString("hex"), slug: await uniqueSlug(input.slug || input.title?.en || input.title?.ar || "new-post", posts), createdAt: now, updatedAt: now, publishedAt: input.publishedAt || now });
  await saveOne(post); return post;
}
export async function updateBlogPost(id: string, patch: Partial<BlogPost>) {
  const posts = await readAll(); const current = posts.find((p) => p.id === id); if (!current) throw new Error("Post not found.");
  const next = normalizePost({ ...current, ...patch, id, slug: patch.slug ? await uniqueSlug(patch.slug, posts, id) : current.slug,
    title: { ...current.title, ...(patch.title || {}) }, excerpt: { ...current.excerpt, ...(patch.excerpt || {}) }, body: { ...current.body, ...(patch.body || {}) },
    seoTitle: { ...current.seoTitle, ...(patch.seoTitle || {}) }, seoDescription: { ...current.seoDescription, ...(patch.seoDescription || {}) },
    tags: Array.isArray(patch.tags) ? patch.tags : current.tags, updatedAt: new Date().toISOString() });
  await saveOne(next); return next;
}
export async function deleteBlogPost(id: string) {
  if (isFirebaseAdminConfigured()) { await getAdminDb().collection(collectionName).doc(id).delete(); return true; }
  const posts = await readLocal(); const next = posts.filter((p) => p.id !== id); if (next.length === posts.length) throw new Error("Post not found."); await writeLocal(next); return true;
}
