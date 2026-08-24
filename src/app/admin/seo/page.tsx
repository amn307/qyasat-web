"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MediaUrlInput } from "@/components/admin/media-url-input";
import { adminFetch } from "@/lib/admin/client";

type Locale = "ar" | "en";
type PageKey = "home" | "services" | "blog" | "contact";
type Robots = "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow";

type SeoPage = {
  id: string;
  pageKey: PageKey;
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robots: Robots;
  schemaJson: string;
  isActive: boolean;
  updatedAt: string;
};

const pages: Array<{ key: PageKey; ar: string; en: string }> = [
  { key: "home", ar: "الصفحة الرئيسية", en: "Homepage" },
  { key: "services", ar: "الخدمات", en: "Services" },
  { key: "blog", ar: "المدونة", en: "Blog" },
  { key: "contact", ar: "تواصل معنا", en: "Contact" },
];

const copy = {
  ar: {
    title: "إدارة SEO",
    description: "تحكم في ظهور الصفحات على Google ومعاينات WhatsApp وLinkedIn وX لكل لغة وصفحة.",
    refresh: "تحديث",
    save: "حفظ",
    saving: "جاري الحفظ...",
    loading: "جاري تحميل إعدادات SEO...",
    loaded: "تم تحميل إعدادات SEO.",
    loadError: "فشل تحميل إعدادات SEO.",
    saveError: "فشل حفظ SEO.",
    saved: "تم حفظ SEO وتطبيقه على الموقع.",
    language: "اللغة",
    page: "الصفحة",
    arabic: "العربية",
    english: "English",
    enableSeo: "تفعيل SEO",
    googleTitle: "عنوان Google",
    googleDescription: "وصف Google",
    keywords: "الكلمات المستهدفة (افصل بينها بفاصلة)",
    canonical: "Canonical URL",
    socialTitle: "عنوان المشاركة الاجتماعية",
    socialDescription: "وصف المشاركة الاجتماعية",
    socialImage: "صورة المشاركة الاجتماعية",
    searchVisibility: "ظهور محركات البحث",
    schema: "Schema JSON-LD (اختياري)",
    googlePreview: "معاينة Google",
    socialPreview: "معاينة المشاركة",
    previewTitle: "عنوان الصفحة",
    previewDescription: "وصف الصفحة سيظهر هنا.",
    ogImage: "صورة OG",
    notes: "ملاحظات",
    notesBody: "اجعل العنوان والوصف مختلفين لكل صفحة. استخدم صورة بنسبة تقريبية 1.91:1 للمشاركة، ولا تستخدم noindex للصفحات التي تريد ظهورها في Google.",
    loadingPage: "جاري تحميل بيانات الصفحة...",
    robots: {
      "index,follow": "السماح بالفهرسة وتتبع الروابط",
      "noindex,follow": "منع الفهرسة مع تتبع الروابط",
      "index,nofollow": "السماح بالفهرسة دون تتبع الروابط",
      "noindex,nofollow": "منع الفهرسة وعدم تتبع الروابط",
    },
  },
  en: {
    title: "SEO Management",
    description: "Control how every page appears on Google and in WhatsApp, LinkedIn, and X previews for each language.",
    refresh: "Refresh",
    save: "Save",
    saving: "Saving...",
    loading: "Loading SEO settings...",
    loaded: "SEO settings loaded.",
    loadError: "Failed to load SEO settings.",
    saveError: "Failed to save SEO settings.",
    saved: "SEO settings saved and applied to the website.",
    language: "Content Language",
    page: "Page",
    arabic: "Arabic",
    english: "English",
    enableSeo: "Enable SEO",
    googleTitle: "Google Title",
    googleDescription: "Google Description",
    keywords: "Target Keywords (separate with commas)",
    canonical: "Canonical URL",
    socialTitle: "Social Sharing Title",
    socialDescription: "Social Sharing Description",
    socialImage: "Social Sharing Image",
    searchVisibility: "Search Visibility",
    schema: "Schema JSON-LD (optional)",
    googlePreview: "Google Preview",
    socialPreview: "Social Preview",
    previewTitle: "Page title",
    previewDescription: "The page description will appear here.",
    ogImage: "OG Image",
    notes: "Notes",
    notesBody: "Use a unique title and description for every page. Use an image close to a 1.91:1 ratio for sharing, and do not use noindex on pages that should appear in Google.",
    loadingPage: "Loading page data...",
    robots: {
      "index,follow": "Allow indexing and follow links",
      "noindex,follow": "Block indexing but follow links",
      "index,nofollow": "Allow indexing but do not follow links",
      "noindex,nofollow": "Block indexing and do not follow links",
    },
  },
} as const;

export default function AdminSeoPage() {
  const searchParams = useSearchParams();
  const uiLocale: Locale = searchParams.get("lang") === "en" ? "en" : "ar";
  const t = copy[uiLocale];
  const isRtl = uiLocale === "ar";

  const [items, setItems] = useState<SeoPage[]>([]);
  const [locale, setLocale] = useState<Locale>(uiLocale);
  const [pageKey, setPageKey] = useState<PageKey>("home");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocale(uiLocale);
  }, [uiLocale]);

  const current = useMemo(
    () => items.find((item) => item.locale === locale && item.pageKey === pageKey),
    [items, locale, pageKey],
  );

  const load = useCallback(async () => {
    setStatus(t.loading);
    const res = await adminFetch("/api/admin/seo");
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setStatus(data?.error || t.loadError);
      return;
    }
    setItems(data.items || []);
    setStatus(t.loaded);
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  function update(patch: Partial<SeoPage>) {
    setItems((old) => old.map((item) => (item.id === current?.id ? { ...item, ...patch } : item)));
  }

  async function save() {
    if (!current) return;
    setSaving(true);
    setStatus(t.saving);
    const res = await adminFetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(current),
    });
    const data = await res.json().catch(() => null);
    setSaving(false);
    if (!res.ok) {
      setStatus(data?.error || t.saveError);
      return;
    }
    setItems(data.items || items);
    setStatus(t.saved);
  }

  const pageLabel = pages.find((page) => page.key === pageKey);

  return (
    <div dir="rtl" lang={uiLocale} className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-3xl font-black">{t.title}</h1>
            <p className="mt-3 max-w-3xl text-slate-500">{t.description}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => void load()} className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700">
              {t.refresh}
            </button>
            <button onClick={() => void save()} disabled={!current || saving} className="rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white disabled:opacity-50">
              {saving ? t.saving : t.save}
            </button>
          </div>
        </div>
        {status && <p className="mt-4 text-sm font-bold text-slate-500">{status}</p>}
      </section>

      <section className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-500">{t.language}</span>
          <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)} className="rounded-2xl border border-slate-200 px-4 py-3">
            <option value="ar">{t.arabic}</option>
            <option value="en">{t.english}</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-500">{t.page}</span>
          <select value={pageKey} onChange={(e) => setPageKey(e.target.value as PageKey)} className="rounded-2xl border border-slate-200 px-4 py-3">
            {pages.map((page) => (
              <option key={page.key} value={page.key}>{page[uiLocale]}</option>
            ))}
          </select>
        </label>
      </section>

      {current ? (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">{pageLabel ? pageLabel[uiLocale] : pageKey}</h2>
                <p dir="ltr" className={isRtl ? "mt-1 text-right text-sm text-slate-500" : "mt-1 text-left text-sm text-slate-500"}>{current.path}</p>
              </div>
              <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 font-bold">
                <input type="checkbox" checked={current.isActive} onChange={(e) => update({ isActive: e.target.checked })} />
                {t.enableSeo}
              </label>
            </div>

            <div className="grid gap-5">
              <Field label={t.googleTitle} value={current.title} onChange={(value) => update({ title: value })} count max={60} dir={locale === "ar" ? "rtl" : "ltr"} />
              <Field label={t.googleDescription} value={current.description} onChange={(value) => update({ description: value })} textarea count max={160} dir={locale === "ar" ? "rtl" : "ltr"} />
              <Field label={t.keywords} value={current.keywords.join(", ")} onChange={(value) => update({ keywords: value.split(",").map((word) => word.trim()).filter(Boolean) })} dir={locale === "ar" ? "rtl" : "ltr"} />
              <Field label={t.canonical} value={current.canonical} onChange={(value) => update({ canonical: value })} dir="ltr" />
              <hr className="border-slate-100" />
              <Field label={t.socialTitle} value={current.ogTitle} onChange={(value) => update({ ogTitle: value })} count max={60} dir={locale === "ar" ? "rtl" : "ltr"} />
              <Field label={t.socialDescription} value={current.ogDescription} onChange={(value) => update({ ogDescription: value })} textarea count max={160} dir={locale === "ar" ? "rtl" : "ltr"} />
              <MediaUrlInput label={t.socialImage} value={current.ogImage} onChange={(value) => update({ ogImage: value })} folder="og" placeholder="https://.../seo-image.webp" />
              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-500">{t.searchVisibility}</span>
                <select value={current.robots} onChange={(e) => update({ robots: e.target.value as Robots })} className="rounded-2xl border border-slate-200 px-4 py-3">
                  {(Object.keys(t.robots) as Robots[]).map((value) => <option key={value} value={value}>{t.robots[value]}</option>)}
                </select>
              </label>
              <Field label={t.schema} value={current.schemaJson} onChange={(value) => update({ schemaJson: value })} textarea rows={8} dir="ltr" />
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black">{t.googlePreview}</h2>
              <div dir={locale === "ar" ? "rtl" : "ltr"} className="mt-5 rounded-2xl border border-slate-200 p-5">
                <p dir="ltr" className="truncate text-left text-sm text-emerald-700">{current.canonical}</p>
                <h3 className="mt-2 text-xl text-blue-700">{current.title || t.previewTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{current.description || t.previewDescription}</p>
              </div>
            </section>
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black">{t.socialPreview}</h2>
              <div dir={locale === "ar" ? "rtl" : "ltr"} className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                {current.ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={current.ogImage} alt="Social preview" className="aspect-[1.91/1] w-full object-cover" />
                ) : (
                  <div className="grid aspect-[1.91/1] place-items-center bg-slate-100 text-sm font-bold text-slate-400">{t.ogImage}</div>
                )}
                <div className="p-4">
                  <p dir="ltr" className="text-left text-xs uppercase text-slate-400">qyasat.sa</p>
                  <h3 className="mt-1 font-black">{current.ogTitle || current.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{current.ogDescription || current.description}</p>
                </div>
              </div>
            </section>
            <section className="rounded-3xl bg-amber-50 p-6 text-sm leading-7 text-amber-900">
              <h2 className="font-black">{t.notes}</h2>
              <p className="mt-2">{t.notesBody}</p>
            </section>
          </aside>
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">{t.loadingPage}</div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  count = false,
  max,
  rows = 3,
  dir,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  count?: boolean;
  max?: number;
  rows?: number;
  dir?: "rtl" | "ltr";
}) {
  const inputClass = "rounded-2xl border border-slate-200 px-4 py-3";
  return (
    <label className="grid gap-2">
      <span className="flex justify-between gap-3 text-sm font-bold text-slate-500">
        <span>{label}</span>
        {count && <span dir="ltr" className={max && value.length > max ? "text-red-600" : "text-slate-400"}>{value.length}{max ? ` / ${max}` : ""}</span>}
      </span>
      {textarea ? (
        <textarea dir={dir} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={inputClass} />
      ) : (
        <input dir={dir} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </label>
  );
}
