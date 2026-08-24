import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/public/site-shell";
import { isLocale, localeDirection, type Locale } from "@/lib/config/locales";
import { readSiteContent } from "@/lib/content/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? (locale as Locale) : "ar";
  const content = await readSiteContent();
  const seo = content.seo[currentLocale];
  const ogImage = content.settings.brand.ogImageUrl || undefined;
  const siteName = currentLocale === "ar" ? "قياسات" : "Qyasat";
  const canonicalPath = `/${currentLocale}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://qyasat.sa"),
    title: seo.siteTitle,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: canonicalPath },
    openGraph: {
      url: canonicalPath,
      title: seo.ogTitle || seo.siteTitle,
      description: seo.ogDescription || seo.description,
      images: ogImage ? [ogImage] : [],
      locale: currentLocale === "ar" ? "ar_SA" : "en_US",
      siteName: "Qyasat",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const content = await readSiteContent();
  const activeHeadPixels = content.pixels.filter((pixel) => pixel.isActive && pixel.location === "head");
  const activeBodyPixels = content.pixels.filter((pixel) => pixel.isActive && pixel.location === "body");

  return (
    <div dir={localeDirection[currentLocale]} lang={currentLocale} className="min-h-screen">
      {activeHeadPixels.map((pixel) => (
        <script
          key={pixel.id}
          dangerouslySetInnerHTML={{
            __html: pixel.code,
          }}
        />
      ))}

      <SiteHeader locale={currentLocale} settings={content.settings} />
      <div>{children}</div>
      <SiteFooter locale={currentLocale} settings={content.settings} />

      {activeBodyPixels.map((pixel) => (
        <script
          key={pixel.id}
          dangerouslySetInnerHTML={{
            __html: pixel.code,
          }}
        />
      ))}
    </div>
  );
}
