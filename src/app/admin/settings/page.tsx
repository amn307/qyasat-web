"use client";

import { useEffect, useState } from "react";
import { MediaUrlInput } from "@/components/admin/media-url-input";
import { adminFetch } from "@/lib/admin/client";

type SiteSettings = {
  brand: {
    logoUrl: string;
    logoAlt: string;
    faviconUrl: string;
    ogImageUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    addressAr: string;
    addressEn: string;
  };
  social: {
    instagram: string;
    x: string;
    linkedin: string;
    github: string;
    tiktok: string;
  };
};

const emptySettings: SiteSettings = {
  brand: {
    logoUrl: "",
    logoAlt: "قياسات",
    faviconUrl: "",
    ogImageUrl: "",
  },
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    addressAr: "",
    addressEn: "",
  },
  social: {
    instagram: "",
    x: "",
    linkedin: "",
    github: "",
    tiktok: "",
  },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(emptySettings);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    setStatus("جاري تحميل الإعدادات...");

    const res = await adminFetch("/api/admin/settings");

    if (!res.ok) {
      setStatus("فشل التحميل. سجّل الدخول مرة أخرى.");
      return;
    }

    const data = await res.json();
    setSettings(data.settings || emptySettings);
    setStatus("تم التحميل.");
  }

  async function saveContent() {
    setStatus("جاري الحفظ...");

    const res = await adminFetch("/api/admin/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ settings }),
    });

    if (!res.ok) {
      setStatus("فشل الحفظ.");
      return;
    }

    const data = await res.json();
    setSettings(data.settings || emptySettings);
    setStatus("تم حفظ الإعدادات.");
  }

  function update(section: keyof SiteSettings, key: string, value: string) {
    setSettings((old) => ({
      ...old,
      [section]: {
        ...old[section],
        [key]: value,
      },
    }));
  }

  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">إعدادات الموقع</h1>
        <p className="mt-3 text-slate-500">
          تحكم بالشعار، روابط الصور، بيانات التواصل، وروابط السوشال.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={loadContent} className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white">
            تحميل
          </button>
          <button onClick={saveContent} className="rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white">
            حفظ
          </button>
          <a href="/admin/media" className="rounded-2xl bg-blue-50 px-5 py-3 font-bold text-blue-700">
            رفع ملفات
          </a>
        </div>

        {status && <p className="mt-4 text-sm font-bold text-slate-500">{status}</p>}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">البراند والصور</h2>

          <div className="mt-5 grid gap-5">
            <MediaUrlInput
              label="الشعار"
              value={settings.brand.logoUrl}
              folder="logos"
              onChange={(value) => update("brand", "logoUrl", value)}
              placeholder="/media/logos/logo.webp"
            />

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-500">Alt Text للشعار</span>
              <input
                value={settings.brand.logoAlt}
                onChange={(e) => update("brand", "logoAlt", e.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>

            <MediaUrlInput
              label="Favicon"
              value={settings.brand.faviconUrl}
              folder="logos"
              onChange={(value) => update("brand", "faviconUrl", value)}
              placeholder="/media/logos/favicon.png"
            />

            <MediaUrlInput
              label="صورة Open Graph"
              value={settings.brand.ogImageUrl}
              folder="og"
              onChange={(value) => update("brand", "ogImageUrl", value)}
              placeholder="/media/og/og-image.webp"
            />
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">بيانات التواصل</h2>

          <div className="mt-5 grid gap-4">
            {[
              ["email", "Email"],
              ["phone", "Phone"],
              ["whatsapp", "WhatsApp"],
              ["addressAr", "العنوان العربي"],
              ["addressEn", "English Address"],
            ].map(([key, label]) => (
              <label key={key} className="grid gap-2">
                <span className="text-sm font-bold text-slate-500">{label}</span>
                <input
                  value={settings.contact[key as keyof SiteSettings["contact"]] || ""}
                  onChange={(e) => update("contact", key, e.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="text-xl font-black">روابط السوشال</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ["instagram", "Instagram"],
              ["x", "X"],
              ["linkedin", "LinkedIn"],
              ["github", "GitHub"],
              ["tiktok", "TikTok"],
            ].map(([key, label]) => (
              <label key={key} className="grid gap-2">
                <span className="text-sm font-bold text-slate-500">{label}</span>
                <input
                  value={settings.social[key as keyof SiteSettings["social"]] || ""}
                  onChange={(e) => update("social", key, e.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="https://..."
                />
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
