import { NextResponse } from "next/server";
import { getProjectsContent, saveProjectsContent } from "@/lib/projects-content";
import { isRequestAuthorized } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Locale = "ar" | "en";
function localeFrom(request: Request): Locale {
  return new URL(request.url).searchParams.get("locale") === "en" ? "en" : "ar";
}

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const locale = localeFrom(request);
  return NextResponse.json({ ok: true, locale, content: await getProjectsContent(locale) }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!isRequestAuthorized(request)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  try {
    const locale = localeFrom(request);
    const content = await saveProjectsContent(await request.json(), locale);
    return NextResponse.json({ ok: true, locale, content }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("PROJECTS_CONTENT_SAVE_FAILED", error);
    return NextResponse.json({ ok: false, message: "Unable to save projects content." }, { status: 400 });
  }
}
