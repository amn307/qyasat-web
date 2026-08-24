import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import { listSeoPages, saveSeoPage } from "@/lib/seo/pages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, items: await listSeoPages() });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.locale || !body?.pageKey) return NextResponse.json({ ok: false, error: "Locale and page are required." }, { status: 400 });
  try {
    const item = await saveSeoPage(body);
    return NextResponse.json({ ok: true, item, items: await listSeoPages() });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unable to save SEO." }, { status: 400 });
  }
}
