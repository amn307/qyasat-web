import { readSiteSettings } from "@/lib/site-settings";
import { getHomepageContent } from "@/lib/homepage-content";
import { getProjectsContent, type ProjectItem } from "@/lib/projects-content";
import { SiteFooter } from "@/components/public/site-footer";
import { QyasatSiteHeader } from "@/components/public/qyasat-site-header";

type ProjectsLocale = "ar" | "en";

function ProductVisual({ item, type, labels }: { item: ProjectItem; type: "cms" | "ops"; labels: { cms: string; live: string; workflow: string } }) {
  return (
    <div className={`qy-project-visual is-${item.accent}`} aria-hidden="true">
      <div className="qy-project-browser">
        <div className="qy-project-browser-top"><i /><i /><i /><span>qyasat / {item.name.toLowerCase().replaceAll(" ", "-")}</span></div>
        <div className="qy-project-browser-body">
          <div className="qy-project-sidebar"><b>QY</b><span /><span /><span /><span /></div>
          <div className="qy-project-screen">
            <small>{type === "cms" ? labels.live : labels.workflow}</small>
            <strong>{item.name}</strong>
            <div className="qy-project-lines"><i /><i /><i /></div>
            <div className="qy-project-metrics"><span /><span /><span /></div>
          </div>
        </div>
      </div>
      <div className="qy-project-float">
        <small>{type === "cms" ? labels.cms : labels.workflow}</small>
        <strong>{type === "cms" ? "Publish → Live" : "Input → Action"}</strong>
        <div><i /><i /><i /></div>
      </div>
    </div>
  );
}

export async function QyasatProjectsPage({ locale }: { locale: ProjectsLocale }) {
  const settings = await readSiteSettings();
  const home = await getHomepageContent(locale);
  const t = await getProjectsContent(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <>
      <main className="qy-projects" dir={dir} lang={locale}>
        <QyasatSiteHeader locale={locale} home={home} settings={settings} internalPage activeHref={`/${locale}/projects`} />

      

        <section className="qy-projects-section" id="web-cms">
          <div className="qy-projects-section-head">
            <div><span>{t.digitalKicker}</span><h2>{t.digitalTitle}</h2></div>
            <p>{t.digitalText}</p>
          </div>
          <div className="qy-projects-list">
            {t.digitalProjects.map((item, index) => (
              <article className="qy-project-card" key={`${item.name}-${index}`}>
                <div className="qy-project-index">{String(index + 1).padStart(2, "0")}</div>
                <ProductVisual item={item} type="cms" labels={{ cms: t.cmsLabel, live: t.liveLabel, workflow: t.workflowLabel }} />
                <div className="qy-project-info">
                  <small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p>
                  <div>{item.features.map((feature, featureIndex) => <span key={`${feature}-${featureIndex}`}>{feature}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="qy-projects-section qy-projects-ops" id="operating-solutions">
          <div className="qy-projects-section-head">
            <div><span>{t.opsKicker}</span><h2>{t.opsTitle}</h2></div>
            <p>{t.opsText}</p>
          </div>
          <div className="qy-projects-list">
            {t.operatingProjects.map((item, index) => (
              <article className="qy-project-card qy-project-card-ops" key={`${item.name}-${index}`}>
                <div className="qy-project-index">{String(index + 1).padStart(2, "0")}</div>
                <ProductVisual item={item} type="ops" labels={{ cms: t.cmsLabel, live: t.liveLabel, workflow: t.workflowLabel }} />
                <div className="qy-project-info">
                  <small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p>
                  <div>{item.features.map((feature, featureIndex) => <span key={`${feature}-${featureIndex}`}>{feature}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="qy-projects-outcomes">
          <div className="qy-projects-section-head"><div><span>{t.outcomeKicker}</span><h2>{t.outcomeTitle}</h2></div></div>
          <div className="qy-projects-outcome-grid">
            {t.outcomes.map((item, index) => <article key={`${item.number}-${index}`}><small>{item.number}</small><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        <section className="qy-projects-cta">
          <div><span>QY / NEXT</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div>
          <a href={`/${locale}#contact`}>{t.cta}</a>
        </section>

        <SiteFooter locale={locale} settings={settings} brandName={home.brand.name} brandTagline={home.brand.tagline} />
      </main>
    </>
  );
}
