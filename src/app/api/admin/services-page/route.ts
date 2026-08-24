import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import { readServicesPageItems, saveServicesPageItems, type ServicePageItem } from "@/lib/services-page-content";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, items: await readServicesPageItems() });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ ok: false, error: "Invalid services page payload" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, items: await saveServicesPageItems(body.items as ServicePageItem[]) });
}
