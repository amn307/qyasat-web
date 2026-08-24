import { readSiteSettings } from "@/lib/site-settings";
import { getHomepageContent } from "@/lib/homepage-content";
import { readServicesPageItems, type ServicePageItem } from "@/lib/services-page-content";
import { SiteFooter } from "@/components/public/site-footer";

type ServicesLocale = "ar" | "en";

function ServiceVisual({ item, locale }: { item: ServicePageItem; locale: ServicesLocale }) {
  const label = item.category[locale];
  const title = item.title[locale];
  const shortTitle = title.length > 24 ? title.split(" ").slice(0, 3).join(" ") : title;

  return (
    <div className={`qy-service-visual is-${item.visual}`} aria-hidden="true">
      <div className="qy-service-window">
        <div className="qy-service-window-top"><i /><i /><i /><span>qyasat / services / {item.id}</span></div>
        <div className="qy-service-window-body">
          <div className="qy-service-window-side"><b>QY</b><span /><span /><span /><span /></div>
          <div className="qy-service-window-main">
            <small>{label}</small>
            <strong>{shortTitle}</strong>
            <div className="qy-service-lines"><i /><i /><i /></div>
            <div className="qy-service-panels"><span /><span /><span /></div>
          </div>
        </div>
      </div>
      <div className="qy-service-float">
        <small>{item.id.replaceAll("-", " ")}</small>
        <strong>{item.features[locale][0]}</strong>
        <div><i /><i /><i /></div>
      </div>
    </div>
  );
}

export async function QyasatServicesPage({ locale }: { locale: ServicesLocale }) {
  const settings = await readSiteSettings();
  const home = await getHomepageContent(locale);
  const servicesPageItems = (await readServicesPageItems()).filter((item) => item.isActive).sort((a, b) => a.order - b.order);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const copy = locale === "ar"
    ? {
        eyebrow: "خدمات قياسات",
        titleA: "حلول رقمية",
        titleB: "تربط العلامة والتسويق والتقنية والتشغيل.",
        intro: "من الحضور الرقمي والهوية إلى البرمجيات والأتمتة والتسويق، نبني خدمات مترابطة يمكن للشركات تشغيلها وقياس أثرها بوضوح.",
        sectionKicker: "ما نقدمه",
        sectionTitle: "خدمات مصممة حول ما يحتاجه العمل فعليًا",
        sectionText: "كل بطاقة أدناه تمثل خدمة كاملة. نحدد النطاق والمخرجات بحسب احتياج الشركة بدل فرض باقة ثابتة على كل مشروع.",
        ctaTitle: "لديك هدف واضح ولكنك غير متأكد من الخدمة المناسبة؟",
        ctaText: "شاركنا الهدف أو المشكلة الحالية، وسنحدد معك النطاق والخدمات التي تخدم النتيجة بشكل مباشر.",
        cta: "ابدأ المحادثة",
      }
    : {
        eyebrow: "Qyasat Services",
        titleA: "Digital services",
        titleB: "connecting brand, marketing, technology, and operations.",
        intro: "From digital presence and identity to software, automation, and marketing, we build connected services companies can operate and measure with clarity.",
        sectionKicker: "What we do",
        sectionTitle: "Services designed around what the business actually needs",
        sectionText: "Each card below is the complete service view. Scope and deliverables are shaped around the company rather than forcing every project into the same package.",
        ctaTitle: "Know the goal, but not sure which service fits?",
        ctaText: "Show us the outcome or the problem as it exists today, and we will define the most useful scope with you.",
        cta: "Start a conversation",
      };

  return (
    <main className="qy-services-page" dir={dir} lang={locale}>
      <section className="qy-services-section">
        <div className="qy-services-section-head">
          <div><span>{copy.sectionKicker}</span><h2>{copy.sectionTitle}</h2></div>
          <p>{copy.sectionText}</p>
        </div>

        <div className="qy-services-list">
          {servicesPageItems.map((item, index) => (
            <article className="qy-service-card" key={item.id}>
              <div className="qy-service-index">{String(index + 1).padStart(2, "0")}</div>
              <ServiceVisual item={item} locale={locale} />
              <div className="qy-service-info">
                <small>{item.category[locale]}</small>
                <h3>{item.title[locale]}</h3>
                <p>{item.description[locale]}</p>
                <div>{item.features[locale].map((feature) => <span key={feature}>{feature}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="qy-services-cta">
        <div><span>QY / SERVICES</span><h2>{copy.ctaTitle}</h2><p>{copy.ctaText}</p></div>
        <a href={`/${locale}#contact`}>{copy.cta}</a>
      </section>

      <SiteFooter locale={locale} settings={settings} brandName={home.brand.name} brandTagline={home.brand.tagline} />
    </main>
  );
}
