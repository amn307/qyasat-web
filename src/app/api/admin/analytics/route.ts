import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import { buildAnalyticsReport, readAnalyticsEvents } from "@/lib/analytics/store";
export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ok:false},{status:401});
  const url = new URL(req.url); const days = Math.min(365, Math.max(1, Number(url.searchParams.get("days") || 30)));
  return NextResponse.json({ok:true, report: buildAnalyticsReport(await readAnalyticsEvents(), days)});
}
