import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readSiteContent } from "@/lib/content/site-content";
import { isLocale, type Locale } from "@/lib/config/locales";
import { CmsSeoSchema } from "@/components/seo/CmsSeoSchema";
import { getSeoPage, metadataFromSeo } from "@/lib/seo/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? (locale as Locale) : "ar";
  const content = await readSiteContent();
  return metadataFromSeo(await getSeoPage(currentLocale, "home"), content.settings.brand.ogImageUrl);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const content = await readSiteContent();
  const t = content.home[currentLocale];
  const seo = await getSeoPage(currentLocale, "home");
  const services = content.services.items
    .filter((service) => service.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, 5);

  return (
    <>
      <CmsSeoSchema schemaJson={seo.schemaJson} />
    <main className="bg-[var(--qyasat-bg)] text-[var(--qyasat-text)]">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--qyasat-hero-glow),transparent_35%)]" />
        <div className="relative mx-auto max-w-[var(--qyasat-max-width)]">
          <div className="mb-6 inline-flex rounded-[var(--qyasat-button-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] px-4 py-2 text-sm font-bold text-[var(--qyasat-muted)]">
            {t.badge}
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight md:text-7xl">
                {t.title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--qyasat-muted)] md:text-xl">
                {t.subtitle}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-[var(--qyasat-button-radius)] bg-[var(--qyasat-primary)] px-7 py-3 text-sm font-black text-[var(--qyasat-primary-text)] transition hover:opacity-90"
                >
                  {t.primaryCta}
                </Link>

                <Link
                  href={`/${locale}/services`}
                  className="rounded-[var(--qyasat-button-radius)] border border-[var(--qyasat-border)] px-7 py-3 text-sm font-black text-[var(--qyasat-text)] transition hover:bg-[var(--qyasat-surface-muted)]"
                >
                  {t.secondaryCta}
                </Link>
              </div>
            </div>

            {t.heroImageUrl ? (
              <div className="overflow-hidden rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.heroImageUrl}
                  alt={t.title}
                  className="aspect-[4/3] w-full rounded-[calc(var(--qyasat-card-radius)-10px)] object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[var(--qyasat-max-width)]">
          <h2 className="text-3xl font-black md:text-5xl">{t.servicesTitle}</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-5">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-6 transition hover:-translate-y-1 hover:bg-[var(--qyasat-surface-muted)]"
              >
                {service.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.imageUrl}
                    alt={service.title[currentLocale]}
                    className="mb-5 aspect-video w-full rounded-2xl object-cover"
                  />
                ) : null}
                <h3 className="text-lg font-black">{service.title[currentLocale]}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--qyasat-muted)]">
                  {service.description[currentLocale]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-[var(--qyasat-max-width)] gap-10 rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-3xl font-black md:text-5xl">{t.whyTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-[var(--qyasat-muted)]">{t.whyText}</p>
          </div>

          <div>
            <h3 className="text-xl font-black">{t.processTitle}</h3>
            <div className="mt-6 grid gap-4">
              {t.process.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--qyasat-border)] bg-[var(--qyasat-surface-muted)] p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--qyasat-primary)] text-sm font-black text-[var(--qyasat-primary-text)]">
                    {index + 1}
                  </span>
                  <span className="font-bold text-[var(--qyasat-text)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
