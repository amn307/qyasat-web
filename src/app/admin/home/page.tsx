"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { adminFetch } from "@/lib/admin/client";
import type { HomeCard, HomeLink, HomepageContent } from "@/lib/homepage-content";

type Locale = "ar" | "en";
type Status = "loading" | "idle" | "saving" | "saved" | "error";

const emptyHome: HomepageContent = {
  brand: { name: "", tagline: "" },
  nav: [],
  hero: { kicker: "", titlePrefix: "", titleHighlight: "", subtitle: "", primaryCta: "", primaryHref: "", secondaryCta: "", secondaryHref: "" },
  visual: { codeTitle: "", codeText: "", cardTitle: "", cardText: "" },
  trust: { label: "", items: [] },
  services: { kicker: "", title: "", description: "", items: [] },
  ai: { kicker: "", title: "", description: "", items: [] },
  process: { kicker: "", title: "", description: "", items: [] },
  work: { kicker: "", title: "", description: "", items: [] },
  estimator: { title: "", description: "", cta: "", href: "" },
  contact: { title: "", description: "", links: [] }
};

function updatePath(source: HomepageContent, path: string, value: string): HomepageContent {
  const clone = structuredClone(source) as unknown as Record<string, unknown>;
  const parts = path.split(".");
  let cursor = clone;
  for (const part of parts.slice(0, -1)) cursor = cursor[part] as Record<string, unknown>;
  cursor[parts.at(-1)!] = value;
  return clone as unknown as HomepageContent;
}

function Field({ label, value, onChange, multiline = false, dir = "ltr" }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean; dir?: "rtl" | "ltr";
}) {
  const classes = "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10";
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black text-slate-500">{label}</span>
      {multiline ? (
        <textarea dir={dir} value={value} onChange={(e) => onChange(e.target.value)} className={`min-h-24 leading-7 ${classes}`} />
      ) : (
        <input dir={dir} value={value} onChange={(e) => onChange(e.target.value)} className={classes} />
      )}
    </label>
  );
}

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-5 border-b border-slate-100 pb-5">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-teal-700">{eyebrow}</p>
        <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
      </header>
      {children}
    </section>
  );
}

function LinksEditor({ title, items, onChange, dir }: { title: string; items: HomeLink[]; onChange: (items: HomeLink[]) => void; dir: "rtl" | "ltr" }) {
  const update = (index: number, key: keyof HomeLink, value: string) => onChange(items.map((item, i) => i === index ? { ...item, [key]: value } : item));
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-black">{title}</h3>
        <button type="button" onClick={() => onChange([...items, { label: "", href: "" }])} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Add item</button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]">
          <Field label="Label" value={item.label} dir={dir} onChange={(v) => update(index, "label", v)} />
          <Field label="Link" value={item.href} onChange={(v) => update(index, "href", v)} />
          <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="self-end rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-700">Remove</button>
        </div>
      ))}
    </div>
  );
}

function CardsEditor({ title, items, onChange, dir }: { title: string; items: HomeCard[]; onChange: (items: HomeCard[]) => void; dir: "rtl" | "ltr" }) {
  const update = (index: number, key: keyof HomeCard, value: string) => onChange(items.map((item, i) => i === index ? { ...item, [key]: value } : item));
  return (
    <div className="mt-6 grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-black">{title}</h3>
        <button type="button" onClick={() => onChange([...items, { icon: "", title: "", description: "", tag: "" }])} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Add item</button>
      </div>
      {items.map((item, index) => (
        <article key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex justify-between"><strong>Item {index + 1}</strong><button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-700">Remove</button></div>
          <div className="grid gap-4 xl:grid-cols-2">
            <Field label="Icon / number" value={item.icon || ""} onChange={(v) => update(index, "icon", v)} />
            <Field label="Tag" value={item.tag || ""} dir={dir} onChange={(v) => update(index, "tag", v)} />
            <Field label="Title" value={item.title} dir={dir} onChange={(v) => update(index, "title", v)} />
            <Field label="Description" value={item.description} dir={dir} multiline onChange={(v) => update(index, "description", v)} />
          </div>
        </article>
      ))}
    </div>
  );
}

export default function AdminHomePage() {
  const [locale, setLocale] = useState<Locale>("ar");
  const [home, setHome] = useState<HomepageContent>(emptyHome);
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const dir = locale === "ar" ? "rtl" : "ltr";
  const busy = useMemo(() => status === "loading" || status === "saving", [status]);

  const loadContent = useCallback(async (targetLocale: Locale) => {
    setStatus("loading"); setMessage("");
    try {
      const response = await adminFetch(`/api/admin/homepage?locale=${targetLocale}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Unable to load homepage content.");
      setHome(data.content); setStatus("idle");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Unable to load homepage content.");
    }
  }, []);

  async function saveContent() {
    setStatus("saving"); setMessage("");
    try {
      const response = await adminFetch(`/api/admin/homepage?locale=${locale}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(home)
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Unable to save homepage content.");
      setHome(data.content); setStatus("saved"); setMessage(`${locale.toUpperCase()} homepage saved successfully.`);
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Unable to save homepage content.");
    }
  }

  useEffect(() => { void loadContent(locale); }, [locale, loadContent]);
  const setPath = (path: string, value: string) => setHome((current) => updatePath(current, path, value));
  const setCards = (section: "services" | "ai" | "process" | "work", items: HomeCard[]) => setHome((current) => ({ ...current, [section]: { ...current[section], items } }));

  return (
    <div className="grid gap-6">
      <header className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div><p className="mb-2 text-xs font-black uppercase tracking-wide text-teal-700">Homepage Control</p><h1 className="text-3xl font-black">Homepage Management</h1><p className="mt-3 text-sm font-bold text-slate-500">Edit the real content used by /ar and /en.</p></div>
          <div className="flex flex-wrap gap-3">
            <button onClick={saveContent} disabled={busy} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white disabled:opacity-60">{status === "saving" ? "Saving..." : "Save changes"}</button>
            <button onClick={() => void loadContent(locale)} disabled={busy} className="rounded-2xl border px-5 py-3 text-sm font-black">Reload</button>
            <a href={`/${locale}`} target="_blank" rel="noreferrer" className="rounded-2xl border px-5 py-3 text-sm font-black">Preview /{locale}</a>
          </div>
        </div>
        {message && <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-black ${status === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{message}</div>}
      </header>

      <div className="flex gap-3 rounded-3xl border bg-white p-3 shadow-sm">
        {(["ar", "en"] as Locale[]).map((item) => <button key={item} onClick={() => setLocale(item)} className={`rounded-2xl px-5 py-3 text-sm font-black ${locale === item ? "bg-slate-950 text-white" : "text-slate-600"}`}>{item === "ar" ? "العربية" : "English"}</button>)}
      </div>

      <Panel eyebrow="Brand & Navigation" title="Brand identity and menu">
        <div className="mb-6 grid gap-4 xl:grid-cols-2"><Field label="Brand name" value={home.brand.name} dir={dir} onChange={(v) => setPath("brand.name", v)} /><Field label="Tagline" value={home.brand.tagline} dir={dir} onChange={(v) => setPath("brand.tagline", v)} /></div>
        <LinksEditor title="Navigation items" items={home.nav} dir={dir} onChange={(nav) => setHome((current) => ({ ...current, nav }))} />
      </Panel>

      <Panel eyebrow="Hero" title="Main heading and actions"><div className="grid gap-4 xl:grid-cols-2">
        <Field label="Kicker" value={home.hero.kicker} dir={dir} onChange={(v) => setPath("hero.kicker", v)} /><Field label="Title prefix" value={home.hero.titlePrefix} dir={dir} onChange={(v) => setPath("hero.titlePrefix", v)} /><Field label="Highlighted title" value={home.hero.titleHighlight} dir={dir} onChange={(v) => setPath("hero.titleHighlight", v)} /><Field label="Subtitle" value={home.hero.subtitle} dir={dir} multiline onChange={(v) => setPath("hero.subtitle", v)} /><Field label="Primary button" value={home.hero.primaryCta} dir={dir} onChange={(v) => setPath("hero.primaryCta", v)} /><Field label="Primary link" value={home.hero.primaryHref} onChange={(v) => setPath("hero.primaryHref", v)} /><Field label="Secondary button" value={home.hero.secondaryCta} dir={dir} onChange={(v) => setPath("hero.secondaryCta", v)} /><Field label="Secondary link" value={home.hero.secondaryHref} onChange={(v) => setPath("hero.secondaryHref", v)} />
      </div></Panel>

      <Panel eyebrow="Hero Visual" title="Code and CMS cards"><div className="grid gap-4 xl:grid-cols-2"><Field label="Code title" value={home.visual.codeTitle} dir={dir} onChange={(v) => setPath("visual.codeTitle", v)} /><Field label="Code text" value={home.visual.codeText} dir={dir} onChange={(v) => setPath("visual.codeText", v)} /><Field label="Card title" value={home.visual.cardTitle} dir={dir} onChange={(v) => setPath("visual.cardTitle", v)} /><Field label="Card text" value={home.visual.cardText} dir={dir} onChange={(v) => setPath("visual.cardText", v)} /></div></Panel>

      <Panel eyebrow="Trust" title="Trust strip"><Field label="Section label" value={home.trust.label} dir={dir} onChange={(v) => setPath("trust.label", v)} /><div className="mt-6 grid gap-4">{home.trust.items.map((item, index) => <div key={index} className="grid gap-3 rounded-3xl border bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"><Field label="Value" value={item.value} dir={dir} onChange={(v) => setHome((current) => ({ ...current, trust: { ...current.trust, items: current.trust.items.map((x, i) => i === index ? { ...x, value: v } : x) } }))} /><Field label="Label" value={item.label} dir={dir} onChange={(v) => setHome((current) => ({ ...current, trust: { ...current.trust, items: current.trust.items.map((x, i) => i === index ? { ...x, label: v } : x) } }))} /><button onClick={() => setHome((current) => ({ ...current, trust: { ...current.trust, items: current.trust.items.filter((_, i) => i !== index) } }))} className="self-end rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-700">Remove</button></div>)}<button onClick={() => setHome((current) => ({ ...current, trust: { ...current.trust, items: [...current.trust.items, { value: "", label: "" }] } }))} className="w-fit rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Add trust item</button></div></Panel>

      {(["services", "ai", "process", "work"] as const).map((section) => <Panel key={section} eyebrow={section} title={`${section[0].toUpperCase()}${section.slice(1)} section`}><div className="grid gap-4 xl:grid-cols-2"><Field label="Kicker" value={home[section].kicker} dir={dir} onChange={(v) => setPath(`${section}.kicker`, v)} /><Field label="Title" value={home[section].title} dir={dir} onChange={(v) => setPath(`${section}.title`, v)} /><div className="xl:col-span-2"><Field label="Description" value={home[section].description} dir={dir} multiline onChange={(v) => setPath(`${section}.description`, v)} /></div></div><CardsEditor title={`${section} items`} items={home[section].items} dir={dir} onChange={(items) => setCards(section, items)} /></Panel>)}

      <Panel eyebrow="Estimator" title="Project estimator callout"><div className="grid gap-4 xl:grid-cols-2"><Field label="Title" value={home.estimator.title} dir={dir} onChange={(v) => setPath("estimator.title", v)} /><Field label="Description" value={home.estimator.description} dir={dir} multiline onChange={(v) => setPath("estimator.description", v)} /><Field label="Button" value={home.estimator.cta} dir={dir} onChange={(v) => setPath("estimator.cta", v)} /><Field label="Link" value={home.estimator.href} onChange={(v) => setPath("estimator.href", v)} /></div></Panel>

      <Panel eyebrow="Contact" title="Final contact section"><div className="mb-6 grid gap-4 xl:grid-cols-2"><Field label="Title" value={home.contact.title} dir={dir} onChange={(v) => setPath("contact.title", v)} /><Field label="Description" value={home.contact.description} dir={dir} multiline onChange={(v) => setPath("contact.description", v)} /></div><LinksEditor title="Contact links" items={home.contact.links} dir={dir} onChange={(links) => setHome((current) => ({ ...current, contact: { ...current.contact, links } }))} /></Panel>
    </div>
  );
}
