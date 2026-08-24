import { NextResponse } from "next/server";
import { createContactMessage } from "@/lib/contact/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const services = new Set([
  "business-development",
  "technical-marketing",
  "technical-development",
  "automation",
  "ai",
  "general",
]);

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "";
  return req.headers.get("x-real-ip") || "";
}

function clean(value: unknown, max = 1000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const website = clean(body?.website, 20);
    if (website) {
      return NextResponse.json({ ok: true });
    }

    const locale = body?.locale === "en" ? "en" : "ar";
    const name = clean(body?.name, 120);
    const phone = clean(body?.phone, 40);
    const email = clean(body?.email, 160);
    const service = services.has(body?.service) ? body.service : "general";
    const budget = clean(body?.budget, 120);
    const message = clean(body?.message, 3000);

    if (name.length < 2 || message.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid message.",
        },
        { status: 400 }
      );
    }

    const item = await createContactMessage({
      locale,
      name,
      phone,
      email,
      service,
      budget,
      message,
      ip: getClientIp(req),
      userAgent: req.headers.get("user-agent") || "",
    });

    return NextResponse.json({
      ok: true,
      id: item.id,
      message: "Contact message received.",
    });
  } catch (error) {
    console.error("CONTACT_POST_ERROR", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to submit contact message.",
      },
      { status: 500 }
    );
  }
}
