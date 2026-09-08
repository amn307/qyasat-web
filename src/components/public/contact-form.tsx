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
    name: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    service: "الخدمة المطلوبة",
    budget: "الميزانية أو نطاق المشروع",
    message: "تفاصيل المشروع",
    messagePlaceholder: "اكتب لنا التفاصيل والتوضيحات التي تساعدنا على فهم احتياجك بشكل أفضل.",
    selectService: "اختر الخدمة",
    submit: "إرسال الطلب",
    sending: "جاري الإرسال...",
    success: "تم استلام طلبك بنجاح. سنتواصل معك قريباً.",
    error: "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.",
  },
  en: {
    name: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    service: "Required Service",
    budget: "Budget or Project Scope",
    message: "Project Details",
    messagePlaceholder: "Share the details and context that will help us understand your project better.",
    selectService: "Select service",
    submit: "Send Request",
    sending: "Sending...",
    success: "Your request has been received. We’ll contact you soon.",
    error: "We couldn’t send your request. Please try again.",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const t = text[locale];
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    locale,
    name: "",
    phone: "",
    email: "",
    service: "",
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
    setStatusType("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, locale }),
      });

      if (!res.ok) {
        throw new Error(t.error);
      }

      setForm({
        locale,
        name: "",
        phone: "",
        email: "",
        service: "",
        budget: "",
        message: "",
        website: "",
      });
      setStatus(t.success);
      setStatusType("success");
    } catch {
      setStatus(t.error);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full min-w-0 rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-4 py-3.5 text-base text-[var(--qyasat-text)] outline-none transition focus:border-[var(--qyasat-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--qyasat-primary)_10%,transparent)]";
  const labelClass =
    "mb-2 block text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--qyasat-muted)]";

  return (
    <form
      onSubmit={submit}
      className="relative rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-6 shadow-[0_22px_70px_color-mix(in_srgb,var(--qyasat-text)_6%,transparent)] sm:p-8"
    >
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>{t.name}</span>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
          />
        </label>

        <label>
          <span className={labelClass}>{t.phone}</span>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            type="tel"
            className={fieldClass}
          />
        </label>

        <label>
          <span className={labelClass}>{t.email}</span>
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            type="email"
            className={fieldClass}
          />
        </label>

        <label>
          <span className={labelClass}>{t.service}</span>
          <select
            required
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={fieldClass}
          >
            <option value="" disabled>
              {t.selectService}
            </option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option[locale]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className={labelClass}>{t.budget}</span>
        <input
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="mt-5 block">
        <span className={labelClass}>{t.message}</span>
        <textarea
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={7}
          placeholder={t.messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
      </label>

      <button
        disabled={loading}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[var(--qyasat-button-radius)] bg-[var(--qyasat-primary)] px-7 py-3 text-sm font-black text-[var(--qyasat-primary-text)] shadow-[0_14px_32px_color-mix(in_srgb,var(--qyasat-primary)_18%,transparent)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? t.sending : t.submit}
      </button>

      {status && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 text-sm font-bold ${
            statusType === "error" ? "text-red-700" : statusType === "success" ? "text-green-700" : "text-[var(--qyasat-muted)]"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
}
