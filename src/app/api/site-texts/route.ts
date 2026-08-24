import { NextResponse } from "next/server";
import { getSiteTextDictionary, listSiteTexts, type SiteLocale } from "../../../lib/site-texts-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") === "en" ? "en" : "ar";
  const mode = url.searchParams.get("mode");

  if (mode === "items") {
    const items = await listSiteTexts();
    return NextResponse.json({ ok: true, locale, items });
  }

  const dictionary = await getSiteTextDictionary(locale as SiteLocale);
  return NextResponse.json({ ok: true, locale, dictionary });
}
