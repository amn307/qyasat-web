import { readCmsDocument, writeCmsDocument } from "@/lib/firebase/cms-store";

export type ServiceVisualType =
  | "automation"
  | "profile"
  | "content"
  | "brand"
  | "social"
  | "seo"
  | "saas"
  | "ads"
  | "strategy"
  | "hosting"
  | "marketing";

export type ServicePageItem = {
  id: string;
  category: { en: string; ar: string };
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  visual: ServiceVisualType;
  isActive: boolean;
  order: number;
};

const CMS_KEY = "services-page";

export const servicesPageItems: ServicePageItem[] = [
  {
    id: "company-profile",
    category: { en: "BRAND + PRESENTATION", ar: "العلامة + العرض" },
    title: { en: "Company Profile Design", ar: "تصميم بروفايل الشركات" },
    description: {
      en: "A structured company profile that turns your story, positioning, services, and proof into a polished presentation your sales team can actually use.",
      ar: "بروفايل شركة منظم يحول قصتك ومكانتك وخدماتك وأعمالك إلى عرض احترافي يمكن لفريق المبيعات استخدامه بفعالية.",
    },
    features: {
      en: ["Content structure", "Visual direction", "Bilingual layouts", "Sales-ready PDF"],
      ar: ["هيكلة المحتوى", "اتجاه بصري", "تصميم ثنائي اللغة", "ملف جاهز للمبيعات"],
    },
    visual: "profile",
    isActive: true,
    order: 1,
  },
  {
    id: "website-content-management",
    category: { en: "WEBSITE + CONTENT", ar: "الموقع + المحتوى" },
    title: { en: "Website Content Management", ar: "إدارة محتوى المواقع" },
    description: {
      en: "We organize the publishing system behind your website so your team can update pages, services, media, SEO, and campaigns without relying on a developer for every change.",
      ar: "ننظم نظام النشر خلف موقعك ليتمكن فريقك من تحديث الصفحات والخدمات والوسائط وSEO والحملات دون الاعتماد على المطور في كل تعديل.",
    },
    features: {
      en: ["Custom CMS", "Media library", "SEO controls", "Publishing workflow"],
      ar: ["نظام CMS مخصص", "مكتبة وسائط", "إدارة SEO", "مسار نشر"],
    },
    visual: "content",
    isActive: true,
    order: 2,
  },
  {
    id: "brand-identity",
    category: { en: "BRAND IDENTITY", ar: "الهوية التجارية" },
    title: { en: "Brand Identity Design", ar: "تصميم الهوية التجارية" },
    description: {
      en: "A coherent visual system built around how your company should look, sound, and stay consistent across digital, print, sales, and marketing touchpoints.",
      ar: "نظام بصري متكامل يحدد كيف تظهر شركتك وتحافظ على اتساقها عبر القنوات الرقمية والمطبوعات والمبيعات والتسويق.",
    },
    features: {
      en: ["Logo system", "Typography", "Color system", "Brand guidelines"],
      ar: ["نظام الشعار", "الخطوط", "نظام الألوان", "دليل الهوية"],
    },
    visual: "brand",
    isActive: true,
    order: 3,
  },
  {
    id: "social-media-marketing",
    category: { en: "SOCIAL + CONTENT", ar: "التواصل + المحتوى" },
    title: { en: "Social Media Marketing", ar: "التسويق عبر وسائل التواصل الاجتماعي" },
    description: {
      en: "Strategy, content planning, publishing, community management, and campaign execution designed around measurable audience and business goals.",
      ar: "استراتيجية وتخطيط محتوى ونشر وإدارة مجتمع وحملات مصممة حول أهداف قابلة للقياس للجمهور والأعمال.",
    },
    features: {
      en: ["Content planning", "Publishing", "Community", "Performance reports"],
      ar: ["تخطيط المحتوى", "النشر", "إدارة المجتمع", "تقارير الأداء"],
    },
    visual: "social",
    isActive: true,
    order: 4,
  },
  {
    id: "seo",
    category: { en: "SEARCH + GROWTH", ar: "البحث + النمو" },
    title: { en: "Search Engine Optimization (SEO)", ar: "تهيئة المواقع لمحركات البحث SEO" },
    description: {
      en: "Technical, content, and on-page improvements that make your website easier to discover, understand, and rank for the searches that matter to your business.",
      ar: "تحسينات تقنية ومحتوى وتهيئة داخلية تجعل موقعك أسهل للاكتشاف والفهم والظهور في عمليات البحث المهمة لأعمالك.",
    },
    features: {
      en: ["Technical SEO", "Keyword mapping", "On-page SEO", "Reporting"],
      ar: ["SEO تقني", "خريطة الكلمات", "تهيئة الصفحات", "التقارير"],
    },
    visual: "seo",
    isActive: true,
    order: 5,
  },
  {
    id: "paid-advertising",
    category: { en: "PAID MEDIA", ar: "الإعلانات المدفوعة" },
    title: { en: "Paid Advertising Campaigns", ar: "الحملات الإعلانية المدفوعة" },
    description: {
      en: "Campaign planning, setup, tracking, creative testing, and optimization across the channels where your highest-value customers are most likely to convert.",
      ar: "تخطيط وإعداد وتتبع واختبار وتحسين الحملات عبر القنوات التي يتواجد فيها العملاء الأعلى قيمة والأكثر احتمالاً للتحويل.",
    },
    features: {
      en: ["Meta Ads", "Google Ads", "Tracking", "Creative testing"],
      ar: ["إعلانات Meta", "إعلانات Google", "التتبع", "اختبار الإعلانات"],
    },
    visual: "ads",
    isActive: true,
    order: 6,
  },
  {
    id: "digital-marketing-strategy",
    category: { en: "STRATEGY + MEASUREMENT", ar: "الاستراتيجية + القياس" },
    title: { en: "Digital Marketing Strategy", ar: "استراتيجية التسويق الرقمي" },
    description: {
      en: "A practical marketing plan that connects positioning, audiences, channels, content, paid media, measurement, and budget to clear business objectives.",
      ar: "خطة تسويق عملية تربط التموضع والجمهور والقنوات والمحتوى والإعلانات والقياس والميزانية بأهداف أعمال واضحة.",
    },
    features: {
      en: ["Market analysis", "Channel strategy", "KPIs", "Execution roadmap"],
      ar: ["تحليل السوق", "استراتيجية القنوات", "مؤشرات الأداء", "خارطة التنفيذ"],
    },
    visual: "strategy",
    isActive: true,
    order: 7,
  },
  {
    id: "marketing-content",
    category: { en: "CONTENT + CREATIVE", ar: "المحتوى + الإبداع" },
    title: { en: "Marketing Content", ar: "المحتوى التسويقي" },
    description: {
      en: "Content systems for campaigns and always-on communication, combining messaging, copywriting, visual direction, and formats built for each channel.",
      ar: "أنظمة محتوى للحملات والتواصل المستمر تجمع الرسائل والكتابة والاتجاه البصري والصيغ المناسبة لكل قناة.",
    },
    features: {
      en: ["Copywriting", "Campaign content", "Scripts", "Visual content"],
      ar: ["كتابة المحتوى", "محتوى الحملات", "السيناريوهات", "المحتوى البصري"],
    },
    visual: "marketing",
    isActive: true,
    order: 8,
  },
];

function cleanString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function cleanStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  return cleaned.length ? cleaned : fallback;
}

function normalizeItem(raw: Partial<ServicePageItem> | undefined, fallback: ServicePageItem, index: number): ServicePageItem {
  const visualOptions: ServiceVisualType[] = ["automation", "profile", "content", "brand", "social", "seo", "saas", "ads", "strategy", "hosting", "marketing"];
  const visual = raw?.visual && visualOptions.includes(raw.visual) ? raw.visual : fallback.visual;

  return {
    id: cleanString(raw?.id, fallback.id).trim() || fallback.id,
    category: {
      en: cleanString(raw?.category?.en, fallback.category.en),
      ar: cleanString(raw?.category?.ar, fallback.category.ar),
    },
    title: {
      en: cleanString(raw?.title?.en, fallback.title.en),
      ar: cleanString(raw?.title?.ar, fallback.title.ar),
    },
    description: {
      en: cleanString(raw?.description?.en, fallback.description.en),
      ar: cleanString(raw?.description?.ar, fallback.description.ar),
    },
    features: {
      en: cleanStringArray(raw?.features?.en, fallback.features.en),
      ar: cleanStringArray(raw?.features?.ar, fallback.features.ar),
    },
    visual,
    isActive: raw?.isActive !== false,
    order: typeof raw?.order === "number" && Number.isFinite(raw.order) ? raw.order : index + 1,
  };
}

export async function readServicesPageItems(): Promise<ServicePageItem[]> {
  const stored = await readCmsDocument<ServicePageItem[]>(CMS_KEY);
  if (!Array.isArray(stored) || stored.length === 0) return servicesPageItems;

  return stored
    .map((item, index) => normalizeItem(item, servicesPageItems[index] || servicesPageItems[0], index))
    .sort((a, b) => a.order - b.order);
}

export async function saveServicesPageItems(input: ServicePageItem[]): Promise<ServicePageItem[]> {
  const normalized = input.map((item, index) => {
    const fallback = servicesPageItems.find((fallbackItem) => fallbackItem.id === item.id) || servicesPageItems[index] || servicesPageItems[0];
    return normalizeItem(item, fallback, index);
  });
  await writeCmsDocument(CMS_KEY, normalized);
  return normalized.sort((a, b) => a.order - b.order);
}
