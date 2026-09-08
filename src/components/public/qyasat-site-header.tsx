import qyasatLogo from "@/app/qyasat-logo-black.png";
import type { HomepageContent } from "@/lib/homepage-content";
import type { SiteSettings } from "@/lib/site-settings";

type Locale = "ar" | "en";

function resolveHref(href: string, locale: Locale, internalPage: boolean) {
  // Services and Contact are dedicated pages rather than in-page homepage sections.
  if (href === "#services" || /\/(?:en|ar)\/services$/.test(href)) {
    return `/${locale}/services`;
  }
  if (href === "#contact" || /\/(?:en|ar)\/contact$/.test(href)) {
    return `/${locale}/contact`;
  }
  if (!internalPage || !href.startsWith("#")) return href;
  return `/${locale}${href}`;
}

function languageHref(locale: Locale, internalPage: boolean, activeHref?: string) {
  const targetLocale = locale === "ar" ? "en" : "ar";
  if (!internalPage) return `/${targetLocale}`;

  if (activeHref) {
    return activeHref.replace(/^\/(?:ar|en)(?=\/|$)/, `/${targetLocale}`);
  }

  return `/${targetLocale}`;
}

export function QyasatSiteHeader({
  locale,
  home,
  settings,
  internalPage = false,
  activeHref,
}: {
  locale: Locale;
  home: HomepageContent;
  settings: SiteSettings;
  internalPage?: boolean;
  activeHref?: string;
}) {
  const projectHref = `/${locale}/projects`;
  const blogHref = `/${locale}/blog`;

  // Keep the homepage sections available, but remove Work and Process from the site header.
  // Blog and Projects are dedicated pages and are always exposed in the navigation.
  let nav = home.nav.filter((item) => {
    const href = item.href.toLowerCase();
    const label = item.label.trim().toLowerCase();
    return !(
      href === "#work" ||
      href === "#process" ||
      /\/(?:en|ar)\/(?:work|process)$/.test(href) ||
      label === "work" ||
      label === "process" ||
      label === "الأعمال" ||
      label === "طريقة العمل"
    );
  });

  if (!nav.some((item) => item.href.includes("/projects"))) {
    nav = [...nav, { label: locale === "ar" ? "المشاريع" : "Projects", href: projectHref }];
  }

  if (!nav.some((item) => item.href.includes("/blog"))) {
    nav = [...nav, { label: locale === "ar" ? "المدونة" : "Blog", href: blogHref }];
  }

  const menuLabel = locale === "ar" ? "فتح القائمة" : "Open menu";

  return (
    <header className="qy-site-header" dir="rtl" data-locale={locale}>
      <a className="qy-site-brand" href={`/${locale}`} aria-label={home.brand.name}>
        {settings.brand.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={settings.brand.logoUrl} alt={settings.brand.logoAlt || home.brand.name} />
        ) : (
          <img src={qyasatLogo.src} alt={settings.brand.logoAlt || home.brand.name} />
        )}
      </a>

      <nav aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
        {nav.map((item) => {
          const href = resolveHref(item.href, locale, internalPage);
          const active = activeHref && (item.href === activeHref || href === activeHref);
          return <a className={active ? "is-active" : ""} key={`${item.label}-${item.href}`} href={href}>{item.label}</a>;
        })}
      </nav>

      <div className="qy-site-header-actions">
        <a className="qy-site-language" href={languageHref(locale, internalPage, activeHref)}>
          {locale === "ar" ? "EN" : "AR"}
        </a>
        <a className="qy-site-header-cta" href={resolveHref(home.hero.primaryHref, locale, internalPage)}>{home.hero.primaryCta}</a>

        <details className="qy-site-mobile-menu">
          <summary aria-label={menuLabel} title={menuLabel}>
            <span /><span /><span />
          </summary>
          <div className="qy-site-mobile-panel">
            {nav.map((item) => {
              const href = resolveHref(item.href, locale, internalPage);
              const active = activeHref && (item.href === activeHref || href === activeHref);
              return <a className={active ? "is-active" : ""} key={`mobile-${item.label}-${item.href}`} href={href}>{item.label}</a>;
            })}
            <a className="qy-site-mobile-cta" href={resolveHref(home.hero.primaryHref, locale, internalPage)}>{home.hero.primaryCta}</a>
          </div>
        </details>
      </div>
    </header>
  );
}
