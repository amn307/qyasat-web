import fs from "node:fs";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { readCmsDocument, writeCmsDocument, requirePersistentStorage } from "@/lib/firebase/cms-store";

export type ProjectAccent = "primary" | "accent" | "neutral";

export type ProjectItem = {
  name: string;
  category: string;
  description: string;
  features: string[];
  accent: ProjectAccent;
};

export type ProjectOutcome = {
  number: string;
  title: string;
  text: string;
};

export type ProjectsContent = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  intro: string;
  primary: string;
  secondary: string;
  digitalKicker: string;
  digitalTitle: string;
  digitalText: string;
  opsKicker: string;
  opsTitle: string;
  opsText: string;
  outcomeKicker: string;
  outcomeTitle: string;
  outcomes: ProjectOutcome[];
  ctaTitle: string;
  ctaText: string;
  cta: string;
  cmsLabel: string;
  liveLabel: string;
  workflowLabel: string;
  digitalProjects: ProjectItem[];
  operatingProjects: ProjectItem[];
};

const fallback: Record<"ar" | "en", ProjectsContent> = {
  ar: {
    eyebrow: "أعمال قياسات",
    titleA: "منتجات رقمية",
    titleB: "تعمل داخل الشركة، لا على الشاشة فقط.",
    intro: "نصمم ونبني مواقع وأنظمة إدارة محتوى وحلول تشغيلية تربط تجربة العميل بالعمل اليومي للفريق.",
    primary: "ابدأ مشروعًا معنا",
    secondary: "استكشف المشاريع",
    digitalKicker: "Websites & CMS",
    digitalTitle: "مواقع وأنظمة إدارة محتوى مصممة حول طريقة عمل كل شركة",
    digitalText: "من الواجهة العامة إلى لوحة الإدارة: تجربة واحدة متكاملة تساعد الفريق على النشر، التحديث، المتابعة والنمو بدون اعتماد يومي على المطور.",
    opsKicker: "Operating Solutions",
    opsTitle: "حلول تشغيل تحول الخطوات المتفرقة إلى نظام واضح",
    opsText: "نحلل سير العمل ونبني الأدوات التي تقلل الإدخال اليدوي، تجمع البيانات، وتمنح الإدارة رؤية أوضح على العمليات.",
    outcomeKicker: "Built for operation",
    outcomeTitle: "الهدف ليس تسليم موقع. الهدف تسليم طريقة عمل أفضل.",
    outcomes: [
      { number: "01", title: "تحكم داخلي", text: "لوحات إدارة وصلاحيات ومحتوى يمكن للفريق تشغيله بنفسه." },
      { number: "02", title: "عمليات أسرع", text: "أتمتة المهام المتكررة وربط الخطوات التي كانت تعمل بشكل منفصل." },
      { number: "03", title: "بيانات أوضح", text: "تقارير ونقاط متابعة تساعد على اتخاذ قرارات يومية أفضل." },
    ],
    ctaTitle: "لديك عملية داخل الشركة تحتاج ترتيبًا؟",
    ctaText: "أرسل لنا المشكلة كما تحدث اليوم، وسنحولها إلى نطاق منتج أو نظام واضح.",
    cta: "ناقش المشروع",
    cmsLabel: "CMS CONTROL",
    liveLabel: "LIVE WEBSITE",
    workflowLabel: "OPERATIONS",
    digitalProjects: [
      { name: "Presence CMS", category: "Website + Content Management", description: "موقع ديناميكي مع نظام إدارة محتوى يتيح للفريق إدارة الصفحات والمحتوى والحضور الرقمي من لوحة واحدة.", features: ["إدارة المحتوى", "تحديثات فورية", "واجهة متجاوبة"], accent: "primary" },
      { name: "ITQAN Workshops", category: "Website + Registration System", description: "تجربة رقمية للورش تجمع عرض المحتوى والتسجيل وإدارة المشاركين والرسائل ضمن مسار واحد.", features: ["إدارة الورش", "التسجيل", "إدارة المحتوى"], accent: "accent" },
      { name: "Company CMS Suite", category: "Corporate Website + Admin", description: "بنية مواقع مؤسسية مع لوحة إدارة مخصصة للفرق التي تحتاج تحديث المشاريع والخدمات والصور والصفحات بدون تعديل الكود.", features: ["لوحة إدارة", "مكتبة وسائط", "محتوى ثنائي اللغة"], accent: "neutral" },
    ],
    operatingProjects: [
      { name: "Barcode Platform", category: "Ordering + Loyalty + Operations", description: "منصة تربط تجربة الطلب بالولاء والدفع ولوحات الإدارة لمتابعة التشغيل من مكان واحد.", features: ["طلبات", "نقاط ولاء", "لوحة تشغيل"], accent: "primary" },
      { name: "Content Operations", category: "CMS Workflow", description: "نظم داخلية لتنظيم دورة المحتوى من الإنشاء والمراجعة وحتى النشر، مع صلاحيات واضحة ومسار عمل قابل للمتابعة.", features: ["صلاحيات", "حالات العمل", "أرشفة"], accent: "accent" },
      { name: "Business Automation", category: "Workflow + AI", description: "أتمتة للمهام والتقارير والرسائل والعمليات المتكررة مع إمكانية إضافة طبقة ذكاء اصطناعي عندما تقدم قيمة عملية.", features: ["أتمتة", "تقارير", "AI Assist"], accent: "neutral" },
    ],
  },
  en: {
    eyebrow: "Qyasat Work",
    titleA: "Digital products",
    titleB: "built to work inside the business.",
    intro: "We design and build websites, content management systems, and operating solutions that connect the customer experience with the team's daily work.",
    primary: "Start a project",
    secondary: "Explore projects",
    digitalKicker: "Websites & CMS",
    digitalTitle: "Websites and content systems designed around how each company works",
    digitalText: "From the public experience to the admin panel, we build one connected product that helps teams publish, update, manage, and grow without depending on a developer for every change.",
    opsKicker: "Operating Solutions",
    opsTitle: "Operating solutions that turn scattered steps into a clear system",
    opsText: "We study the workflow and build tools that reduce manual entry, connect information, and give management better visibility into daily operations.",
    outcomeKicker: "Built for operation",
    outcomeTitle: "The goal is not to hand over a website. It is to hand over a better way of working.",
    outcomes: [
      { number: "01", title: "Internal control", text: "Admin panels, permissions, and content your team can operate independently." },
      { number: "02", title: "Faster operations", text: "Automate repetitive work and connect steps that used to live in separate tools." },
      { number: "03", title: "Clearer data", text: "Reporting and operational visibility that support better daily decisions." },
    ],
    ctaTitle: "Have an internal process that needs structure?",
    ctaText: "Show us how the problem works today, and we will turn it into a clear product or system scope.",
    cta: "Discuss your project",
    cmsLabel: "CMS CONTROL",
    liveLabel: "LIVE WEBSITE",
    workflowLabel: "OPERATIONS",
    digitalProjects: [
      { name: "Presence CMS", category: "Website + Content Management", description: "A dynamic website with a content management system that lets the team manage pages, content, and digital presence from one place.", features: ["Content management", "Instant updates", "Responsive UI"], accent: "primary" },
      { name: "ITQAN Workshops", category: "Website + Registration System", description: "A digital workshop experience combining content, registration, participant management, and messaging in one flow.", features: ["Workshop admin", "Registration", "Content tools"], accent: "accent" },
      { name: "Company CMS Suite", category: "Corporate Website + Admin", description: "Corporate website architecture with a tailored admin panel for teams that need to update projects, services, media, and pages without touching code.", features: ["Admin dashboard", "Media library", "Bilingual content"], accent: "neutral" },
    ],
    operatingProjects: [
      { name: "Barcode Platform", category: "Ordering + Loyalty + Operations", description: "A platform connecting ordering, loyalty, payments, and admin dashboards so the operation can be managed from one place.", features: ["Ordering", "Loyalty points", "Operations dashboard"], accent: "primary" },
      { name: "Content Operations", category: "CMS Workflow", description: "Internal workflows that structure content from creation and review through publishing, with clear permissions and trackable states.", features: ["Permissions", "Workflow states", "Archive"], accent: "accent" },
      { name: "Business Automation", category: "Workflow + AI", description: "Automation for tasks, reports, messages, and recurring operations, with an AI layer where it creates measurable operational value.", features: ["Automation", "Reporting", "AI Assist"], accent: "neutral" },
    ],
  },
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) return Array.isArray(override) ? (override as T) : base;
  if (!isObject(base)) return override === undefined || override === null ? base : (override as T);
  const out: Record<string, unknown> = { ...base };
  if (!isObject(override)) return out as T;
  for (const [key, value] of Object.entries(override)) out[key] = deepMerge((base as Record<string, unknown>)[key], value);
  return out as T;
}

function filePath(locale: "ar" | "en") {
  return path.join(runtimeStoragePath("data"), `projects-${locale}.json`);
}

function readLocalProjectsContent(locale: "ar" | "en"): ProjectsContent {
  const base = fallback[locale];
  try {
    const location = filePath(locale);
    if (!fs.existsSync(location)) return base;
    return deepMerge(base, JSON.parse(fs.readFileSync(location, "utf8")));
  } catch (error) {
    console.error("PROJECTS_CONTENT_LOCAL_READ_FAILED", error);
    return base;
  }
}

export async function getProjectsContent(locale: "ar" | "en"): Promise<ProjectsContent> {
  const local = readLocalProjectsContent(locale);
  if (isFirebaseAdminConfigured()) {
    try {
      const stored = await readCmsDocument<ProjectsContent>(`projects-${locale}`);
      return stored ? deepMerge(local, stored) : local;
    } catch (error) {
      console.error("PROJECTS_CONTENT_FIREBASE_READ_FAILED", error);
      return local;
    }
  }
  return local;
}

export async function saveProjectsContent(input: unknown, locale: "ar" | "en"): Promise<ProjectsContent> {
  const next = deepMerge(readLocalProjectsContent(locale), input);
  if (isFirebaseAdminConfigured()) return writeCmsDocument(`projects-${locale}`, next);
  requirePersistentStorage();
  const location = filePath(locale);
  fs.mkdirSync(path.dirname(location), { recursive: true });
  fs.writeFileSync(location, JSON.stringify(next, null, 2), "utf8");
  return next;
}
