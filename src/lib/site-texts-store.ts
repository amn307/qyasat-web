import { promises as fs } from "fs";
import path from "path";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { requirePersistentStorage } from "@/lib/firebase/cms-store";
import { readCmsDocument, writeCmsDocument } from "@/lib/firebase/cms-store";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";

export type SiteLocale = "ar" | "en";

export type SiteTextItem = {
  id: string;
  key: string;
  namespace: string;
  label: string;
  ar: string;
  en: string;
  hint?: string;
  updatedAt: string;
};

type SiteTextsStore = {
  items: SiteTextItem[];
};

const dataFile = runtimeStoragePath("data", "site-texts.json");

const now = () => new Date().toISOString();

const defaultItems: SiteTextItem[] = [
  {
    id: "site.hero.badge",
    key: "site.hero.badge",
    namespace: "homepage",
    label: "Hero Badge",
    ar: "Qyasat CMS",
    en: "Qyasat CMS",
    hint: "النص الصغير أعلى عنوان الصفحة الرئيسية",
    updatedAt: now(),
  },
  {
    id: "site.hero.title",
    key: "site.hero.title",
    namespace: "homepage",
    label: "Hero Title",
    ar: "نبني منصات رقمية أنيقة وقابلة للنمو",
    en: "We build elegant digital platforms ready to scale",
    hint: "العنوان الرئيسي في الصفحة الأولى",
    updatedAt: now(),
  },
  {
    id: "site.hero.subtitle",
    key: "site.hero.subtitle",
    namespace: "homepage",
    label: "Hero Subtitle",
    ar: "حلول تقنية، أتمتة، ذكاء اصطناعي، وتطوير أعمال تساعد مشروعك على التحول إلى منتج رقمي واضح وقوي.",
    en: "Technology, automation, AI, and business development solutions that help your project become a clear and powerful digital product.",
    hint: "الوصف أسفل العنوان الرئيسي",
    updatedAt: now(),
  },
  {
    id: "site.hero.cta.primary",
    key: "site.hero.cta.primary",
    namespace: "homepage",
    label: "Primary CTA",
    ar: "ابدأ مشروعك",
    en: "Start your project",
    hint: "زر الدعوة الرئيسي",
    updatedAt: now(),
  },
  {
    id: "site.hero.cta.secondary",
    key: "site.hero.cta.secondary",
    namespace: "homepage",
    label: "Secondary CTA",
    ar: "استعرض الخدمات",
    en: "Explore services",
    hint: "زر الدعوة الثانوي",
    updatedAt: now(),
  },
  {
    id: "site.nav.home",
    key: "site.nav.home",
    namespace: "navigation",
    label: "Home Link",
    ar: "الرئيسية",
    en: "Home",
    updatedAt: now(),
  },
  {
    id: "site.nav.services",
    key: "site.nav.services",
    namespace: "navigation",
    label: "Services Link",
    ar: "الخدمات",
    en: "Services",
    updatedAt: now(),
  },
  {
    id: "site.nav.blog",
    key: "site.nav.blog",
    namespace: "navigation",
    label: "Blog Link",
    ar: "المدونة",
    en: "Blog",
    updatedAt: now(),
  },
  {
    id: "site.nav.contact",
    key: "site.nav.contact",
    namespace: "navigation",
    label: "Contact Link",
    ar: "تواصل معنا",
    en: "Contact",
    updatedAt: now(),
  },
  {
    id: "site.services.title",
    key: "site.services.title",
    namespace: "services",
    label: "Services Title",
    ar: "خدمات تقنية مصممة للنمو",
    en: "Technology services designed for growth",
    updatedAt: now(),
  },
  {
    id: "site.services.subtitle",
    key: "site.services.subtitle",
    namespace: "services",
    label: "Services Subtitle",
    ar: "نربط بين التقنية، التسويق، الأتمتة، والذكاء الاصطناعي لبناء حلول عملية قابلة للتوسع.",
    en: "We connect technology, marketing, automation, and AI to build practical scalable solutions.",
    updatedAt: now(),
  },
  {
    id: "site.contact.title",
    key: "site.contact.title",
    namespace: "contact",
    label: "Contact Title",
    ar: "احكِ لنا عن مشروعك",
    en: "Tell us about your project",
    updatedAt: now(),
  },
  {
    id: "site.contact.subtitle",
    key: "site.contact.subtitle",
    namespace: "contact",
    label: "Contact Subtitle",
    ar: "أرسل تفاصيل فكرتك وسنساعدك في تحويلها إلى خطة واضحة قابلة للتنفيذ.",
    en: "Send your idea details and we will help turn them into a clear executable plan.",
    updatedAt: now(),
  },
  {
    id: "site.blog.title",
    key: "site.blog.title",
    namespace: "blog",
    label: "Blog Title",
    ar: "مدونة قياسات",
    en: "Qyasat Blog",
    updatedAt: now(),
  },
  {
    id: "site.blog.subtitle",
    key: "site.blog.subtitle",
    namespace: "blog",
    label: "Blog Subtitle",
    ar: "أفكار ورؤى في التقنية، الأعمال، الأتمتة، والذكاء الاصطناعي.",
    en: "Insights about technology, business, automation, and AI.",
    updatedAt: now(),
  },
  {
    id: "site.footer.tagline",
    key: "site.footer.tagline",
    namespace: "footer",
    label: "Footer Tagline",
    ar: "قياسات — ندير المحتوى ونقيس الأداء بوضوح.",
    en: "قياسات — We manage content and measure digital performance.",
    updatedAt: now(),
  },
];

function normalizeKey(value: unknown) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, ".")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function readLocalStore(): Promise<SiteTextsStore> {
  try {
    const parsed = JSON.parse(await fs.readFile(dataFile, "utf8")) as SiteTextsStore;
    return { items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return { items: [] };
  }
}

async function readStore(): Promise<SiteTextsStore> {
  const local = await readLocalStore();
  let existingItems: SiteTextItem[] = local.items;

  if (isFirebaseAdminConfigured()) {
    try {
      const stored = await readCmsDocument<SiteTextsStore>("site-texts");
      if (Array.isArray(stored?.items) && stored.items.length) {
        const map = new Map(local.items.map((item) => [item.key, item]));
        for (const item of stored.items) map.set(item.key, item);
        existingItems = Array.from(map.values());
      } else if (local.items.length) {
        await writeCmsDocument("site-texts", local);
      }
    } catch (error) {
      console.error("SITE_TEXTS_FIREBASE_READ_FAILED", error);
      existingItems = local.items;
    }
  }

  const existingKeys = new Set(existingItems.map((item) => item.key));
  const merged = [...existingItems, ...defaultItems.filter((item) => !existingKeys.has(item.key))];
  return { items: merged };
}

async function writeStore(store: SiteTextsStore) {
  if (isFirebaseAdminConfigured()) { await writeCmsDocument("site-texts", store); return; }
  requirePersistentStorage();
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
}

export async function listSiteTexts() {
  const store = await readStore();
  return store.items.sort((a, b) => a.namespace.localeCompare(b.namespace) || a.key.localeCompare(b.key));
}

export async function getSiteTextDictionary(locale: SiteLocale = "ar") {
  const items = await listSiteTexts();
  return items.reduce<Record<string, string>>((dictionary, item) => {
    dictionary[item.key] = locale === "en" ? item.en : item.ar;
    return dictionary;
  }, {});
}

export async function upsertSiteText(payload: Partial<SiteTextItem>) {
  const key = normalizeKey(payload.key);
  if (!key) {
    throw new Error("TEXT_KEY_REQUIRED");
  }

  const store = await readStore();
  const index = store.items.findIndex((item) => item.key === key);
  const updatedAt = now();

  if (index >= 0) {
    const current = store.items[index];
    const nextItem: SiteTextItem = {
      ...current,
      namespace: normalizeText(payload.namespace) || current.namespace || "general",
      label: normalizeText(payload.label) || current.label || key,
      ar: typeof payload.ar === "string" ? payload.ar : current.ar,
      en: typeof payload.en === "string" ? payload.en : current.en,
      hint: typeof payload.hint === "string" ? payload.hint : current.hint,
      updatedAt,
    };
    store.items[index] = nextItem;
    await writeStore(store);
    return nextItem;
  }

  const nextItem: SiteTextItem = {
    id: key,
    key,
    namespace: normalizeText(payload.namespace) || "general",
    label: normalizeText(payload.label) || key,
    ar: typeof payload.ar === "string" ? payload.ar : "",
    en: typeof payload.en === "string" ? payload.en : "",
    hint: typeof payload.hint === "string" ? payload.hint : "",
    updatedAt,
  };

  store.items = [nextItem, ...store.items];
  await writeStore(store);
  return nextItem;
}

export async function deleteSiteText(keyValue: string) {
  const key = normalizeKey(keyValue);
  const store = await readStore();
  const before = store.items.length;
  store.items = store.items.filter((item) => item.key !== key);
  await writeStore(store);
  return { deleted: before !== store.items.length };
}

export async function resetSiteTextsDefaults() {
  await writeStore({ items: defaultItems.map((item) => ({ ...item, updatedAt: now() })) });
  return listSiteTexts();
}
