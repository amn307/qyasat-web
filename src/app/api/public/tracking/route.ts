import { NextResponse } from "next/server";
import { readSiteContent } from "@/lib/content/site-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const content = await readSiteContent();

  return NextResponse.json(
    { ok: true, tracking: content.tracking },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  );
}
