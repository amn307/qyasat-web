import { promises as fs } from "fs";
import path from "path";

export type HomepageTheme = {
  background: string;
  heroBackground: string;
  surface: string;
  card: string;
  dark: string;
  accent: string;
  accentDark: string;
  muted: string;
  light: string;
};

export type HomepageShowcaseItem = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  tag: string;
};

export type HomepageTextItem = {
  title: string;
  description: string;
};

export type HomepageSettings = {
  theme: HomepageTheme;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  showcase: HomepageShowcaseItem[];
  services: HomepageTextItem[];
  process: string[];
  values: string[];
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  updatedAt: string;
};

const dataFile = path.join(process.cwd(), "data", "homepage-settings.json");

export const defaultHomepageSettings: HomepageSettings = {
  theme: {
    background: "#f6f0e7",
    heroBackground: "#efe4d4",
    surface: "#ffffff",
    card: "#17120c",
    dark: "#17120c",
    accent: "#d8b579",
    accentDark: "#936934",
    muted: "#6b5741",
    light: "#ffffff",
  },
  hero: {
    badge: "استوديو تقني لبناء المنصات القابلة للنمو",
    title: "نصمم ونبني حضورك الرقمي كمنصة أعمال متكاملة",
    subtitle:
      "نساعد المشاريع والشركات على تحويل أفكارها إلى مواقع ومنصات ولوحات تحكم واضحة، أنيقة، قابلة للإدارة، ومبنية للنمو.",
    primaryLabel: "ناقش مشروعك",
    primaryHref: "#contact",
    secondaryLabel: "ماذا نقدم؟",
    secondaryHref: "#services",
  },
  showcase: [
    {
      title: "Barcode Platform",
      subtitle: "منصة طلبات، نقاط، دفع، ولوحة إدارة",
      href: "https://www.barcode.sa",
      image: "/showcase/barcode-platform.svg",
      tag: "Commerce",
    },
    {
      title: "ITQAN Workshops",
      subtitle: "منصة ورش، تسجيل، محتوى، وتجربة مستخدم",
      href: "https://itqanws.com",
      image: "/showcase/itqan-workshops.svg",
      tag: "Workshops",
    },
    {
      title: "Presence CMS",
      subtitle: "موقع شخصي ديناميكي ولوحة تحكم للمحتوى",
      href: "https://sarah.qyasat.sa",
      image: "/showcase/presence-cms.svg",
      tag: "CMS",
    },
    {
      title: "SCH Planner",
      subtitle: "إدارة محتوى، مراحل عمل، واعتمادات",
      href: "https://sch.qyasat.sa",
      image: "/showcase/sch-planner.svg",
      tag: "Operations",
    },
  ],
  services: [
    {
      title: "تطوير المنصات الرقمية",
      description:
        "نبني مواقع، بوابات، لوحات تحكم، ومتاجر رقمية بمنطق منتج قابل للنمو والإدارة، وليس مجرد صفحات ثابتة.",
    },
    {
      title: "الأتمتة والذكاء الاصطناعي",
      description:
        "نحوّل الأعمال المتكررة إلى تدفقات ذكية: رسائل، وكلاء، تقارير، تنبيهات، وتحليل يساعدك على اتخاذ القرار.",
    },
    {
      title: "تجربة المستخدم والهوية الرقمية",
      description:
        "نرتب الواجهة، المحتوى، الرسالة، ومسار العميل حتى يصبح الموقع واضحًا ومقنعًا ومناسبًا للعلامة.",
    },
    {
      title: "SEO والنمو الرقمي",
      description:
        "نبني الموقع ببنية قابلة للفهرسة، عناوين واضحة، بيانات منظمة، محتوى قابل للتوسع، وتجربة تساعد على الظهور.",
    },
  ],
  process: [
    "نفهم المشروع والهدف التجاري الحقيقي.",
    "نرتب الرسالة والمحتوى ومسار الزائر.",
    "نصمم واجهة نظيفة وراقية قابلة للإقناع.",
    "نطوّر النظام بلوحة تحكم وإدارة قابلة للتوسع.",
    "نربط SEO والتحليلات والتحسين المستمر.",
  ],
  values: [
    "وضوح قبل الزخرفة",
    "تجربة مستخدم تقود للقرار",
    "منصة قابلة للإدارة",
    "تصميم مناسب للثقة والنمو",
  ],
  contact: {
    eyebrow: "تواصل معنا",
    title: "إذا تريد موقع قياسات مثل هذا الاتجاه، نثبته ونبدأ نعممه",
    subtitle:
      "بعدها ننقل التصميم إلى الصفحة الرئيسية، ثم نعمل نسخة إنجليزية، ثم نرتب لوحة التحكم بنفس الهوية.",
  },
  updatedAt: new Date().toISOString(),
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function mergeSettings(value: unknown): HomepageSettings {
  if (!isObject(value)) return defaultHomepageSettings;

  const theme = isObject(value.theme) ? value.theme : {};
  const hero = isObject(value.hero) ? value.hero : {};
  const contact = isObject(value.contact) ? value.contact : {};

  return {
    theme: {
      background: asString(theme.background, defaultHomepageSettings.theme.background),
      heroBackground: asString(theme.heroBackground, defaultHomepageSettings.theme.heroBackground),
      surface: asString(theme.surface, defaultHomepageSettings.theme.surface),
      card: asString(theme.card, defaultHomepageSettings.theme.card),
      dark: asString(theme.dark, defaultHomepageSettings.theme.dark),
      accent: asString(theme.accent, defaultHomepageSettings.theme.accent),
      accentDark: asString(theme.accentDark, defaultHomepageSettings.theme.accentDark),
      muted: asString(theme.muted, defaultHomepageSettings.theme.muted),
      light: asString(theme.light, defaultHomepageSettings.theme.light),
    },
    hero: {
      badge: asString(hero.badge, defaultHomepageSettings.hero.badge),
      title: asString(hero.title, defaultHomepageSettings.hero.title),
      subtitle: asString(hero.subtitle, defaultHomepageSettings.hero.subtitle),
      primaryLabel: asString(hero.primaryLabel, defaultHomepageSettings.hero.primaryLabel),
      primaryHref: asString(hero.primaryHref, defaultHomepageSettings.hero.primaryHref),
      secondaryLabel: asString(hero.secondaryLabel, defaultHomepageSettings.hero.secondaryLabel),
      secondaryHref: asString(hero.secondaryHref, defaultHomepageSettings.hero.secondaryHref),
    },
    showcase: Array.isArray(value.showcase) ? (value.showcase as HomepageShowcaseItem[]) : defaultHomepageSettings.showcase,
    services: Array.isArray(value.services) ? (value.services as HomepageTextItem[]) : defaultHomepageSettings.services,
    process: Array.isArray(value.process) ? (value.process as string[]) : defaultHomepageSettings.process,
    values: Array.isArray(value.values) ? (value.values as string[]) : defaultHomepageSettings.values,
    contact: {
      eyebrow: asString(contact.eyebrow, defaultHomepageSettings.contact.eyebrow),
      title: asString(contact.title, defaultHomepageSettings.contact.title),
      subtitle: asString(contact.subtitle, defaultHomepageSettings.contact.subtitle),
    },
    updatedAt: asString(value.updatedAt, defaultHomepageSettings.updatedAt),
  };
}

export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return mergeSettings(JSON.parse(raw));
  } catch {
    await saveHomepageSettings(defaultHomepageSettings);
    return defaultHomepageSettings;
  }
}

export async function saveHomepageSettings(settings: HomepageSettings) {
  const nextSettings = mergeSettings({
    ...settings,
    updatedAt: new Date().toISOString(),
  });

  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(nextSettings, null, 2), "utf8");

  return nextSettings;
}

export async function resetHomepageSettings() {
  const nextSettings = {
    ...defaultHomepageSettings,
    updatedAt: new Date().toISOString(),
  };

  await saveHomepageSettings(nextSettings);
  return nextSettings;
}
