import { NextResponse } from "next/server";
import { getAuthorizedAdminEmail, isRequestAuthorized } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, email: getAuthorizedAdminEmail(req) });
}

export async function POST() {
  return NextResponse.json({ ok: false, error: "Manage admin users in Firebase Authentication." }, { status: 409 });
}
