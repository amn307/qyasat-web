import dotenv from "dotenv";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

dotenv.config({ path: ".env.local" });

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("❌ Missing Firebase Admin env vars in .env.local");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = getFirestore();

const now = FieldValue.serverTimestamp();

await db.doc("site_settings/main").set(
  {
    siteName: "قياسات",
    siteUrl: "https://qyasat.sa",
    logoUrl: "",
    faviconUrl: "",
    primaryEmail: "moamen.fz@gmail.com",
    phone: "",
    whatsappUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    contactEnabled: true,
    defaultLocale: "ar",
    updatedAt: now,
  },
  { merge: true }
);

await db.doc("home_pages/ar").set(
  {
    locale: "ar",
    heroTitle: "نحوّل الأفكار إلى حلول رقمية قابلة للنمو.",
    heroSubtitle:
      "نساعد الشركات ورواد الأعمال على تطوير أعمالهم من خلال التقنية، التسويق الذكي، الأتمتة، والذكاء الاصطناعي.",
    primaryCtaText: "ابدأ مشروعك معنا",
    primaryCtaUrl: "/ar/contact",
    secondaryCtaText: "استكشف الخدمات",
    secondaryCtaUrl: "/ar/services",
    isPublished: true,
    updatedAt: now,
  },
  { merge: true }
);

await db.doc("home_pages/en").set(
  {
    locale: "en",
    heroTitle: "We turn ideas into scalable digital solutions.",
    heroSubtitle:
      "We help businesses grow through technology, smart marketing, automation, and artificial intelligence.",
    primaryCtaText: "Start your project",
    primaryCtaUrl: "/en/contact",
    secondaryCtaText: "Explore services",
    secondaryCtaUrl: "/en/services",
    isPublished: true,
    updatedAt: now,
  },
  { merge: true }
);

const services = [
  {
    id: "business-development",
    slug: "business-development",
    sortOrder: 1,
    title: {
      ar: "تطوير أعمال",
      en: "Business Development",
    },
    description: {
      ar: "نحلل نموذج عملك ونبني مسارًا أوضح للنمو والتشغيل وتحسين تجربة العميل.",
      en: "We analyze your business model and build clearer paths for growth, operations, and customer experience.",
    },
  },
  {
    id: "technical-marketing",
    slug: "technical-marketing",
    sortOrder: 2,
    title: {
      ar: "حلول تسويقية تقنية",
      en: "Technical Marketing Solutions",
    },
    description: {
      ar: "نربط التسويق بالتقنية من خلال صفحات هبوط، تتبع أداء، حملات ذكية، وتحسين التحويل.",
      en: "We connect marketing with technology through landing pages, tracking, smart campaigns, and conversion optimization.",
    },
  },
  {
    id: "technical-development",
    slug: "technical-development",
    sortOrder: 3,
    title: {
      ar: "تطوير تقني",
      en: "Technical Development",
    },
    description: {
      ar: "نبني مواقع، منصات، أنظمة SaaS، لوحات تحكم، وربط بوابات الدفع والخدمات الخارجية.",
      en: "We build websites, platforms, SaaS systems, dashboards, payment integrations, and external service connections.",
    },
  },
  {
    id: "automation",
    slug: "automation",
    sortOrder: 4,
    title: {
      ar: "أتمتة",
      en: "Automation",
    },
    description: {
      ar: "نحوّل المهام المتكررة إلى أنظمة تعمل تلقائيًا من استقبال العملاء إلى التقارير والمتابعة.",
      en: "We turn repetitive tasks into automated systems, from lead intake to reports and follow-up.",
    },
  },
  {
    id: "ai",
    slug: "artificial-intelligence",
    sortOrder: 5,
    title: {
      ar: "ذكاء اصطناعي",
      en: "Artificial Intelligence",
    },
    description: {
      ar: "نطوّر حلولًا ذكية تساعد في الردود، التحليل، خدمة العملاء، إدارة المحتوى، واتخاذ القرار.",
      en: "We develop intelligent solutions for replies, analysis, customer service, content management, and decision support.",
    },
  },
];

for (const service of services) {
  await db.doc(`services/${service.id}`).set(
    {
      ...service,
      icon: "",
      imageUrl: "",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    { merge: true }
  );
}

const seoPages = [
  {
    id: "ar-home",
    pageKey: "/ar",
    locale: "ar",
    title: "قياسات | حلول تقنية وتسويقية وذكاء اصطناعي",
    description:
      "قياسات تساعد الشركات ورواد الأعمال على تطوير أعمالهم من خلال التقنية، الأتمتة، التسويق الذكي، والذكاء الاصطناعي.",
  },
  {
    id: "en-home",
    pageKey: "/en",
    locale: "en",
    title: "قياسات | Technology, Automation, Marketing and AI Solutions",
    description:
      "قياسات helps businesses grow through technology, automation, smart marketing, and artificial intelligence.",
  },
];

for (const page of seoPages) {
  await db.doc(`seo_pages/${page.id}`).set(
    {
      ...page,
      keywords: [],
      canonical: `https://qyasat.sa${page.pageKey}`,
      ogTitle: page.title,
      ogDescription: page.description,
      ogImage: "",
      robots: "index,follow",
      schemaJson: "",
      updatedAt: now,
    },
    { merge: true }
  );
}

console.log("✅ Firestore seed completed.");
