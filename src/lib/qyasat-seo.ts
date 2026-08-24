import type { Metadata } from "next";

export const SITE_URL = "https://qyasat.sa";
export const SITE_NAME = "قياسات";
export const BRAND_HANDLE = "@moamen.fz";

export const defaultArabicDescription =
  "قياسات تبني منصات رقمية، لوحات تحكم، أتمتة، ذكاء اصطناعي، حلول SaaS، وتحسين SEO للشركات والمشاريع الطموحة.";

export const defaultEnglishDescription =
  "قياسات builds digital platforms, dashboards, automation, AI solutions, SaaS products, and SEO-ready systems for ambitious businesses.";

export const QYASAT_CODE_SERVICES = [
  {
    key: "technical-development",
    arTitle: "تطوير تقني",
    enTitle: "Technical Development",
    arDescription: "منصات ويب، لوحات تحكم، متاجر، أنظمة حجز، وبوابات SaaS قابلة للتوسع.",
    enDescription: "Web platforms, dashboards, stores, booking systems, and scalable SaaS portals.",
  },
  {
    key: "automation-ai",
    arTitle: "أتمتة وذكاء اصطناعي",
    enTitle: "Automation & AI",
    arDescription: "وكلاء ذكيون، ردود آلية، تحليل بيانات، وربط العمليات اليومية بتدفقات عمل قابلة للقياس.",
    enDescription: "Smart agents, automated replies, analytics, and measurable connected workflows.",
  },
  {
    key: "technical-marketing",
    arTitle: "حلول تسويقية تقنية",
    enTitle: "Technical Marketing Solutions",
    arDescription: "CRM، صفحات هبوط، تتبع بكسلات، تحسين تحويل، وربط الحملات بنتائج واضحة.",
    enDescription: "CRM, landing pages, pixels, conversion optimization, and campaign-to-result tracking.",
  },
  {
    key: "business-development",
    arTitle: "تطوير أعمال",
    enTitle: "Business Development",
    arDescription: "تحويل الأفكار إلى خرائط منتج، نماذج تشغيل، وخطط نمو عملية قابلة للتنفيذ.",
    enDescription: "Turn ideas into product roadmaps, operating models, and executable growth plans.",
  },
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildHomeMetadata(locale: "ar" | "en"): Metadata {
  const isArabic = locale === "ar";
  const path = isArabic ? "/ar" : "/en";
  const title = isArabic
    ? "قياسات | إدارة محتوى، قياس أداء، أتمتة، وتحليلات"
    : "قياسات | CMS, Analytics, Measurement, and Automation";
  const description = isArabic ? defaultArabicDescription : defaultEnglishDescription;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Technology",
    keywords: isArabic
      ? [
          "قياسات",
          "تطوير مواقع",
          "تطوير تقني",
          "ذكاء اصطناعي",
          "أتمتة",
          "SEO",
          "SaaS",
          "لوحات تحكم",
          "تطوير أعمال",
          "حلول تسويقية تقنية",
        ]
      : [
          "قياسات",
          "web development",
          "technical development",
          "AI automation",
          "SEO",
          "SaaS",
          "dashboards",
          "business development",
          "technical marketing solutions",
        ],
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ar: absoluteUrl("/ar"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/ar"),
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
      alternateLocale: isArabic ? ["en_US"] : ["ar_SA"],
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: absoluteUrl("/brand/qyasat-logo.svg"),
          width: 520,
          height: 130,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/brand/qyasat-logo.svg")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function buildOrganizationJsonLd(locale: "ar" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    description: locale === "ar" ? defaultArabicDescription : defaultEnglishDescription,
    sameAs: ["https://github.com/Moamenfz"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["Arabic", "English"],
        url: absoluteUrl(locale === "ar" ? "/ar#contact" : "/en#contact"),
      },
    ],
  };
}

export function buildWebsiteJsonLd(locale: "ar" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildProfessionalServiceJsonLd(locale: "ar" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professional-service`,
    name: SITE_NAME,
    url: SITE_URL,
    areaServed: ["Saudi Arabia", "GCC", "Middle East"],
    serviceType: locale === "ar" ? "تطوير تقني وأتمتة وذكاء اصطناعي" : "Technology, automation, and AI development",
    description: locale === "ar" ? defaultArabicDescription : defaultEnglishDescription,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "ar" ? "خدمات قياسات" : "Qyasat Services",
      itemListElement: QYASAT_CODE_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: locale === "ar" ? service.arTitle : service.enTitle,
          description: locale === "ar" ? service.arDescription : service.enDescription,
        },
      })),
    },
  };
}

export function buildWebPageJsonLd(locale: "ar" | "en", path: string) {
  const isArabic = locale === "ar";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: isArabic
      ? "قياسات | إدارة محتوى، قياس أداء، أتمتة، وتحليلات"
      : "قياسات | CMS, Analytics, Measurement, and Automation",
    description: isArabic ? defaultArabicDescription : defaultEnglishDescription,
    inLanguage: isArabic ? "ar-SA" : "en-US",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#professional-service`,
    },
  };
}

export function buildBreadcrumbJsonLd(locale: "ar" | "en", path: string) {
  const isArabic = locale === "ar";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isArabic ? "الرئيسية" : "Home",
        item: absoluteUrl(path),
      },
    ],
  };
}
