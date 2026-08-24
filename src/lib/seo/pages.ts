import fs from "node:fs/promises";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import type { Metadata } from "next";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { requirePersistentStorage } from "@/lib/firebase/cms-store";

export type SeoLocale = "ar" | "en";
export type SeoPageKey = "home" | "services" | "blog" | "contact";

export type SeoPage = {
  id: string;
  pageKey: SeoPageKey;
  locale: SeoLocale;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robots: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow";
  schemaJson: string;
  isActive: boolean;
  updatedAt: string;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qyasat.sa";
const localPath = path.join(process.cwd(), "storage/private/seo-pages.json");
const collectionName = "seo_pages";

const pagePaths: Record<SeoPageKey, string> = {
  home: "",
  services: "/services",
  blog: "/blog",
  contact: "/contact",
};

const defaults: Record<SeoLocale, Record<SeoPageKey, Pick<SeoPage, "title" | "description" | "keywords">>> = {
  ar: {
    home: {
      title: "قياسات | حلول رقمية وذكاء اصطناعي وأتمتة",
      description: "قياسات تبني مواقع ومنصات وأنظمة أتمتة وحلول ذكاء اصطناعي تساعد الشركات على النمو.",
      keywords: ["قياسات", "تطوير مواقع", "ذكاء اصطناعي", "أتمتة", "حلول رقمية"],
    },
    services: {
      title: "خدمات قياسات | تطوير وأتمتة وذكاء اصطناعي",
      description: "استكشف خدمات قياسات في التطوير التقني، الأتمتة، الذكاء الاصطناعي، والتسويق التقني.",
      keywords: ["خدمات تقنية", "تطوير تقني", "أتمتة", "ذكاء اصطناعي"],
    },
    blog: {
      title: "مدونة قياسات | التقنية والأتمتة والذكاء الاصطناعي",
      description: "مقالات وأفكار عملية حول التقنية، الأتمتة، التسويق، والذكاء الاصطناعي.",
      keywords: ["مدونة تقنية", "أتمتة", "ذكاء اصطناعي", "تسويق تقني"],
    },
    contact: {
      title: "تواصل مع قياسات",
      description: "تواصل مع قياسات لمناقشة مشروعك أو احتياجك في التقنية والأتمتة والذكاء الاصطناعي.",
      keywords: ["تواصل قياسات", "شركة تقنية", "مشروع تقني"],
    },
  },
  en: {
    home: {
      title: "Qyasat | Digital, Automation and AI Solutions",
      description: "Qyasat builds websites, platforms, automation systems, and AI solutions that help businesses grow.",
      keywords: ["Qyasat", "web development", "automation", "AI solutions", "digital solutions"],
    },
    services: {
      title: "Qyasat Services | Development, Automation and AI",
      description: "Explore Qyasat services in technical development, automation, AI, and technical marketing.",
      keywords: ["technical services", "web development", "automation", "AI development"],
    },
    blog: {
      title: "Qyasat Blog | Technology, Automation and AI",
      description: "Practical insights about technology, automation, marketing, and artificial intelligence.",
      keywords: ["technology blog", "automation", "artificial intelligence", "technical marketing"],
    },
    contact: {
      title: "Contact Qyasat",
      description: "Contact Qyasat to discuss your technology, automation, or artificial intelligence project.",
      keywords: ["contact Qyasat", "technology company", "digital project"],
    },
  },
};

function makeId(locale: SeoLocale, pageKey: SeoPageKey) {
  return `${locale}-${pageKey}`;
}

function resolvePageKey(value: unknown): SeoPageKey {
  if (value === "services" || value === "/ar/services" || value === "/en/services") return "services";
  if (value === "blog" || value === "/ar/blog" || value === "/en/blog") return "blog";
  if (value === "contact" || value === "/ar/contact" || value === "/en/contact") return "contact";
  return "home";
}

function canonicalFor(locale: SeoLocale, pageKey: SeoPageKey) {
  return `${siteUrl}/${locale}${pagePaths[pageKey]}`;
}

function defaultPage(locale: SeoLocale, pageKey: SeoPageKey): SeoPage {
  const source = defaults[locale][pageKey];
  const canonical = canonicalFor(locale, pageKey);
  return {
    id: makeId(locale, pageKey),
    pageKey,
    locale,
    path: `/${locale}${pagePaths[pageKey]}`,
    title: source.title,
    description: source.description,
    keywords: source.keywords,
    canonical,
    ogTitle: source.title,
    ogDescription: source.description,
    ogImage: "",
    robots: "index,follow",
    schemaJson: "",
    isActive: true,
    updatedAt: new Date().toISOString(),
  };
}

function normalize(input: Partial<SeoPage>, locale?: SeoLocale, pageKey?: SeoPageKey): SeoPage {
  const resolvedLocale = input.locale === "en" ? "en" : (locale || "ar");
  const resolvedPageKey = resolvePageKey(input.pageKey || pageKey);
  const fallback = defaultPage(resolvedLocale, resolvedPageKey);
  const allowedRobots = new Set(["index,follow", "noindex,follow", "index,nofollow", "noindex,nofollow"]);
  return {
    ...fallback,
    ...input,
    id: input.id || makeId(resolvedLocale, resolvedPageKey),
    locale: resolvedLocale,
    pageKey: resolvedPageKey,
    path: input.path || fallback.path,
    keywords: Array.isArray(input.keywords) ? input.keywords.filter(Boolean) : fallback.keywords,
    robots: allowedRobots.has(input.robots || "") ? (input.robots as SeoPage["robots"]) : "index,follow",
    isActive: input.isActive !== false,
    updatedAt: input.updatedAt || fallback.updatedAt,
  };
}

async function readLocal(): Promise<SeoPage[]> {
  try {
    const parsed = JSON.parse(await fs.readFile(localPath, "utf8")) as Partial<SeoPage>[];
    return parsed.map((item) => normalize(item));
  } catch {
    return [];
  }
}

async function writeLocal(items: SeoPage[]) {
  requirePersistentStorage();
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, JSON.stringify(items, null, 2) + "\n", "utf8");
}

export async function listSeoPages(): Promise<SeoPage[]> {
  let stored: SeoPage[] = [];
  if (isFirebaseAdminConfigured()) {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(collectionName).get();
      stored = snapshot.docs.map((doc) => normalize({ id: doc.id, ...(doc.data() as Partial<SeoPage>) }));
      if (stored.length === 0) {
        stored = await readLocal();
        if (stored.length > 0) {
          const batch = db.batch();
          for (const item of stored) batch.set(db.collection(collectionName).doc(item.id), item, { merge: true });
          await batch.commit();
        }
      }
    } catch (error) {
      console.error("SEO_FIREBASE_READ_FAILED", error);
      stored = await readLocal();
    }
  } else {
    stored = await readLocal();
  }

  const map = new Map(stored.map((item) => [item.id, item]));
  for (const locale of ["ar", "en"] as const) {
    for (const pageKey of ["home", "services", "blog", "contact"] as const) {
      const id = makeId(locale, pageKey);
      if (!map.has(id)) map.set(id, defaultPage(locale, pageKey));
    }
  }

  return Array.from(map.values()).sort((a, b) => a.id.localeCompare(b.id));
}

export async function getSeoPage(locale: SeoLocale, pageKey: SeoPageKey): Promise<SeoPage> {
  const id = makeId(locale, pageKey);
  const items = await listSeoPages();
  return items.find((item) => item.id === id) || defaultPage(locale, pageKey);
}

export async function saveSeoPage(input: Partial<SeoPage>): Promise<SeoPage> {
  if (!input.locale || !input.pageKey) throw new Error("Locale and page are required.");
  const item = normalize({ ...input, id: makeId(input.locale, input.pageKey), updatedAt: new Date().toISOString() });

  if (isFirebaseAdminConfigured()) {
    await getAdminDb().collection(collectionName).doc(item.id).set(item, { merge: true });
  } else {
    const items = await readLocal();
    const index = items.findIndex((current) => current.id === item.id);
    if (index >= 0) items[index] = item;
    else items.push(item);
    await writeLocal(items);
  }

  return item;
}

export function metadataFromSeo(item: SeoPage, fallbackOgImage?: string): Metadata {
  const [indexValue, followValue] = item.robots.split(",");
  const image = item.ogImage || fallbackOgImage || "";
  return {
    metadataBase: new URL(siteUrl),
    title: item.title,
    description: item.description,
    keywords: item.keywords,
    alternates: {
      canonical: item.canonical,
      languages: {
        ar: item.canonical.replace(/\/en(?=\/|$)/, "/ar"),
        en: item.canonical.replace(/\/ar(?=\/|$)/, "/en"),
      },
    },
    openGraph: {
      type: "website",
      url: item.canonical,
      title: item.ogTitle || item.title,
      description: item.ogDescription || item.description,
      images: image ? [image] : [],
      locale: item.locale === "ar" ? "ar_SA" : "en_US",
      siteName: "Qyasat",
    },
    twitter: {
      card: "summary_large_image",
      title: item.ogTitle || item.title,
      description: item.ogDescription || item.description,
      images: image ? [image] : [],
    },
    robots: {
      index: indexValue !== "noindex",
      follow: followValue !== "nofollow",
      googleBot: { index: indexValue !== "noindex", follow: followValue !== "nofollow", "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export function safeSchemaJson(schemaJson: string) {
  if (!schemaJson.trim()) return null;
  try { return JSON.parse(schemaJson); } catch { return null; }
}
