import fs from "node:fs/promises";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import { readCmsDocument, writeCmsDocument, requirePersistentStorage } from "@/lib/firebase/cms-store";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { unstable_noStore as noStore } from "next/cache";
import { defaultTrackingSettings, type TrackingSettings } from "@/lib/analytics/types";

export type Locale = "ar" | "en";

export type HomeContent = {
  badge: string;
  title: string;
  subtitle: string;
  heroImageUrl: string;
  primaryCta: string;
  secondaryCta: string;
  servicesTitle: string;
  whyTitle: string;
  whyText: string;
  processTitle: string;
  process: string[];
};

export type ServiceItem = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  imageUrl: string;
  isActive: boolean;
  order: number;
};

export type SiteSettings = {
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

export type SiteContent = {
  settings: SiteSettings;
  home: Record<Locale, HomeContent>;
  services: {
    items: ServiceItem[];
  };
  seo: Record<
    Locale,
    {
      siteTitle: string;
      description: string;
      keywords: string;
      ogTitle: string;
      ogDescription: string;
    }
  >;
  pixels: Array<{
    id: string;
    name: string;
    location: "head" | "body";
    isActive: boolean;
    code: string;
  }>;
  tracking: TrackingSettings;
  updatedAt?: string;
};

export const defaultContent: SiteContent = {
  settings: {
    brand: {
      logoUrl: "",
      logoAlt: "Qyasat",
      faviconUrl: "",
      ogImageUrl: "",
    },
    contact: {
      email: "moamen.fz@gmail.com",
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
  },
  home: {
    ar: {
      badge: "Qyasat CMS",
      title: "نحوّل الأفكار إلى أنظمة رقمية تنمو مع عملك.",
      subtitle:
        "نبني حلولًا تجمع بين تطوير الأعمال، التسويق التقني، البرمجة، الأتمتة، والذكاء الاصطناعي لتحويل التحديات إلى أنظمة تعمل.",
      heroImageUrl: "",
      primaryCta: "ابدأ مشروعك",
      secondaryCta: "استكشف الخدمات",
      servicesTitle: "خدمات مصممة للنمو",
      whyTitle: "لسنا مجرد مطورين",
      whyText:
        "نفهم هدفك التجاري أولًا، ثم نبني التقنية التي تخدمه. لذلك تكون الحلول أوضح، أسرع، وأقرب للنتيجة.",
      processTitle: "كيف نعمل؟",
      process: ["نفهم احتياجك", "نرسم الحل", "نبني النظام", "نطوره معك"],
    },
    en: {
      badge: "Qyasat CMS",
      title: "We turn ideas into digital systems that grow with your business.",
      subtitle:
        "We build solutions that combine business development, technical marketing, software, automation, and AI to turn challenges into working systems.",
      heroImageUrl: "",
      primaryCta: "Start your project",
      secondaryCta: "Explore services",
      servicesTitle: "Services built for growth",
      whyTitle: "More than developers",
      whyText:
        "We understand your business goal first, then build the technology that serves it. That makes the solution clearer, faster, and closer to results.",
      processTitle: "How we work",
      process: ["Understand", "Design", "Build", "Improve"],
    },
  },
  services: {
    items: [
      {
        id: "business-development",
        title: { ar: "تطوير أعمال", en: "Business Development" },
        description: {
          ar: "تحليل النموذج، تحسين التشغيل، وبناء مسارات نمو أوضح.",
          en: "Business model analysis, operational improvement, and clearer growth paths.",
        },
        imageUrl: "",
        isActive: true,
        order: 1,
      },
      {
        id: "technical-marketing",
        title: { ar: "حلول تسويقية تقنية", en: "Technical Marketing Solutions" },
        description: {
          ar: "صفحات هبوط، تتبع أداء، حملات ذكية، وتحسين التحويل.",
          en: "Landing pages, tracking, smart campaigns, and conversion optimization.",
        },
        imageUrl: "",
        isActive: true,
        order: 2,
      },
      {
        id: "technical-development",
        title: { ar: "تطوير تقني", en: "Technical Development" },
        description: {
          ar: "مواقع، منصات، SaaS، لوحات تحكم، وربط أنظمة.",
          en: "Websites, platforms, SaaS, dashboards, and system integrations.",
        },
        imageUrl: "",
        isActive: true,
        order: 3,
      },
      {
        id: "automation",
        title: { ar: "أتمتة", en: "Automation" },
        description: {
          ar: "تحويل المهام المتكررة إلى أنظمة تعمل تلقائيًا.",
          en: "Turning repetitive work into automated systems.",
        },
        imageUrl: "",
        isActive: true,
        order: 4,
      },
      {
        id: "ai",
        title: { ar: "ذكاء اصطناعي", en: "Artificial Intelligence" },
        description: {
          ar: "وكلاء ذكيون، ردود، تحليل، محتوى، ومساعدة في القرار.",
          en: "AI agents, replies, analysis, content, and decision support.",
        },
        imageUrl: "",
        isActive: true,
        order: 5,
      },
    ],
  },
  seo: {
    ar: {
      siteTitle: "قياسات | تطوير أعمال وتقنية وذكاء اصطناعي",
      description: "حلول تطوير أعمال، تسويق تقني، أتمتة، وذكاء اصطناعي.",
      keywords: "تطوير أعمال, ذكاء اصطناعي, أتمتة, تطوير مواقع, تسويق تقني",
      ogTitle: "قياسات",
      ogDescription: "نحوّل الأفكار إلى أنظمة رقمية تنمو مع عملك.",
    },
    en: {
      siteTitle: "Qyasat | Business, Technology and AI",
      description: "Business development, technical marketing, automation, and AI solutions.",
      keywords: "business development, AI, automation, web development, technical marketing",
      ogTitle: "Qyasat",
      ogDescription: "We turn ideas into digital systems that grow with your business.",
    },
  },
  pixels: [],
  tracking: defaultTrackingSettings,
};

const contentPath = path.join(process.cwd(), "storage/private/site-content.json");

async function readLocalSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(contentPath, "utf8");
    return mergeContent(JSON.parse(raw));
  } catch {
    return defaultContent;
  }
}

export async function readSiteContent(): Promise<SiteContent> {
  noStore();
  const local = await readLocalSiteContent();
  if (isFirebaseAdminConfigured()) {
    try {
      const stored = await readCmsDocument<Partial<SiteContent>>("site-content");
      return stored ? mergeContent({ ...local, ...stored }) : local;
    } catch (error) {
      console.error("SITE_CONTENT_FIREBASE_READ_FAILED", error);
      return local;
    }
  }
  return local;
}

export async function writeSiteContent(content: Partial<SiteContent>) {
  const current = await readSiteContent();
  const merged = mergeContent({
    ...current,
    ...content,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) return writeCmsDocument("site-content", merged);
  requirePersistentStorage();
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  return merged;
}

function normalizeService(item: Partial<ServiceItem>, index: number): ServiceItem {
  const fallback = defaultContent.services.items[index] || defaultContent.services.items[0];

  return {
    id: item.id || fallback.id || `service-${index + 1}`,
    title: {
      ar: item.title?.ar || fallback.title.ar || "",
      en: item.title?.en || fallback.title.en || "",
    },
    description: {
      ar: item.description?.ar || fallback.description.ar || "",
      en: item.description?.en || fallback.description.en || "",
    },
    imageUrl: item.imageUrl || "",
    isActive: typeof item.isActive === "boolean" ? item.isActive : true,
    order: typeof item.order === "number" ? item.order : index + 1,
  };
}

export function mergeContent(input: Partial<SiteContent>): SiteContent {
  const services = input.services?.items?.length
    ? input.services.items.map(normalizeService)
    : defaultContent.services.items;

  return {
    ...defaultContent,
    ...input,
    settings: {
      brand: {
        ...defaultContent.settings.brand,
        ...(input.settings?.brand || {}),
      },
      contact: {
        ...defaultContent.settings.contact,
        ...(input.settings?.contact || {}),
      },
      social: {
        ...defaultContent.settings.social,
        ...(input.settings?.social || {}),
      },
    },
    home: {
      ar: { ...defaultContent.home.ar, ...(input.home?.ar || {}) },
      en: { ...defaultContent.home.en, ...(input.home?.en || {}) },
    },
    services: {
      items: services,
    },
    seo: {
      ar: { ...defaultContent.seo.ar, ...(input.seo?.ar || {}) },
      en: { ...defaultContent.seo.en, ...(input.seo?.en || {}) },
    },
    pixels: input.pixels || defaultContent.pixels,
    tracking: {
      ...defaultTrackingSettings,
      ...(input.tracking || {}),
      ga4: { ...defaultTrackingSettings.ga4, ...(input.tracking?.ga4 || {}) },
      gtm: { ...defaultTrackingSettings.gtm, ...(input.tracking?.gtm || {}) },
      meta: { ...defaultTrackingSettings.meta, ...(input.tracking?.meta || {}) },
      tiktok: { ...defaultTrackingSettings.tiktok, ...(input.tracking?.tiktok || {}) },
      automaticEvents: {
        ...defaultTrackingSettings.automaticEvents,
        ...(input.tracking?.automaticEvents || {}),
      },
      clarity: { ...defaultTrackingSettings.clarity, ...(input.tracking?.clarity || {}) },
    },
  };
}
