import { NextResponse } from "next/server";
import { getHomepageContent, saveHomepageContent } from "@/lib/homepage-content";
import { isRequestAuthorized } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Locale = "ar" | "en";

function getLocale(request: Request): Locale {
  const value = new URL(request.url).searchParams.get("locale");
  return value === "en" ? "en" : "ar";
}

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const locale = getLocale(request);

  return NextResponse.json(
    { ok: true, locale, content: await getHomepageContent(locale) },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}

export async function PUT(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const locale = getLocale(request);
    const body = await request.json();
    const saved = await saveHomepageContent(body, locale);

    return NextResponse.json(
      { ok: true, locale, content: saved },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (error) {
    console.error("HOME_CONTENT_SAVE_FAILED", error);
    return NextResponse.json(
      { ok: false, message: "Unable to save homepage content. Check the submitted values." },
      { status: 400 }
    );
  }
}
