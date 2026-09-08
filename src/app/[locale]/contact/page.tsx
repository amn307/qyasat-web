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
    label: "تواصل معنا",
    title: "لنناقش مشروعك القادم.",
    subtitle: "شاركنا فكرتك أو احتياجك، وسيراجع فريق قياسات التفاصيل ويتواصل معك لمناقشة الخطوة التالية.",
    company: "قياسات",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    whatsapp: "واتساب",
    location: "الموقع",
    empty: "سيتم تحديث هذه المعلومة قريباً",
  },
  en: {
    label: "Contact",
    title: "Let’s discuss your next project.",
    subtitle: "Share your idea or business need and the Qyasat team will review the details and get back to you about the next step.",
    company: "Qyasat",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    location: "Location",
    empty: "This information will be updated soon",
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
  const [seo, siteContent] = await Promise.all([
    getSeoPage(currentLocale, "contact"),
    readSiteContent(),
  ]);
  const t = content[currentLocale];
  const contact = siteContent.settings.contact;
  const address = currentLocale === "ar" ? contact.addressAr : contact.addressEn;
  const dir = currentLocale === "ar" ? "rtl" : "ltr";

  return (
    <>
      <CmsSeoSchema schemaJson={seo.schemaJson} />
      <main
        dir={dir}
        className="min-h-screen bg-[var(--qyasat-bg)] px-4 pb-20 pt-14 text-[var(--qyasat-text)] sm:px-6 sm:pt-20 md:px-10 md:pb-28"
      >
        <section className="mx-auto max-w-[var(--qyasat-max-width)]">
          <div className="mb-10 max-w-5xl sm:mb-14">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--qyasat-accent)]">
              {t.label}
            </p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.7rem,7vw,6.2rem)] font-black leading-[0.96] tracking-[-0.055em]">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--qyasat-muted)] sm:text-lg sm:leading-9">
              {t.subtitle}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-7">
            <aside className="rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-6 shadow-[0_22px_70px_color-mix(in_srgb,var(--qyasat-text)_6%,transparent)] sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--qyasat-accent)]">
                {t.company}
              </p>

              <div className="mt-10 grid gap-8">
                <ContactDetail label={t.email} value={contact.email} href={contact.email ? `mailto:${contact.email}` : undefined} fallback={t.empty} />
                <ContactDetail label={t.phone} value={contact.phone} href={contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined} fallback={t.empty} />
                <ContactDetail label={t.whatsapp} value={contact.whatsapp} href={contact.whatsapp ? whatsappHref(contact.whatsapp) : undefined} fallback={t.empty} external />
                <ContactDetail label={t.location} value={address} fallback={t.empty} />
              </div>
            </aside>

            <ContactForm locale={currentLocale} />
          </div>
        </section>
      </main>
    </>
  );
}

function whatsappHref(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : undefined;
}

function ContactDetail({
  label,
  value,
  href,
  fallback,
  external = false,
}: {
  label: string;
  value: string;
  href?: string;
  fallback: string;
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-[0.7rem] font-black uppercase tracking-[0.22em] text-[var(--qyasat-muted)]">
        {label}
      </p>
      {href && value ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="mt-2 block break-words text-lg font-bold text-[var(--qyasat-text)] transition-opacity hover:opacity-60"
        >
          {value}
        </a>
      ) : (
        <p className={`mt-2 break-words text-lg ${value ? "font-bold text-[var(--qyasat-text)]" : "text-[var(--qyasat-muted)]"}`}>
          {value || fallback}
        </p>
      )}
    </div>
  );
}
