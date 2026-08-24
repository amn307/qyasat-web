import { NextResponse } from "next/server";
import { appendAnalyticsEvent } from "@/lib/analytics/store";
import type { AnalyticsEvent } from "@/lib/analytics/types";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as Partial<AnalyticsEvent> | null;
  if (!body?.sessionId || !body.visitorId || !body.type || !body.path) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const event: AnalyticsEvent = {
    sessionId: String(body.sessionId).slice(0,100), visitorId: String(body.visitorId).slice(0,100),
    type: String(body.type).slice(0,80), path: String(body.path).slice(0,500),
    title: body.title ? String(body.title).slice(0,300) : undefined,
    referrer: body.referrer ? String(body.referrer).slice(0,500) : undefined,
    locale: body.locale ? String(body.locale).slice(0,10) : undefined,
    durationMs: Math.max(0, Math.min(Number(body.durationMs || 0), 3600000)),
    metadata: body.metadata || {}, timestamp: new Date().toISOString(),
  };
  await appendAnalyticsEvent(event);
  return NextResponse.json({ ok: true });
}
