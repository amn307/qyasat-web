import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import { readSiteContent, writeSiteContent } from "@/lib/content/site-content";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const content = await readSiteContent();

  return NextResponse.json({
    ok: true,
    content,
  });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const content = await writeSiteContent(body);

  return NextResponse.json({
    ok: true,
    content,
  });
}
