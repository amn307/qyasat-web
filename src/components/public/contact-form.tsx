"use client";

import { useState } from "react";
import type { Locale } from "@/lib/config/locales";

const serviceOptions = [
  { value: "business-development", ar: "تطوير أعمال", en: "Business Development" },
  { value: "technical-marketing", ar: "حلول تسويقية تقنية", en: "Technical Marketing" },
  { value: "technical-development", ar: "تطوير تقني", en: "Technical Development" },
  { value: "automation", ar: "أتمتة", en: "Automation" },
  { value: "ai", ar: "ذكاء اصطناعي", en: "Artificial Intelligence" },
  { value: "general", ar: "عام", en: "General" },
];

const text = {
  ar: {
    name: "الاسم",
    phone: "الجوال",
    email: "البريد الإلكتروني",
    service: "الخدمة",
    budget: "الميزانية أو نطاق المشروع",
    message: "رسالتك",
    submit: "إرسال الرسالة",
    sending: "جاري الإرسال...",
    success: "تم استلام رسالتك بنجاح.",
    error: "تعذر إرسال الرسالة.",
  },
  en: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    service: "Service",
    budget: "Budget or project scope",
    message: "Message",
    submit: "Send message",
    sending: "Sending...",
    success: "Your message has been received.",
    error: "Failed to send message.",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const t = text[locale];
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    locale,
    name: "",
    phone: "",
    email: "",
    service: "general",
    budget: "",
    message: "",
    website: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((old) => ({ ...old, [key]: value }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus(t.sending);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, locale }),
    });

    setLoading(false);

    if (!res.ok) {
      setStatus(t.error);
      return;
    }

    setForm({
      locale,
      name: "",
      phone: "",
      email: "",
      service: "general",
      budget: "",
      message: "",
      website: "",
    });
    setStatus(t.success);
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-4 rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-6">
      <input
        value={form.website}
        onChange={(e) => update("website", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--qyasat-muted)]">{t.name}</span>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-4 py-3 text-[var(--qyasat-text)] outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--qyasat-muted)]">{t.phone}</span>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-4 py-3 text-[var(--qyasat-text)] outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--qyasat-muted)]">{t.email}</span>
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            type="email"
            className="rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-4 py-3 text-[var(--qyasat-text)] outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--qyasat-muted)]">{t.service}</span>
          <select
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className="rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-4 py-3 text-[var(--qyasat-text)] outline-none"
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option[locale]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-bold text-[var(--qyasat-muted)]">{t.budget}</span>
        <input
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
          className="rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-4 py-3 text-[var(--qyasat-text)] outline-none"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-bold text-[var(--qyasat-muted)]">{t.message}</span>
        <textarea
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={6}
          className="rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-4 py-3 text-[var(--qyasat-text)] outline-none"
        />
      </label>

      <button
        disabled={loading}
        className="rounded-[var(--qyasat-button-radius)] bg-[var(--qyasat-primary)] px-7 py-3 text-sm font-black text-[var(--qyasat-primary-text)] disabled:opacity-50"
      >
        {loading ? t.sending : t.submit}
      </button>

      {status && <p className="text-sm font-bold text-[var(--qyasat-muted)]">{status}</p>}
    </form>
  );
}
