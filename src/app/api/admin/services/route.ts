import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import { readServices, saveServices, type ServiceItem } from "@/lib/services-content";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, items: await readServices() });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ ok: false, error: "Invalid services payload" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, items: await saveServices(body.items as ServiceItem[]) });
}
