import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import { readSiteTheme, writeSiteTheme } from "@/lib/theme/site-theme";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const theme = await readSiteTheme();

  return NextResponse.json({
    ok: true,
    theme,
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

  const theme = await writeSiteTheme(body);

  return NextResponse.json({
    ok: true,
    theme,
  });
}
