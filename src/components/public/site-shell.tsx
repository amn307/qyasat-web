import type { Locale } from "@/lib/config/locales";
import type { SiteSettings } from "@/lib/content/site-content";

export async function SiteHeader({
  locale,
  settings: _settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  const [{ getHomepageContent }, { readSiteSettings }, { QyasatSiteHeader }] = await Promise.all([
    import("@/lib/homepage-content"),
    import("@/lib/site-settings"),
    import("@/components/public/qyasat-site-header"),
  ]);

  const [home, settings] = await Promise.all([
    getHomepageContent(locale),
    readSiteSettings(),
  ]);

  return (
    <div className="qy-layout-header-shell">
      <QyasatSiteHeader locale={locale} home={home} settings={settings} internalPage />
    </div>
  );
}

export function SiteFooter({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  const address = locale === "ar" ? settings.contact.addressAr : settings.contact.addressEn;
  const socials = Object.entries(settings.social).filter(([, value]) => value);

  return (
    <footer className="border-t border-[var(--qyasat-border)] bg-[var(--qyasat-bg)] px-6 py-10 text-[var(--qyasat-text)]">
      <div className="mx-auto grid max-w-[var(--qyasat-max-width)] gap-8 md:grid-cols-3">
        <div>
          <div className="text-xl font-black">{locale === "ar" ? "قياسات" : "Qyasat"}</div>
          <p className="mt-3 text-sm leading-7 text-[var(--qyasat-muted)]">
            {locale === "ar"
              ? "تطوير أعمال، تقنية، أتمتة، وذكاء اصطناعي."
              : "Business, technology, automation, and AI solutions."}
          </p>
        </div>

        <div className="text-sm leading-7 text-[var(--qyasat-muted)]">
          {settings.contact.email && <div>{settings.contact.email}</div>}
          {settings.contact.phone && <div>{settings.contact.phone}</div>}
          {settings.contact.whatsapp && <div>{settings.contact.whatsapp}</div>}
          {address && <div>{address}</div>}
        </div>

        <div className="flex flex-wrap items-start gap-3 text-sm font-bold">
          {socials.map(([key, value]) => (
            <a
              key={key}
              href={value}
              target="_blank"
              className="rounded-full border border-[var(--qyasat-border)] px-4 py-2 text-[var(--qyasat-muted)] hover:text-[var(--qyasat-text)]"
            >
              {key}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
