import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SESSION_SECRET is required in production.");
  }
  return secret || "dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function allowedAdminEmails() {
  return (process.env.FIREBASE_ADMIN_EMAILS || "")
    .split(",")
    .map((value: string) => value.trim().toLowerCase())
    .filter(Boolean);
}

export async function verifyFirebaseAdminCredentials(email: string, password: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  if (!apiKey) throw new Error("NEXT_PUBLIC_FIREBASE_API_KEY is not configured.");

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.idToken || !data?.email) return null;

  const normalizedEmail = String(data.email).toLowerCase();
  const allowlist = allowedAdminEmails();
  if (allowlist.length > 0 && !allowlist.includes(normalizedEmail)) return null;

  return { email: normalizedEmail, uid: String(data.localId || ""), idToken: String(data.idToken) };
}

export function createAdminAccessToken(email: string) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const encodedEmail = Buffer.from(email).toString("base64url");
  const payload = `admin.${encodedEmail}.${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminAccessToken(token?: string | null) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [role, encodedEmail, issuedAtRaw, signature] = parts;
  if (role !== "admin") return false;
  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt)) return false;
  if (Math.floor(Date.now() / 1000) - issuedAt > MAX_AGE_SECONDS) return false;
  return safeEqual(signature, sign(`${role}.${encodedEmail}.${issuedAtRaw}`));
}

export function getAdminEmailFromToken(token?: string | null) {
  if (!verifyAdminAccessToken(token)) return "";
  try { return Buffer.from(token!.split(".")[1], "base64url").toString("utf8"); } catch { return ""; }
}

function getBearerToken(req: Request) {
  const authorization = req.headers.get("authorization") || "";
  return authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
}

export function isRequestAuthorized(req: Request) {
  return verifyAdminAccessToken(getBearerToken(req));
}

export function getAuthorizedAdminEmail(req: Request) {
  return getAdminEmailFromToken(getBearerToken(req));
}
