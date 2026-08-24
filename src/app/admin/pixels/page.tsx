"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "@/lib/admin/client";
import { defaultTrackingSettings, type TrackingSettings } from "@/lib/analytics/types";

const eventKeys = [
  ["pageViews", "Page views", "مشاهدات الصفحات"],
  ["scrollDepth", "Scroll depth (50% and 90%)", "عمق التمرير (50٪ و90٪)"],
  ["timeOnPage", "Time on page", "الوقت في الصفحة"],
  ["outboundLinks", "Outbound links", "الروابط الخارجية"],
  ["contactForm", "Contact form submissions", "إرسال نموذج التواصل"],
  ["whatsappClicks", "WhatsApp clicks", "نقرات واتساب"],
  ["phoneClicks", "Phone clicks", "نقرات الهاتف"],
  ["emailClicks", "Email clicks", "نقرات البريد"],
  ["downloads", "File downloads", "تنزيل الملفات"],
  ["demoBooking", "Demo and booking clicks", "نقرات الحجز وطلب العرض"],
] as const;

function StatusPill({ connected, ar }: { connected: boolean; ar: boolean }) {
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black ${connected ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
    <span className={`size-2 rounded-full ${connected ? "bg-emerald-500" : "bg-slate-300"}`} />
    {connected ? (ar ? "متصل" : "Connected") : (ar ? "غير متصل" : "Not connected")}
  </span>;
}

export default function AdminPixelsPage() {
  const sp = useSearchParams();
  const ar = sp.get("lang") === "ar";
  const [tracking, setTracking] = useState<TrackingSettings>(defaultTrackingSettings);
  const [status, setStatus] = useState("");
  const [diagnostic, setDiagnostic] = useState("");

  const copy = ar ? {
    title: "التسويق والتحليلات",
    desc: "اربط منصات التسويق وتتبع أهم تصرفات الزوار تلقائيًا دون كتابة كود.",
    reload: "تحديث",
    save: "حفظ التغييرات",
    connections: "الاتصالات",
    connectionsDesc: "اختر Meta وTikTok، ثم اختر طريقة واحدة فقط لتتبع Google.",
    enabled: "مفعل",
    google: "تتبع Google",
    choose: "اختر طريقة التتبع",
    ga4: "Google Analytics 4",
    gtm: "Google Tag Manager",
    auto: "التتبع التلقائي للأحداث",
    autoDesc: "يقوم قياسات بتحويل التفاعلات المهمة إلى الأحداث المناسبة في Meta وGoogle وTikTok.",
    first: "تحليلات قياسات الداخلية",
    firstDesc: "تخزين مشاهدات الصفحات والجلسات والنقرات ومسارات الزيارة في لوحة قياسات.",
    dashboard: "فتح لوحة التحليلات",
    diagnostics: "تشغيل الفحص",
    configured: "الإعدادات العامة جاهزة. افتح الموقع العام واستخدم إضافات المنصات للتأكد من وصول الأحداث.",
    saving: "جاري الحفظ...",
    saved: "تم الحفظ بنجاح",
    failed: "تعذر الحفظ",
    loading: "جاري التحميل...",
    loaded: "تم التحميل",
  } : {
    title: "Marketing & Analytics",
    desc: "Connect marketing platforms and automatically track the user actions that matter—without writing code.",
    reload: "Reload",
    save: "Save changes",
    connections: "Connections",
    connectionsDesc: "Connect Meta and TikTok, then choose only one Google tracking method.",
    enabled: "Enabled",
    google: "Google tracking",
    choose: "Choose one tracking method",
    ga4: "Google Analytics 4",
    gtm: "Google Tag Manager",
    auto: "Automatic event tracking",
    autoDesc: "Qyasat maps important interactions to the correct Meta, Google and TikTok events automatically.",
    first: "Qyasat first-party analytics",
    firstDesc: "Store page views, sessions, clicks and visitor journeys in your own Qyasat dashboard.",
    dashboard: "Open analytics dashboard",
    diagnostics: "Run diagnostics",
    configured: "Public settings are configured. Open the public site and use the platform helpers to confirm event delivery.",
    saving: "Saving...",
    saved: "Saved successfully",
    failed: "Save failed",
    loading: "Loading...",
    loaded: "Loaded",
  };

  async function load() {
    setStatus(copy.loading);
    const response = await adminFetch("/api/admin/content");
    if (!response.ok) { setStatus(copy.failed); return; }
    const data = await response.json();
    setTracking({
      ...defaultTrackingSettings,
      ...data.content.tracking,
      automaticEvents: { ...defaultTrackingSettings.automaticEvents, ...(data.content.tracking?.automaticEvents || {}) },
    });
    setStatus(copy.loaded);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    setStatus(copy.saving);
    const response = await adminFetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tracking }),
    });
    setStatus(response.ok ? copy.saved : copy.failed);
  }

  function updatePlatform(key: "meta" | "tiktok" | "ga4" | "gtm", patch: Record<string, unknown>) {
    setTracking((old) => ({ ...old, [key]: { ...old[key], ...patch } }));
  }

  const connectionCount = useMemo(() => {
    let count = 0;
    if (tracking.meta.enabled && tracking.meta.pixelId) count++;
    if (tracking.tiktok.enabled && tracking.tiktok.pixelId) count++;
    if (tracking.googleMode === "ga4" && tracking.ga4.enabled && tracking.ga4.measurementId) count++;
    if (tracking.googleMode === "gtm" && tracking.gtm.enabled && tracking.gtm.containerId) count++;
    return count;
  }, [tracking]);

  async function runDiagnostics() {
    setDiagnostic(ar ? "جاري الفحص..." : "Checking...");
    try {
      const response = await fetch("/api/public/tracking", { cache: "no-store" });
      const data = await response.json();
      const publicTracking = data.tracking as TrackingSettings;
      const active = [
        publicTracking.meta?.enabled && publicTracking.meta.pixelId ? "Meta" : "",
        publicTracking.googleMode === "ga4" && publicTracking.ga4?.enabled && publicTracking.ga4.measurementId ? "GA4" : "",
        publicTracking.googleMode === "gtm" && publicTracking.gtm?.enabled && publicTracking.gtm.containerId ? "GTM" : "",
        publicTracking.tiktok?.enabled && publicTracking.tiktok.pixelId ? "TikTok" : "",
      ].filter(Boolean);
      setDiagnostic(active.length ? `${copy.configured} ${active.join(" · ")}` : (ar ? "لا توجد اتصالات مفعلة بعد." : "No connections are enabled yet."));
    } catch {
      setDiagnostic(ar ? "تعذر الوصول إلى إعدادات الموقع العامة." : "Could not read the public tracking settings.");
    }
  }

  const card = "rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm";
  const input = "mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

  return <div className="mx-auto max-w-7xl space-y-6" dir={ar ? "rtl" : "ltr"}>
    <section className="overflow-hidden rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-white/70">{connectionCount}/3 {ar ? "اتصالات" : "connections"}</div>
          <h1 className="text-3xl font-black md:text-4xl">{copy.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{copy.desc}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={load} className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black hover:bg-white/15">{copy.reload}</button>
          <button onClick={save} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 hover:bg-slate-100">{copy.save}</button>
        </div>
      </div>
      {status && <p className="mt-5 text-sm font-bold text-slate-300">{status}</p>}
    </section>

    <section className="space-y-4">
      <div><h2 className="text-2xl font-black">{copy.connections}</h2><p className="mt-1 text-slate-500">{copy.connectionsDesc}</p></div>
      <div className="grid gap-5 xl:grid-cols-3">
        <section className={card}>
          <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-widest text-blue-600">Meta</div><h3 className="mt-2 text-xl font-black">Meta Pixel</h3></div><StatusPill ar={ar} connected={tracking.meta.enabled && Boolean(tracking.meta.pixelId)} /></div>
          <label className="mt-6 block text-sm font-bold text-slate-600">Pixel ID<input dir="ltr" value={tracking.meta.pixelId} placeholder="123456789012345" onChange={(e) => updatePlatform("meta", { pixelId: e.target.value.trim(), enabled: Boolean(e.target.value.trim()) })} className={input} /></label>
          <label className="mt-4 flex items-center gap-3 text-sm font-black"><input className="size-5" type="checkbox" checked={tracking.meta.enabled} onChange={(e) => updatePlatform("meta", { enabled: e.target.checked })} />{copy.enabled}</label>
        </section>

        <section className={card}>
          <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-widest text-rose-600">TikTok</div><h3 className="mt-2 text-xl font-black">TikTok Pixel</h3></div><StatusPill ar={ar} connected={tracking.tiktok.enabled && Boolean(tracking.tiktok.pixelId)} /></div>
          <label className="mt-6 block text-sm font-bold text-slate-600">Pixel ID<input dir="ltr" value={tracking.tiktok.pixelId} placeholder="CXXXXXXXXXXXXXX" onChange={(e) => updatePlatform("tiktok", { pixelId: e.target.value.trim(), enabled: Boolean(e.target.value.trim()) })} className={input} /></label>
          <label className="mt-4 flex items-center gap-3 text-sm font-black"><input className="size-5" type="checkbox" checked={tracking.tiktok.enabled} onChange={(e) => updatePlatform("tiktok", { enabled: e.target.checked })} />{copy.enabled}</label>
        </section>

        <section className={card}>
          <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-widest text-amber-600">Google</div><h3 className="mt-2 text-xl font-black">{copy.google}</h3></div><StatusPill ar={ar} connected={(tracking.googleMode === "ga4" && tracking.ga4.enabled && Boolean(tracking.ga4.measurementId)) || (tracking.googleMode === "gtm" && tracking.gtm.enabled && Boolean(tracking.gtm.containerId))} /></div>
          <p className="mt-5 text-sm font-bold text-slate-500">{copy.choose}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            {(["ga4", "gtm"] as const).map((mode) => <button key={mode} type="button" onClick={() => setTracking((old) => ({ ...old, googleMode: mode, ga4: { ...old.ga4, enabled: mode === "ga4" && Boolean(old.ga4.measurementId) }, gtm: { ...old.gtm, enabled: mode === "gtm" && Boolean(old.gtm.containerId) } }))} className={`rounded-xl px-3 py-2 text-xs font-black transition ${tracking.googleMode === mode ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>{mode === "ga4" ? "GA4" : "GTM"}</button>)}
          </div>
          {tracking.googleMode === "ga4" ? <label className="mt-5 block text-sm font-bold text-slate-600">Measurement ID<input dir="ltr" value={tracking.ga4.measurementId} placeholder="G-XXXXXXXXXX" onChange={(e) => updatePlatform("ga4", { measurementId: e.target.value.trim(), enabled: Boolean(e.target.value.trim()) })} className={input} /></label> : <label className="mt-5 block text-sm font-bold text-slate-600">Container ID<input dir="ltr" value={tracking.gtm.containerId} placeholder="GTM-XXXXXXX" onChange={(e) => updatePlatform("gtm", { containerId: e.target.value.trim(), enabled: Boolean(e.target.value.trim()) })} className={input} /></label>}
        </section>
      </div>
    </section>

    <section className={card}>
      <div className="flex flex-wrap items-start justify-between gap-5"><div><h2 className="text-2xl font-black">{copy.auto}</h2><p className="mt-2 max-w-3xl text-slate-500">{copy.autoDesc}</p></div><button onClick={() => setTracking((old) => ({ ...old, automaticEvents: Object.fromEntries(Object.keys(old.automaticEvents).map((key) => [key, true])) as TrackingSettings["automaticEvents"] }))} className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black">{ar ? "تفعيل الكل" : "Enable all"}</button></div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {eventKeys.map(([key, en, arabic]) => <label key={key} className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"><span className="text-sm font-bold">{ar ? arabic : en}</span><input type="checkbox" className="size-5" checked={tracking.automaticEvents[key]} onChange={(e) => setTracking((old) => ({ ...old, automaticEvents: { ...old.automaticEvents, [key]: e.target.checked } }))} /></label>)}
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"><strong className="text-slate-950">{ar ? "أمثلة الخرائط:" : "Event mapping examples:"}</strong> Contact form → Meta Lead · GA4 generate_lead · TikTok SubmitForm &nbsp; | &nbsp; WhatsApp → Contact &nbsp; | &nbsp; Demo → Schedule / generate_lead / CompleteRegistration</div>
    </section>

    <section className={card}>
      <div className="flex flex-wrap items-start justify-between gap-5"><label className="flex items-start gap-4"><input type="checkbox" className="mt-1 size-5" checked={tracking.firstPartyAnalyticsEnabled} onChange={(e) => setTracking({ ...tracking, firstPartyAnalyticsEnabled: e.target.checked })} /><span><strong className="block text-xl">{copy.first}</strong><span className="mt-1 block max-w-2xl text-slate-500">{copy.firstDesc}</span></span></label><Link href={`/admin/analytics?lang=${ar ? "ar" : "en"}`} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white">{copy.dashboard}</Link></div>
    </section>

    <section className={card}>
      <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-black">{ar ? "التحقق من الإعداد" : "Setup verification"}</h2><p className="mt-1 text-sm text-slate-500">{ar ? "يتأكد من أن الموقع العام يستقبل الإعدادات المحفوظة." : "Confirms that the public website receives the saved configuration."}</p></div><button onClick={runDiagnostics} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">{copy.diagnostics}</button></div>
      {diagnostic && <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{diagnostic}</p>}
    </section>
  </div>;
}
