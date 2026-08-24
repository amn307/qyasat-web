import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import {
  deleteSiteText,
  listSiteTexts,
  resetSiteTextsDefaults,
  upsertSiteText,
} from "../../../../lib/site-texts-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const items = await listSiteTexts();
  return NextResponse.json({ ok: true, items });
}

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const payload = await request.json().catch(() => ({}));

  try {
    if (payload?.action === "reset-defaults") {
      const items = await resetSiteTextsDefaults();
      return NextResponse.json({ ok: true, items });
    }

    const item = await upsertSiteText(payload);
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "UNKNOWN_ERROR" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!isRequestAuthorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const payload = await request.json().catch(() => ({}));
  const result = await deleteSiteText(payload?.key || "");
  return NextResponse.json({ ok: true, ...result });
}
