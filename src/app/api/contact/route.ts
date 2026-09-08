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

const serviceLabels: Record<string, string> = {
  "business-development": "Business Development",
  "technical-marketing": "Technical Marketing",
  "technical-development": "Technical Development",
  automation: "Automation",
  ai: "AI",
  general: "General Enquiry",
};

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "";
  return req.headers.get("x-real-ip") || "";
}

function clean(value: unknown, max = 1000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendContactEmail(input: {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  locale: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const to = process.env.CONTACT_TO_EMAIL || "info@qyasat.sa";
  const from = process.env.CONTACT_FROM_EMAIL || "Qyasat Website <website@qyasat.sa>";
  const serviceLabel = serviceLabels[input.service] || input.service;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email || undefined,
      subject: `New Qyasat enquiry — ${input.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>New website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(input.phone || "Not provided")}</p>
          <p><strong>Email:</strong> ${escapeHtml(input.email || "Not provided")}</p>
          <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
          <p><strong>Budget / Scope:</strong> ${escapeHtml(input.budget || "Not provided")}</p>
          <p><strong>Language:</strong> ${escapeHtml(input.locale.toUpperCase())}</p>
          <hr />
          <p><strong>Project details</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Contact email failed (${response.status}): ${details}`);
  }
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
        { ok: false, error: "Invalid message." },
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

    await sendContactEmail({ name, phone, email, service, budget, message, locale });

    return NextResponse.json({
      ok: true,
      id: item.id,
      message: "Contact message received and emailed.",
    });
  } catch (error) {
    console.error("CONTACT_POST_ERROR", error);

    return NextResponse.json(
      { ok: false, error: "Failed to submit contact message." },
      { status: 500 }
    );
  }
}
