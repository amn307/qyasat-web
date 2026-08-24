import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/public/contact-form";
import { isLocale, type Locale } from "@/lib/config/locales";
import { CmsSeoSchema } from "@/components/seo/CmsSeoSchema";
import { getSeoPage, metadataFromSeo } from "@/lib/seo/pages";
import { readSiteContent } from "@/lib/content/site-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? (locale as Locale) : "ar";
  const content = await readSiteContent();
  return metadataFromSeo(await getSeoPage(currentLocale, "contact"), content.settings.brand.ogImageUrl);
}

const content = {
  ar: {
    title: "تواصل معنا",
    description: "أرسل لنا فكرة مشروعك أو احتياجك، وسنراجع التفاصيل من لوحة التحكم.",
  },
  en: {
    title: "Contact us",
    description: "Send us your project idea or need, and we will review the details from the admin dashboard.",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const seo = await getSeoPage(currentLocale, "contact");
  const t = content[currentLocale];

  return (
    <>
      <CmsSeoSchema schemaJson={seo.schemaJson} />
    <main className="min-h-screen bg-[var(--qyasat-bg)] px-6 py-20 text-[var(--qyasat-text)]">
      <section className="mx-auto max-w-[var(--qyasat-max-width)]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--qyasat-muted)]">
          قياسات
        </p>
        <h1 className="mt-4 text-5xl font-black md:text-7xl">{t.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--qyasat-muted)]">
          {t.description}
        </p>

        <ContactForm locale={currentLocale} />
      </section>
    </main>
    </>
  );
}
