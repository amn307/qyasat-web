import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/config/locales";
import { CmsSeoSchema } from "@/components/seo/CmsSeoSchema";
import { getSeoPage, metadataFromSeo } from "@/lib/seo/pages";
import { readSiteContent } from "@/lib/content/site-content";
import { QyasatServicesPage } from "@/components/public/qyasat-services-page";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? (locale as Locale) : "ar";
  const content = await readSiteContent();
  return metadataFromSeo(await getSeoPage(currentLocale, "services"), content.settings.brand.ogImageUrl);
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;
  const seo = await getSeoPage(currentLocale, "services");

  return (
    <>
      <CmsSeoSchema schemaJson={seo.schemaJson} />
      <QyasatServicesPage locale={currentLocale} />
    </>
  );
}
