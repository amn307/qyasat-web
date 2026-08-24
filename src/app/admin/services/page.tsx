"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

type HomepageServiceItem = {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  tag: { ar: string; en: string };
  icon: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
};

type ServiceVisual = "automation" | "profile" | "content" | "brand" | "social" | "seo" | "saas" | "ads" | "strategy" | "hosting" | "marketing";

type ServicePageItem = {
  id: string;
  category: { ar: string; en: string };
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  features: { ar: string[]; en: string[] };
  visual: ServiceVisual;
  isActive: boolean;
  order: number;
};

type Mode = "services-page" | "homepage";

const visualOptions: { value: ServiceVisual; label: string }[] = [
  { value: "profile", label: "Company profile" },
  { value: "content", label: "Website / CMS" },
  { value: "brand", label: "Brand identity" },
  { value: "social", label: "Social media" },
  { value: "seo", label: "SEO" },
  { value: "ads", label: "Paid advertising" },
  { value: "strategy", label: "Strategy" },
  { value: "marketing", label: "Marketing content" },
  { value: "automation", label: "Automation" },
  { value: "saas", label: "Software / SaaS" },
  { value: "hosting", label: "Hosting" },
];

function linesToArray(value: string) {
  return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
}

export default function AdminServicesPage() {
  const [mode, setMode] = useState<Mode>("services-page");
  const [pageItems, setPageItems] = useState<ServicePageItem[]>([]);
  const [homepageItems, setHomepageItems] = useState<HomepageServiceItem[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const endpoint = mode === "services-page" ? "/api/admin/services-page" : "/api/admin/services";

  const loadContent = useCallback(async () => {
    setBusy(true);
    setStatus("جاري التحميل...");
    try {
      const res = await adminFetch(endpoint, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "فشل التحميل.");
      if (mode === "services-page") setPageItems(data.items || []);
      else setHomepageItems(data.items || []);
      setStatus(mode === "services-page" ? "تم تحميل محتوى صفحة الخدمات." : "تم تحميل خدمات الصفحة الرئيسية.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "فشل التحميل.");
    } finally {
      setBusy(false);
    }
  }, [endpoint, mode]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  async function saveContent() {
    setBusy(true);
    setStatus("جاري الحفظ...");
    try {
      const items = mode === "services-page" ? pageItems : homepageItems;
      const res = await adminFetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "فشل الحفظ.");
      if (mode === "services-page") setPageItems(data.items || []);
      else setHomepageItems(data.items || []);
      setStatus(mode === "services-page" ? "تم الحفظ. التغييرات ظاهرة في /ar/services و /en/services." : "تم حفظ خدمات الصفحة الرئيسية.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "فشل الحفظ.");
    } finally {
      setBusy(false);
    }
  }

  const sortedPageItems = useMemo(() => pageItems.map((item, index) => ({ item, index })).sort((a, b) => a.item.order - b.item.order), [pageItems]);
  const sortedHomepageItems = useMemo(() => homepageItems.map((item, index) => ({ item, index })).sort((a, b) => a.item.order - b.item.order), [homepageItems]);

  function updatePage(index: number, patch: Partial<ServicePageItem>) {
    setPageItems((old) => old.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function updateHomepage(index: number, patch: Partial<HomepageServiceItem>) {
    setHomepageItems((old) => old.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function addPageService() {
    const count = pageItems.length + 1;
    setPageItems((old) => [...old, {
      id: `service-${Date.now()}`,
      category: { ar: "تصنيف الخدمة", en: "SERVICE CATEGORY" },
      title: { ar: "خدمة جديدة", en: "New Service" },
      description: { ar: "وصف الخدمة", en: "Service description" },
      features: { ar: ["ميزة 1"], en: ["Feature 1"] },
      visual: "content",
      isActive: true,
      order: count,
    }]);
  }

  function addHomepageService() {
    const count = homepageItems.length + 1;
    setHomepageItems((old) => [...old, {
      id: `service-${Date.now()}`,
      title: { ar: "خدمة جديدة", en: "New Service" },
      description: { ar: "وصف الخدمة", en: "Service description" },
      tag: { ar: "", en: "" },
      icon: String(count).padStart(2, "0"),
      imageUrl: "",
      isActive: true,
      order: count,
    }]);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">إدارة الخدمات</h1>
        <p className="mt-3 text-slate-500">تحكم في صفحة الخدمات الكاملة أو بطاقات الخدمات المختصرة في الصفحة الرئيسية، مع حفظ البيانات في Firebase عند تفعيله.</p>

        <div className="mt-6 flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5">
          <button onClick={() => setMode("services-page")} className={`rounded-xl px-5 py-2.5 font-bold ${mode === "services-page" ? "bg-slate-950 text-white" : "text-slate-600"}`}>صفحة الخدمات</button>
          <button onClick={() => setMode("homepage")} className={`rounded-xl px-5 py-2.5 font-bold ${mode === "homepage" ? "bg-slate-950 text-white" : "text-slate-600"}`}>خدمات الصفحة الرئيسية</button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button disabled={busy} onClick={() => void loadContent()} className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white disabled:opacity-50">تحميل</button>
          <button disabled={busy} onClick={mode === "services-page" ? addPageService : addHomepageService} className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white disabled:opacity-50">إضافة خدمة</button>
          <button disabled={busy} onClick={() => void saveContent()} className="rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white disabled:opacity-50">{busy ? "انتظر..." : "حفظ"}</button>
          {mode === "services-page" ? (
            <>
              <a href="/ar/services" target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 px-5 py-3 font-bold">معاينة العربية</a>
              <a href="/en/services" target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 px-5 py-3 font-bold">Preview English</a>
            </>
          ) : (
            <>
              <a href="/ar#services" target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 px-5 py-3 font-bold">معاينة الرئيسية العربية</a>
              <a href="/en#services" target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 px-5 py-3 font-bold">Preview English Home</a>
            </>
          )}
        </div>

        {status && <p className="mt-4 text-sm font-bold text-slate-500">{status}</p>}
      </section>

      {mode === "services-page" ? (
        <div className="mt-6 grid gap-5">
          {sortedPageItems.map(({ item, index }) => (
            <section key={item.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><span className="text-xs font-black uppercase tracking-wider text-amber-600">{String(item.order).padStart(2, "0")}</span><h2 className="mt-1 text-xl font-black">{item.title.ar || item.title.en || item.id}</h2></div>
                <button onClick={() => setPageItems((old) => old.filter((_, i) => i !== index))} className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600">حذف</button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">ID</span><input value={item.id} onChange={(e) => updatePage(index, { id: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">الترتيب</span><input type="number" value={item.order} onChange={(e) => updatePage(index, { order: Number(e.target.value || 0) })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">التصنيف العربي</span><input value={item.category.ar} onChange={(e) => updatePage(index, { category: { ...item.category, ar: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">English Category</span><input value={item.category.en} onChange={(e) => updatePage(index, { category: { ...item.category, en: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">العنوان العربي</span><input value={item.title.ar} onChange={(e) => updatePage(index, { title: { ...item.title, ar: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">English Title</span><input value={item.title.en} onChange={(e) => updatePage(index, { title: { ...item.title, en: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">نوع الـ visual</span><select value={item.visual} onChange={(e) => updatePage(index, { visual: e.target.value as ServiceVisual })} className="rounded-2xl border border-slate-200 px-4 py-3">{visualOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"><input type="checkbox" checked={item.isActive} onChange={(e) => updatePage(index, { isActive: e.target.checked })} /><span className="font-bold">الخدمة فعالة وتظهر في صفحة الخدمات</span></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">الوصف العربي</span><textarea value={item.description.ar} onChange={(e) => updatePage(index, { description: { ...item.description, ar: e.target.value } })} rows={4} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">English Description</span><textarea value={item.description.en} onChange={(e) => updatePage(index, { description: { ...item.description, en: e.target.value } })} rows={4} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">المميزات العربية — سطر لكل ميزة</span><textarea value={item.features.ar.join("\n")} onChange={(e) => updatePage(index, { features: { ...item.features, ar: linesToArray(e.target.value) } })} rows={4} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">English Features — one per line</span><textarea value={item.features.en.join("\n")} onChange={(e) => updatePage(index, { features: { ...item.features, en: linesToArray(e.target.value) } })} rows={4} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          {sortedHomepageItems.map(({ item, index }) => (
            <section key={item.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-black">{item.title.ar || item.title.en || item.id}</h2><button onClick={() => setHomepageItems((old) => old.filter((_, i) => i !== index))} className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600">حذف</button></div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">ID</span><input value={item.id} onChange={(e) => updateHomepage(index, { id: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">الترتيب</span><input type="number" value={item.order} onChange={(e) => updateHomepage(index, { order: Number(e.target.value || 0) })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">الأيقونة / الرقم</span><input value={item.icon} onChange={(e) => updateHomepage(index, { icon: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">رابط الصورة</span><input value={item.imageUrl} onChange={(e) => updateHomepage(index, { imageUrl: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">العنوان العربي</span><input value={item.title.ar} onChange={(e) => updateHomepage(index, { title: { ...item.title, ar: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">English Title</span><input value={item.title.en} onChange={(e) => updateHomepage(index, { title: { ...item.title, en: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">التصنيف العربي</span><input value={item.tag.ar} onChange={(e) => updateHomepage(index, { tag: { ...item.tag, ar: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">English Tag</span><input value={item.tag.en} onChange={(e) => updateHomepage(index, { tag: { ...item.tag, en: e.target.value } })} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">الوصف العربي</span><textarea value={item.description.ar} onChange={(e) => updateHomepage(index, { description: { ...item.description, ar: e.target.value } })} rows={3} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="grid gap-2"><span className="text-sm font-bold text-slate-500">English Description</span><textarea value={item.description.en} onChange={(e) => updateHomepage(index, { description: { ...item.description, en: e.target.value } })} rows={3} className="rounded-2xl border border-slate-200 px-4 py-3" /></label>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"><input type="checkbox" checked={item.isActive} onChange={(e) => updateHomepage(index, { isActive: e.target.checked })} /><span className="font-bold">الخدمة فعالة وتظهر في الصفحة الرئيسية</span></label>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
