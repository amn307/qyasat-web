import { NextResponse } from "next/server";
import { createAdminAccessToken, getAuthorizedAdminEmail, isRequestAuthorized, verifyFirebaseAdminCredentials } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return NextResponse.json({ ok: true, authenticated: isRequestAuthorized(req), email: getAuthorizedAdminEmail(req) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password) return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });

  try {
    const user = await verifyFirebaseAdminCredentials(email, password);
    if (!user) return NextResponse.json({ ok: false, error: "Invalid Firebase admin credentials." }, { status: 401 });
    return NextResponse.json({ ok: true, username: user.email, email: user.email, accessToken: createAdminAccessToken(user.email) });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Firebase login failed." }, { status: 500 });
  }
}
