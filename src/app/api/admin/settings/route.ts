import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import { readSiteSettings, saveSiteSettings } from "@/lib/site-settings";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, settings: await readSiteSettings() });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || !("settings" in body)) {
    return NextResponse.json({ ok: false, error: "Invalid settings payload" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, settings: await saveSiteSettings(body.settings) });
}
