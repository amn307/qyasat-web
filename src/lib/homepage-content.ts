import fs from "node:fs";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { readCmsDocument, writeCmsDocument, requirePersistentStorage } from "@/lib/firebase/cms-store";

export type HomeLink = {
  label: string;
  href: string;
};

export type HomeCard = {
  id?: string;
  icon?: string;
  title: string;
  description: string;
  tag?: string;
  imageUrl?: string;
  isActive?: boolean;
  order?: number;
};

export type HomepageContent = {
  brand: {
    name: string;
    tagline: string;
  };
  nav: HomeLink[];
  hero: {
    kicker: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
  };
  visual: {
    codeTitle: string;
    codeText: string;
    cardTitle: string;
    cardText: string;
  };
  trust: {
    label: string;
    items: Array<{ value: string; label: string }>;
  };
  services: {
    kicker: string;
    title: string;
    description: string;
    items: HomeCard[];
  };
  ai: {
    kicker: string;
    title: string;
    description: string;
    items: HomeCard[];
  };
  process: {
    kicker: string;
    title: string;
    description: string;
    items: HomeCard[];
  };
  work: {
    kicker: string;
    title: string;
    description: string;
    items: HomeCard[];
  };
  estimator: {
    title: string;
    description: string;
    cta: string;
    href: string;
  };
  contact: {
    title: string;
    description: string;
    links: HomeLink[];
  };
};

const CONTENT_DIR = runtimeStoragePath("data");

function getContentPath(locale: "ar" | "en" = "ar") {
  return path.join(CONTENT_DIR, locale === "en" ? "homepage-en.json" : "homepage-ar.json");
}

const fallbackAr: HomepageContent = {
  brand: { name: "Qyasat", tagline: "Software Studio" },
  nav: [
    { label: "الخدمات", href: "#services" },
    { label: "الأتمتة", href: "#ai" },
    { label: "آلية العمل", href: "#process" },
    { label: "الأعمال", href: "#work" },
    { label: "تواصل", href: "#contact" }
  ],
  hero: {
    kicker: "شركة برمجة ومنتجات رقمية",
    titlePrefix: "نحوّل فكرتك إلى",
    titleHighlight: "منصة رقمية أنيقة وقابلة للنمو",
    subtitle: "نبني مواقع، متاجر، لوحات تحكم، أنظمة حجوزات، أتمتة، وتطبيقات ويب حديثة بتجربة استخدام مرتبة وهوية بصرية احترافية.",
    primaryCta: "ابدأ مشروعك",
    primaryHref: "#contact",
    secondaryCta: "شاهد الأعمال",
    secondaryHref: "#work"
  },
  visual: {
    codeTitle: "deploy.qyasat()",
    codeText: "تصميم، تطوير، إطلاق، وتحسين مستمر.",
    cardTitle: "Product Ready",
    cardText: "واجهة، لوحة تحكم، أداء، وتجربة استخدام."
  },
  trust: {
    label: "نشتغل على المنتج كمنظومة كاملة",
    items: [
      { value: "UI/UX", label: "تجربة استخدام واضحة" },
      { value: "Admin", label: "لوحات تحكم عملية" },
      { value: "Automation", label: "أتمتة وذكاء اصطناعي" },
      { value: "Scale", label: "بناء قابل للتوسع" }
    ]
  },
  services: {
    kicker: "الخدمات",
    title: "كل ما تحتاجه لإدارة حضور رقمي احترافي",
    description: "منصة واحدة لتنظيم المحتوى وإدارة الخدمات وتحسين الظهور وقياس الأداء والتعامل مع رسائل العملاء.",
    items: [
      { id: "content-management", icon: "01", title: "إدارة المحتوى", description: "إدارة أقسام الصفحة الرئيسية والنصوص والصفحات والخدمات والتحديثات من لوحة تحكم واضحة.", tag: "CMS", isActive: true, order: 1 },
      { id: "seo-control", icon: "02", title: "إدارة SEO", description: "تعديل العناوين والأوصاف والكلمات المفتاحية وبيانات Open Graph بدون لمس الكود.", tag: "SEO", isActive: true, order: 2 },
      { id: "media-library", icon: "03", title: "مكتبة الوسائط", description: "رفع وتنظيم ومعاينة وإعادة استخدام الشعارات والصور والملفات والأصول التسويقية.", tag: "Media", isActive: true, order: 3 },
      { id: "messages-crm", icon: "04", title: "الرسائل وCRM", description: "جمع رسائل التواصل وتصنيف الطلبات ومتابعتها وحفظ الملاحظات الداخلية.", tag: "CRM", isActive: true, order: 4 }
    ]
  },
  ai: {
    kicker: "الأتمتة والذكاء",
    title: "نضيف الذكاء حيث يخدم العمل فعلًا",
    description: "ندعم الكتابة والتلخيص وتحضير المحتوى والرسائل والتحليل وسير العمل الإداري.",
    items: [
      { id: "content-assistance", title: "مساعدة المحتوى", description: "تحضير المسودات وتحسين الصياغة وتسريع العمل اليومي على المحتوى." },
      { id: "message-writer", title: "كاتب الرسائل", description: "إنشاء نصوص واتساب والبريد والرسائل والموقع بالنبرة والبنية المناسبة." },
      { id: "workflow-automation", title: "أتمتة سير العمل", description: "تقليل الخطوات اليدوية المتكررة وربط المحتوى والرسائل والعمليات." }
    ]
  },
  process: {
    kicker: "آلية العمل",
    title: "من الإعداد إلى التشغيل اليومي",
    description: "مسار واضح لإطلاق المنصة وإدارتها وتحسينها باستمرار.",
    items: [
      { id: "configure", icon: "01", title: "الإعداد", description: "ضبط الهوية والمحتوى والصفحات والخدمات وSEO والوسائط والتتبع." },
      { id: "publish", icon: "02", title: "النشر", description: "إطلاق التحديثات بسرعة عبر بنية مستقرة وواجهة واضحة." },
      { id: "measure", icon: "03", title: "القياس", description: "متابعة العملاء المحتملين والأداء والظهور والمؤشرات التشغيلية." },
      { id: "improve", icon: "04", title: "التحسين", description: "استخدام الملاحظات والبيانات لتحسين الصفحات والرسائل ومسارات التحويل." }
    ]
  },
  work: {
    kicker: "الأعمال",
    title: "مصمم لأنظمة أعمال حقيقية",
    description: "قياسات ليس مجرد واجهة موقع؛ بل طبقة تحكم للمحتوى والعمليات والنمو.",
    items: [
      { id: "public-website", tag: "Platform", title: "الموقع العام", description: "موقع ثنائي اللغة مصقول بأقسام منظمة ومسارات تحويل واضحة." },
      { id: "control-panel", tag: "Admin", title: "لوحة التحكم", description: "لوحة لإدارة المحتوى والوسائط وSEO والخدمات والرسائل والإعدادات." },
      { id: "measurement-layer", tag: "Growth", title: "طبقة القياس", description: "بيكسلات التتبع وبيانات SEO وصندوق الرسائل والتحليلات." }
    ]
  },
  estimator: {
    title: "لا تحتاج شرح تقني معقد",
    description: "احكِ لنا هدفك التجاري، ونحن نحوله إلى نطاق عمل واضح.",
    cta: "اطلب تقدير مشروع",
    href: "#contact"
  },
  contact: {
    title: "جاهز تبني منتجك القادم؟",
    description: "أرسل فكرة المشروع أو المشكلة الحالية.",
    links: [
      { label: "تواصل واتساب", href: "https://wa.me/" },
      { label: "راسلنا", href: "mailto:hello@qyasat.sa" }
    ]
  }
};

const fallbackEn: HomepageContent = {
  brand: { name: "Qyasat", tagline: "Software Studio" },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Automation", href: "#ai" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    kicker: "Content Management and Measurement Platform",
    titlePrefix: "Build a smarter",
    titleHighlight: "CMS for content, data, and growth",
    subtitle: "Qyasat CMS gives teams a clean control center for content, services, media, SEO, tracking pixels, messages, and AI-assisted workflows.",
    primaryCta: "Start with Qyasat",
    primaryHref: "#contact",
    secondaryCta: "Explore the platform",
    secondaryHref: "#services"
  },
  visual: {
    codeTitle: "qyasatCore.deploy()",
    codeText: "Content, analytics, automation, and continuous improvement.",
    cardTitle: "CMS Ready",
    cardText: "Content, media, SEO, messages, services, and dashboards."
  },
  trust: {
    label: "Built as a complete operating system for modern websites",
    items: [
      { value: "CMS", label: "Content control" },
      { value: "SEO", label: "Search visibility" },
      { value: "Media", label: "Asset library" },
      { value: "AI", label: "Assisted workflows" }
    ]
  },
  services: {
    kicker: "Services",
    title: "Everything you need to run a serious digital presence",
    description: "One platform to organize content, manage services, improve search, track performance, and handle customer messages.",
    items: [
      { id: "content-management", icon: "01", title: "Content Management", description: "Manage homepage sections, site text, pages, services, and updates from a clean control panel.", tag: "CMS", isActive: true, order: 1 },
      { id: "seo-control", icon: "02", title: "SEO Control", description: "Edit titles, descriptions, keywords, Open Graph data, and visibility details without touching code.", tag: "SEO", isActive: true, order: 2 },
      { id: "media-library", icon: "03", title: "Media Library", description: "Upload, organize, preview, and reuse logos, images, files, and marketing assets.", tag: "Media", isActive: true, order: 3 },
      { id: "messages-crm", icon: "04", title: "Messages & CRM", description: "Collect contact messages, classify requests, follow up, and keep internal notes.", tag: "CRM", isActive: true, order: 4 }
    ]
  },
  ai: {
    kicker: "Automation & AI",
    title: "AI where it supports real operations",
    description: "Qyasat can support writing, summarization, content drafts, message preparation, analysis, and admin workflows.",
    items: [
      { id: "content-assistance", title: "Content Assistance", description: "Prepare drafts, improve wording, and speed up daily content operations." },
      { id: "message-writer", title: "Message Writer", description: "Generate WhatsApp, email, SMS, and website copy with the right tone and structure." },
      { id: "workflow-automation", title: "Workflow Automation", description: "Reduce repeated manual steps and connect content, messages, and operations." }
    ]
  },
  process: {
    kicker: "Process",
    title: "From setup to daily operation",
    description: "A clear workflow for launching, managing, and improving the platform.",
    items: [
      { id: "configure", icon: "01", title: "Configure", description: "Set brand, content, pages, services, SEO, media, and tracking." },
      { id: "publish", icon: "02", title: "Publish", description: "Launch updates quickly with a stable structure and clean interface." },
      { id: "measure", icon: "03", title: "Measure", description: "Track leads, performance, visibility, and operational signals." },
      { id: "improve", icon: "04", title: "Improve", description: "Use feedback and data to refine pages, messages, and conversion paths." }
    ]
  },
  work: {
    kicker: "Work",
    title: "Designed for real business systems",
    description: "Qyasat CMS is not just a website shell; it is a control layer for content, operations, and growth.",
    items: [
      { id: "public-website", tag: "Platform", title: "Public Website", description: "A polished bilingual site with structured sections and conversion paths." },
      { id: "control-panel", tag: "Admin", title: "Control Panel", description: "A dashboard for content, media, SEO, services, messages, and settings." },
      { id: "measurement-layer", tag: "Growth", title: "Measurement Layer", description: "Tracking pixels, SEO metadata, message inbox, and future analytics." }
    ]
  },
  estimator: {
    title: "No technical complexity required",
    description: "Tell us your goal, and we turn it into a clear content, system, and growth plan.",
    cta: "Request a project estimate",
    href: "#contact"
  },
  contact: {
    title: "Ready to build your next CMS?",
    description: "Send the project idea, the current problem, or the result you want to reach.",
    links: [
      { label: "Contact on WhatsApp", href: "https://wa.me/" },
      { label: "Email us", href: "mailto:hello@qyasat.sa" }
    ]
  }
};

const fallbackByLocale: Record<"ar" | "en", HomepageContent> = {
  ar: fallbackAr,
  en: fallbackEn,
};


function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? (override as T) : base;
  }

  if (!isPlainObject(base)) {
    return override === undefined || override === null ? base : (override as T);
  }

  const output: Record<string, unknown> = { ...base };

  if (!isPlainObject(override)) {
    return output as T;
  }

  for (const [key, value] of Object.entries(override)) {
    output[key] = deepMerge((base as Record<string, unknown>)[key], value);
  }

  return output as T;
}

function readLocalHomepageContent(locale: "ar" | "en"): HomepageContent {
  const fallback = fallbackByLocale[locale];
  const contentPath = getContentPath(locale);
  try {
    if (!fs.existsSync(contentPath)) return fallback;
    return deepMerge(fallback, JSON.parse(fs.readFileSync(contentPath, "utf8")));
  } catch (error) {
    console.error("HOME_CONTENT_LOCAL_READ_FAILED", error);
    return fallback;
  }
}

function containsArabic(value: string) {
  return /[\u0600-\u06FF]/.test(value);
}

function matchesLocale(content: HomepageContent, locale: "ar" | "en") {
  const sample = [content.hero.kicker, content.hero.titlePrefix, content.hero.titleHighlight, content.services.title].join(" ");
  return locale === "ar" ? containsArabic(sample) : !containsArabic(sample);
}

function hasRequiredHomepageStructure(content: HomepageContent) {
  return Boolean(
    content?.hero?.titlePrefix &&
    content?.hero?.titleHighlight &&
    Array.isArray(content?.nav) && content.nav.length > 0 &&
    Array.isArray(content?.services?.items) && content.services.items.length > 0 &&
    Array.isArray(content?.ai?.items) && content.ai.items.length > 0 &&
    Array.isArray(content?.process?.items) && content.process.items.length > 0 &&
    Array.isArray(content?.work?.items) && content.work.items.length > 0
  );
}

export async function getHomepageContent(locale: "ar" | "en" = "ar"): Promise<HomepageContent> {
  // The local JSON/default content is always the schema source of truth. Firebase
  // stores overrides/persisted CMS values, but connecting Firebase must never
  // change the language or make sections disappear when a document is missing.
  const localBase = readLocalHomepageContent(locale);

  if (isFirebaseAdminConfigured()) {
    try {
      const stored = await readCmsDocument<HomepageContent>(`homepage-${locale}`);
      if (stored) {
        const merged = deepMerge(localBase, stored);
        if (matchesLocale(merged, locale) && hasRequiredHomepageStructure(merged)) {
          return merged;
        }
        console.warn(`HOME_CONTENT_FIREBASE_INVALID_${locale.toUpperCase()}: reseeding from local content.`);
      }

      // First Firebase connection (or a stale/invalid document): seed Firestore
      // from the exact content that already worked before Firebase was connected.
      await writeCmsDocument(`homepage-${locale}`, localBase);
      return localBase;
    } catch (error) {
      // A temporary Firestore problem should not take the public website down or
      // change its language. Keep rendering the known-good local content.
      console.error("HOME_CONTENT_FIREBASE_READ_FAILED", error);
      return localBase;
    }
  }

  return localBase;
}

export async function saveHomepageContent(input: unknown, locale: "ar" | "en" = "ar"): Promise<HomepageContent> {
  const base = readLocalHomepageContent(locale);
  const nextContent = deepMerge(base, input);
  if (isFirebaseAdminConfigured()) return writeCmsDocument(`homepage-${locale}`, nextContent);
  requirePersistentStorage();
  const contentPath = getContentPath(locale);
  fs.mkdirSync(path.dirname(contentPath), { recursive: true });
  fs.writeFileSync(contentPath, JSON.stringify(nextContent, null, 2), "utf8");
  return nextContent;
}
