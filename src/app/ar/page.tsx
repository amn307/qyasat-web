import type { Metadata } from "next";
import { getHomepageContent } from "@/lib/homepage-content";
import { readSiteSettings } from "@/lib/site-settings";
import { SiteFooter } from "@/components/public/site-footer";
import { listBlogPosts } from "@/lib/blog/posts";
import { getSeoPage, metadataFromSeo } from "@/lib/seo/pages";
import { CmsSeoSchema } from "@/components/seo/CmsSeoSchema";
import { QyasatSiteHeader } from "@/components/public/qyasat-site-header";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await readSiteSettings();
  return metadataFromSeo(await getSeoPage("ar", "home"), settings.brand.ogImageUrl);
}

export default async function ArabicHomePage() {
  const home = await getHomepageContent();
  const settings = await readSiteSettings();
  const latestPosts = (await listBlogPosts()).slice(0, 3);
  const seo = await getSeoPage("ar", "home");

  return (
    <>
      <CmsSeoSchema schemaJson={seo.schemaJson} />
    <main className="qyasat-home" dir="rtl">
      <QyasatSiteHeader locale="ar" home={home} settings={settings} />

      <section className="qyasat-hero">
        <div className="qyasat-hero-copy qyasat-copy">
          <p className="qyasat-badge">{home.hero.kicker}</p>

          <h1>
            {home.hero.titlePrefix} <span>{home.hero.titleHighlight}</span>
          </h1>

          <p className="qyasat-subtitle">{home.hero.subtitle}</p>

          <div className="qyasat-actions">
            <a className="qyasat-primary" href={home.hero.primaryHref}>
              {home.hero.primaryCta}
            </a>
            <a className="qyasat-secondary" href={home.hero.secondaryHref}>
              {home.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="qyasat-visual" aria-hidden="true">
          <span className="qyasat-ring ring-a" />
          <span className="qyasat-ring ring-b" />
          <div className="qyasat-core">QY</div>

          <div className="qyasat-code qyasat-code-window">
            <strong>{home.visual.codeTitle}</strong>
            <span>{home.visual.codeText}</span>
          </div>

          <div className="qyasat-mini-card qyasat-floating-card">
            <strong>{home.visual.cardTitle}</strong>
            <b>{home.visual.cardText}</b>
          </div>
        </div>
      </section>

      <section className="qyasat-trust">
        <p>{home.trust.label}</p>
        <div className="trust-row qyasat-trust-row">
          {home.trust.items.map((item) => (
            <article key={`${item.value}-${item.label}`}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="qyasat-section">
        <div className="qyasat-section-head">
          <div>
            <p>{home.services.kicker}</p>
            <h2>{home.services.title}</h2>
          </div>
          <span>{home.services.description}</span>
        </div>

        <div className="qyasat-grid qyasat-cards services-grid">
          {home.services.items
            .filter((item) => item.isActive !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((item) => (
            <article className="qyasat-card" key={item.id || item.title}>
              <div>
                <i>{item.icon || "•"}</i>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              {item.tag ? <b>{item.tag}</b> : null}
            </article>
          ))}
        </div>
      </section>

      <section id="ai" className="qyasat-ai">
        <p>{home.ai.kicker}</p>
        <h2>{home.ai.title}</h2>
        <span>{home.ai.description}</span>

        <div className="qyasat-ai-grid ai-grid">
          {home.ai.items.map((item) => (
            <article key={item.id || item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="qyasat-section">
        <div className="qyasat-section-head">
          <div>
            <p>{home.process.kicker}</p>
            <h2>{home.process.title}</h2>
          </div>
          <span>{home.process.description}</span>
        </div>

        <div className="qyasat-process">
          {home.process.items.map((item) => (
            <article key={item.id || item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="qyasat-estimator">
        <div className="qyasat-estimator-box">
          <div>
            <h3>{home.estimator.title}</h3>
            <p>{home.estimator.description}</p>
          </div>
          <aside>
            <a href={home.estimator.href}>{home.estimator.cta}</a>
          </aside>
        </div>
      </section>

      <section id="work" className="qyasat-section qyasat-work">
        <div className="qyasat-section-head">
          <div>
            <p>{home.work.kicker}</p>
            <h2>{home.work.title}</h2>
          </div>
          <span>{home.work.description}</span>
        </div>

        <div className="qyasat-work-grid work-grid">
          {home.work.items.map((item) => (
            <article key={item.id || item.title}>
              <small>{item.tag}</small>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section id="blog" className="qyasat-section qyasat-blog-section">
        <div className="qyasat-section-head">
          <div>
            <p>رؤى ومقالات</p>
            <h2>أحدث مقالات قياسات</h2>
          </div>
          <span>أفكار عملية حول التقنية، الأتمتة، التسويق، والذكاء الاصطناعي.</span>
        </div>

        {latestPosts.length > 0 ? (
          <div className="qyasat-blog-grid">
            {latestPosts.map((post) => (
              <a className="qyasat-blog-card" href={`/${"ar"}/blog/${post.slug}`} key={post.id}>
                <div className="qyasat-blog-image">
                  {post.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImageUrl} alt={post.title.ar || post.title.en} />
                  ) : (
                    <span>QY</span>
                  )}
                </div>
                <div className="qyasat-blog-copy">
                  <small>{post.category || "مقالات"}</small>
                  <h3>{post.title.ar || post.title.en}</h3>
                  <p>{post.excerpt.ar || post.excerpt.en}</p>
                  <b>اقرأ المقال ←</b>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="qyasat-blog-empty">ستظهر المقالات المنشورة هنا تلقائيًا.</div>
        )}

        <a className="qyasat-blog-all" href="/ar/blog">عرض جميع المقالات</a>
      </section>

      <section id="contact" className="qyasat-contact">
        <div>
          <h2>{home.contact.title}</h2>
          <p>{home.contact.description}</p>
        </div>

        <div className="qyasat-tools">
          {home.contact.links.map((link) => (
            <a key={`${link.label}-${link.href}`} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <SiteFooter
        locale="ar"
        settings={settings}
        brandName={home.brand.name}
        brandTagline={home.brand.tagline}
      />
      <style dangerouslySetInnerHTML={{ __html: `

        .qyasat-home {
          min-height: 100vh;
          color: #f8fafc;
          background:
            radial-gradient(circle at 12% 16%, rgba(0, 242, 254, .18), transparent 30rem),
            radial-gradient(circle at 80% 8%, rgba(157, 92, 255, .14), transparent 34rem),
            radial-gradient(circle at 85% 70%, rgba(241, 196, 107, .11), transparent 28rem),
            linear-gradient(135deg, #05060b 0%, #08111f 48%, #05060b 100%);
          font-family: "IBM Plex Sans Arabic", "Tajawal", "Segoe UI", Arial, sans-serif;
          overflow: hidden;
          padding: 20px max(18px, calc((100vw - 1240px) / 2)) 70px;
        }

        .qyasat-home * { box-sizing: border-box; }

        .qyasat-blog-section { margin-bottom: 105px; }
        .qyasat-blog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .qyasat-blog-card { overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 28px; background: rgba(255,255,255,.055); color: inherit; text-decoration: none; transition: transform .25s ease, border-color .25s ease, background .25s ease; }
        .qyasat-blog-card:hover { transform: translateY(-7px); border-color: rgba(0,242,254,.38); background: rgba(255,255,255,.08); }
        .qyasat-blog-image { aspect-ratio: 16/10; display: grid; place-items: center; overflow: hidden; background: radial-gradient(circle at 30% 20%, rgba(0,242,254,.25), transparent 45%), linear-gradient(135deg,#0a1425,#12182a); }
        .qyasat-blog-image img { width: 100%; height: 100%; object-fit: cover; }
        .qyasat-blog-image span { font-size: 3rem; font-weight: 900; color: rgba(255,255,255,.82); }
        .qyasat-blog-copy { padding: 24px; }
        .qyasat-blog-copy small { color: #00f2fe; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .qyasat-blog-copy h3 { margin: 12px 0 10px; font-size: 1.35rem; line-height: 1.35; }
        .qyasat-blog-copy p { min-height: 72px; margin: 0; color: rgba(226,232,240,.72); line-height: 1.75; }
        .qyasat-blog-copy b { display: inline-block; margin-top: 20px; color: #fff; }
        .qyasat-blog-all { display: inline-flex; margin-top: 24px; padding: 12px 18px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; color: #fff; text-decoration: none; font-weight: 800; }
        .qyasat-blog-empty { padding: 34px; border: 1px dashed rgba(255,255,255,.18); border-radius: 24px; color: rgba(226,232,240,.68); text-align: center; }


        .qyasat-nav {
          position: sticky;
          top: 16px;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 18px;
          min-height: 72px;
          padding: 14px 18px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 24px;
          background: rgba(8,12,22,.72);
          backdrop-filter: blur(20px);
          box-shadow: 0 22px 80px rgba(0,0,0,.3);
        }


        .qyasat-brand-logo {
          width: 42px;
          height: 42px;
          object-fit: contain;
          border-radius: 10px;
        }

        .qyasat-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: inherit;
          text-decoration: none;
        }

        .qyasat-brand > span {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          color: #061016;
          font-weight: 950;
          letter-spacing: -.08em;
          background: linear-gradient(135deg, #25f4ff, #9d5cff 62%, #f1c46b);
        }

        .qyasat-brand strong,
        .qyasat-brand small { display: block; }

        .qyasat-brand small {
          color: rgba(226,232,240,.58);
          font-size: .74rem;
          margin-top: 2px;
        }

        .qyasat-nav nav {
          display: flex;
          gap: 26px;
          white-space: nowrap;
        }

        .qyasat-nav nav a {
          color: rgba(226,232,240,.68);
          text-decoration: none;
        }

        .qyasat-nav-cta,
        .qyasat-primary,
        .qyasat-contact a,
        .qyasat-estimator aside a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          color: #061016;
          text-decoration: none;
          font-weight: 850;
          background: linear-gradient(135deg, #25f4ff, #5fb6ff 45%, #9d5cff);
          box-shadow: 0 0 34px rgba(37,244,255,.22);
        }

        .qyasat-nav-cta { justify-self: start; }

        .qyasat-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(390px, .86fr);
          align-items: center;
          gap: 42px;
          min-height: 640px;
          padding: 72px 10px 34px;
        }

        .qyasat-badge {
          width: fit-content;
          padding: 9px 14px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          color: rgba(226,232,240,.76);
          background: rgba(255,255,255,.045);
        }

        .qyasat-hero h1 {
          max-width: 850px;
          margin: 22px 0 18px;
          color: #fff;
          font-size: clamp(3rem, 7vw, 6.4rem);
          line-height: .98;
          letter-spacing: -.075em;
          font-weight: 950;
        }

        .qyasat-hero h1 span {
          display: block;
          padding-top: 8px;
          background: linear-gradient(135deg, #fff 0%, #dbeafe 34%, #25f4ff 63%, #b079ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .qyasat-subtitle {
          max-width: 680px;
          color: rgba(226,232,240,.72);
          font-size: clamp(1.05rem, 1.8vw, 1.28rem);
          line-height: 1.9;
        }

        .qyasat-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .qyasat-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          color: #f8fafc;
          text-decoration: none;
          font-weight: 850;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.045);
        }

        .qyasat-visual {
          position: relative;
          height: 500px;
          border-radius: 36px;
          border: 1px solid rgba(255,255,255,.1);
          background:
            radial-gradient(circle at 50% 40%, rgba(37,244,255,.14), transparent 19rem),
            radial-gradient(circle at 70% 58%, rgba(157,92,255,.16), transparent 18rem),
            linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.015));
          overflow: hidden;
          box-shadow: 0 40px 130px rgba(0,0,0,.28);
        }

        .qyasat-core {
          position: absolute;
          top: 170px;
          right: 50%;
          transform: translateX(50%);
          width: 108px;
          height: 108px;
          display: grid;
          place-items: center;
          border-radius: 32px;
          color: #fff;
          font-size: 2rem;
          font-weight: 950;
          letter-spacing: -.08em;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: 0 0 45px rgba(37,244,255,.16);
        }

        .qyasat-ring {
          position: absolute;
          border-radius: 45% 55% 50% 50%;
          border: 1px solid rgba(37,244,255,.38);
        }

        .ring-a {
          width: 300px;
          height: 300px;
          top: 74px;
          right: 50%;
          transform: translateX(50%) rotate(-12deg);
        }

        .ring-b {
          width: 230px;
          height: 230px;
          top: 108px;
          right: 50%;
          transform: translateX(50%) rotate(19deg);
          border-color: rgba(157,92,255,.45);
        }

        .qyasat-code,
        .qyasat-mini-card {
          position: absolute;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 22px;
          background: rgba(6,10,20,.66);
          backdrop-filter: blur(18px);
        }

        .qyasat-code {
          left: 30px;
          top: 42px;
          width: 260px;
          padding: 18px;
        }

        .qyasat-code strong,
        .qyasat-code span { display: block; }

        .qyasat-code span {
          margin-top: 9px;
          color: rgba(226,232,240,.62);
          font-size: .86rem;
        }

        .qyasat-mini-card {
          right: 30px;
          bottom: 30px;
          width: 300px;
          padding: 20px;
        }

        .qyasat-mini-card small {
          display: block;
          color: #25f4ff;
          margin-bottom: 8px;
        }

        .qyasat-mini-card b { line-height: 1.7; }

        .qyasat-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin: 8px 0 92px;
          padding: 22px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 28px;
          background: rgba(255,255,255,.045);
        }

        .qyasat-trust span {
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(248,250,252,.76);
          background: rgba(0,0,0,.18);
        }

        .qyasat-section,
        .qyasat-ai,
        .qyasat-estimator,
        .qyasat-work { margin-bottom: 105px; }

        .qyasat-section-head {
          max-width: 760px;
          margin: 0 auto 34px;
          text-align: center;
        }

        .qyasat-section-head p,
        .qyasat-ai p {
          margin: 0 0 12px;
          color: #25f4ff;
          font-weight: 850;
        }

        .qyasat-section-head h2,
        .qyasat-ai h2,
        .qyasat-contact h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(2rem, 4.4vw, 4rem);
          line-height: 1.05;
          letter-spacing: -.06em;
        }

        .qyasat-section-head span,
        .qyasat-ai span,
        .qyasat-contact p {
          display: block;
          margin-top: 16px;
          color: rgba(226,232,240,.68);
          font-size: 1.06rem;
          line-height: 1.9;
        }

        .qyasat-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .qyasat-card,
        .qyasat-process article,
        .qyasat-work article {
          padding: 26px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,.1);
          background:
            linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.018)),
            radial-gradient(circle at 20% 0%, rgba(37,244,255,.08), transparent 14rem);
        }

        .qyasat-card i {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          border-radius: 17px;
          color: #25f4ff;
          font-style: normal;
          border: 1px solid rgba(37,244,255,.22);
          background: rgba(37,244,255,.08);
        }

        .qyasat-card h3,
        .qyasat-process h3,
        .qyasat-work h3,
        .qyasat-estimator h3 {
          margin: 0;
          color: #fff;
          font-size: 1.22rem;
        }

        .qyasat-card p,
        .qyasat-process p,
        .qyasat-work p,
        .qyasat-estimator p {
          color: rgba(226,232,240,.66);
          line-height: 1.85;
        }

        .qyasat-card b {
          display: inline-flex;
          padding: 8px 10px;
          border-radius: 999px;
          color: #dffcff;
          background: rgba(37,244,255,.08);
          font-size: .84rem;
        }

        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact {
          display: grid;
          grid-template-columns: 1fr .55fr;
          gap: 22px;
          padding: 34px;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,.1);
          background:
            radial-gradient(circle at 12% 30%, rgba(157,92,255,.13), transparent 24rem),
            linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.018));
        }

        .qyasat-ai aside,
        .qyasat-estimator aside {
          display: grid;
          gap: 14px;
          align-content: center;
        }

        .qyasat-ai aside b,
        .qyasat-estimator aside,
        .qyasat-estimator button {
          padding: 18px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(0,0,0,.18);
          color: #fff;
        }

        .qyasat-estimator-box > div {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-content: start;
        }

        .qyasat-estimator h3 { width: 100%; }

        .qyasat-estimator button {
          cursor: default;
          font: inherit;
        }

        .qyasat-estimator aside strong {
          display: block;
          margin: 8px 0;
          color: #fff;
          font-size: 2.8rem;
          letter-spacing: -.06em;
        }

        .qyasat-process,
        .qyasat-work-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .qyasat-process strong {
          display: block;
          margin-bottom: 20px;
          color: #25f4ff;
          font-size: 1.35rem;
        }

        .qyasat-work-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .qyasat-work article div {
          height: 170px;
          margin-bottom: 20px;
          border-radius: 22px;
          background:
            linear-gradient(135deg, rgba(37,244,255,.22), transparent),
            radial-gradient(circle at 70% 30%, rgba(157,92,255,.22), transparent 16rem),
            linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
          border: 1px solid rgba(255,255,255,.1);
        }

        .qyasat-contact {
          grid-template-columns: 1fr auto;
          align-items: center;
        }

        @media (max-width: 1040px) {
          .qyasat-nav { grid-template-columns: 1fr auto; }
          .qyasat-nav nav { display: none; }

          .qyasat-hero,
          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            grid-template-columns: 1fr;
          }

          .qyasat-grid,
          .qyasat-blog-grid { grid-template-columns: 1fr; }
          .qyasat-work-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .qyasat-process {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .qyasat-home { padding-inline: 12px; }
          .qyasat-nav { border-radius: 20px; }
          .qyasat-brand small { display: none; }

          .qyasat-nav-cta {
            min-height: 40px;
            padding-inline: 13px;
            font-size: .86rem;
          }

          .qyasat-hero {
            padding-top: 52px;
            min-height: auto;
            grid-template-columns: 1fr;
          }

          .qyasat-actions { flex-direction: column; }

          .qyasat-primary,
          .qyasat-secondary,
          .qyasat-contact a,
          .qyasat-estimator aside a {
            width: 100%;
          }

          .qyasat-visual {
            height: 430px;
            border-radius: 26px;
          }

          .qyasat-code,
          .qyasat-mini-card {
            left: 20px;
            right: 20px;
            width: auto;
          }

          .qyasat-grid,
          .qyasat-work-grid,
          .qyasat-process {
            grid-template-columns: 1fr;
          }

          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            padding: 24px;
            border-radius: 26px;
          }
        }
        /* QYASAT_REFERENCE_PALETTE_20260702 */

        .qyasat-home {
          --ref-bg: #050812;
          --ref-panel: rgba(7, 13, 26, .64);
          --ref-border: rgba(255,255,255,.13);
          --ref-cyan: #21f4ff;
          --ref-blue: #4aa8ff;
          --ref-violet: #9d5cff;
          --ref-gold: #f7b733;
          --ref-gold-soft: #ffe6a3;

          position: relative;
          isolation: isolate;
          color: #f8fafc !important;
          background:
            radial-gradient(circle at 17% 26%, rgba(33, 244, 255, .20), transparent 33rem),
            radial-gradient(circle at 45% 38%, rgba(157, 92, 255, .14), transparent 36rem),
            radial-gradient(circle at 91% 56%, rgba(247, 183, 51, .20), transparent 34rem),
            linear-gradient(135deg, #030713 0%, #071222 44%, #04060d 100%) !important;
          overflow-x: hidden;
        }

        .qyasat-home::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .28;
          background-image:
            radial-gradient(circle, rgba(33,244,255,.35) 0 1px, transparent 1.3px),
            radial-gradient(circle, rgba(157,92,255,.34) 0 1px, transparent 1.3px),
            radial-gradient(circle, rgba(247,183,51,.35) 0 1px, transparent 1.3px);
          background-size: 96px 96px, 138px 138px, 176px 176px;
          background-position: 0 0, 44px 60px, 90px 20px;
          mask-image: radial-gradient(circle at 50% 38%, #000 0 42%, transparent 84%);
        }

        .qyasat-home::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .34;
          background:
            radial-gradient(circle at 9% 43%, rgba(33,244,255,.25), transparent 22rem),
            radial-gradient(circle at 88% 61%, rgba(247,183,51,.28), transparent 26rem),
            radial-gradient(circle at 46% 76%, rgba(157,92,255,.18), transparent 30rem);
          filter: blur(8px);
        }

        .qyasat-nav,
        .qyasat-hero,
        .qyasat-trust,
        .qyasat-section,
        .qyasat-ai,
        .qyasat-estimator,
        .qyasat-work,
        .qyasat-contact {
          position: relative;
          z-index: 1;
        }

        .qyasat-nav {
          min-height: 72px !important;
          padding: 14px 18px !important;
          border-radius: 24px !important;
          border: 1px solid rgba(255,255,255,.14) !important;
          background: rgba(8, 13, 25, .72) !important;
          backdrop-filter: blur(22px) !important;
          box-shadow:
            0 24px 90px rgba(0,0,0,.34),
            0 0 0 1px rgba(33,244,255,.08),
            inset 0 1px 0 rgba(255,255,255,.08) !important;
        }

        .qyasat-nav::after {
          content: "";
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: -1px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,244,255,.75), rgba(157,92,255,.58), rgba(247,183,51,.65), transparent);
          opacity: .85;
        }

        .qyasat-brand > span {
          background: linear-gradient(135deg, var(--ref-cyan) 0%, var(--ref-blue) 36%, var(--ref-violet) 72%, var(--ref-gold) 100%) !important;
          color: #051014 !important;
          box-shadow:
            0 0 34px rgba(33,244,255,.26),
            0 0 28px rgba(157,92,255,.18),
            0 0 24px rgba(247,183,51,.16) !important;
        }

        .qyasat-nav nav a {
          color: rgba(248,250,252,.72) !important;
          font-weight: 700 !important;
        }

        .qyasat-nav-cta,
        .qyasat-tools a,
        .qyasat-primary,
        .qyasat-contact a,
        .qyasat-estimator aside a {
          color: #041015 !important;
          background: linear-gradient(135deg, var(--ref-cyan) 0%, var(--ref-blue) 45%, var(--ref-violet) 78%, var(--ref-gold) 100%) !important;
          box-shadow:
            0 0 38px rgba(33,244,255,.30),
            0 0 34px rgba(157,92,255,.20),
            0 0 28px rgba(247,183,51,.16),
            inset 0 1px 0 rgba(255,255,255,.38) !important;
          font-weight: 900 !important;
        }

        .qyasat-secondary {
          color: #ffffff !important;
          border: 1px solid rgba(157,92,255,.52) !important;
          background: linear-gradient(135deg, rgba(157,92,255,.18), rgba(255,255,255,.035)) !important;
          box-shadow:
            0 0 28px rgba(157,92,255,.16),
            inset 0 1px 0 rgba(255,255,255,.08) !important;
        }

        .qyasat-hero {
          min-height: clamp(660px, 82vh, 820px) !important;
          gap: clamp(34px, 4vw, 64px) !important;
          padding-top: clamp(58px, 6vw, 88px) !important;
          padding-bottom: 44px !important;
          overflow: visible !important;
        }

        .qyasat-hero::before {
          content: "";
          position: absolute;
          left: -26vw;
          top: 26%;
          width: 66vw;
          height: 32vw;
          min-height: 350px;
          border-radius: 50%;
          border: 1px solid rgba(33,244,255,.28);
          transform: rotate(-10deg);
          box-shadow:
            0 0 52px rgba(33,244,255,.10),
            inset 0 0 70px rgba(33,244,255,.035);
          pointer-events: none;
        }

        .qyasat-hero::after {
          content: "";
          position: absolute;
          right: -25vw;
          bottom: 10%;
          width: 68vw;
          height: 31vw;
          min-height: 340px;
          border-radius: 50%;
          border: 1px solid rgba(247,183,51,.30);
          transform: rotate(10deg);
          box-shadow:
            0 0 58px rgba(247,183,51,.16),
            inset 0 0 76px rgba(247,183,51,.05);
          pointer-events: none;
        }

        .qyasat-badge,
        .qyasat-pill {
          color: #fff2b8 !important;
          border-color: rgba(247,183,51,.34) !important;
          background: linear-gradient(135deg, rgba(247,183,51,.12), rgba(157,92,255,.08)) !important;
          box-shadow:
            0 0 30px rgba(247,183,51,.12),
            inset 0 1px 0 rgba(255,255,255,.09) !important;
          font-weight: 850 !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1 {
          color: #ffffff !important;
          font-size: clamp(3.25rem, 6.4vw, 6.9rem) !important;
          line-height: .98 !important;
          letter-spacing: -.07em !important;
          font-weight: 950 !important;
          text-shadow:
            0 12px 36px rgba(0,0,0,.42),
            0 0 26px rgba(255,255,255,.08),
            0 0 34px rgba(33,244,255,.08) !important;
        }

        .qyasat-hero h1 span,
        .qyasat-copy h1 span {
          background: linear-gradient(135deg, #ffffff 0%, #eafcff 30%, var(--ref-cyan) 54%, #b7fff6 64%, var(--ref-gold-soft) 82%, var(--ref-violet) 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p {
          color: rgba(226,232,240,.74) !important;
          font-size: clamp(1.03rem, 1.42vw, 1.22rem) !important;
          line-height: 1.95 !important;
        }

        .qyasat-visual {
          height: clamp(490px, 43vw, 590px) !important;
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          overflow: visible !important;
        }

        .qyasat-visual::before {
          content: "";
          position: absolute;
          z-index: 0;
          width: 470px;
          height: 330px;
          left: 50%;
          top: 12%;
          transform: translateX(-50%) rotate(-4deg);
          border-radius: 48% 52% 44% 56% / 54% 46% 56% 44%;
          background:
            radial-gradient(circle at 28% 32%, rgba(33,244,255,.72), transparent 24%),
            radial-gradient(circle at 68% 32%, rgba(157,92,255,.66), transparent 28%),
            radial-gradient(circle at 42% 62%, rgba(247,183,51,.50), transparent 22%),
            radial-gradient(circle at 50% 45%, rgba(255,255,255,.12), transparent 42%),
            rgba(10,16,32,.22);
          filter:
            drop-shadow(0 0 24px rgba(33,244,255,.42))
            drop-shadow(0 0 30px rgba(157,92,255,.30))
            drop-shadow(0 0 24px rgba(247,183,51,.24));
          opacity: .95;
        }

        .qyasat-visual::after {
          content: "";
          position: absolute;
          z-index: 0;
          left: -20%;
          right: -28%;
          top: 41%;
          height: 210px;
          border-radius: 50%;
          border-top: 1px solid rgba(33,244,255,.34);
          border-bottom: 1px solid rgba(157,92,255,.28);
          transform: rotate(-9deg);
          box-shadow:
            0 -18px 40px rgba(33,244,255,.10),
            0 18px 38px rgba(157,92,255,.09);
        }

        .qyasat-core {
          z-index: 2 !important;
          top: 36% !important;
          width: 112px !important;
          height: 112px !important;
          background: rgba(255,255,255,.07) !important;
          border: 1px solid rgba(255,255,255,.16) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            0 0 46px rgba(33,244,255,.22) !important;
        }

        .qyasat-ring,
        .ring-a {
          border-color: rgba(33,244,255,.42) !important;
          box-shadow: 0 0 28px rgba(33,244,255,.14) !important;
        }

        .ring-b {
          border-color: rgba(157,92,255,.42) !important;
          box-shadow: 0 0 28px rgba(157,92,255,.14) !important;
        }

        .qyasat-code,
        .qyasat-mini-card,
        .qyasat-code-window,
        .qyasat-floating-card {
          z-index: 4 !important;
          border: 1px solid rgba(255,255,255,.13) !important;
          background: rgba(7, 12, 24, .66) !important;
          backdrop-filter: blur(18px) !important;
          box-shadow:
            0 24px 90px rgba(0,0,0,.34),
            0 0 28px rgba(33,244,255,.10),
            0 0 24px rgba(157,92,255,.08),
            inset 0 1px 0 rgba(255,255,255,.08) !important;
        }

        .qyasat-mini-card small {
          color: var(--ref-cyan) !important;
        }

        .qyasat-trust {
          border-color: rgba(255,255,255,.13) !important;
          background:
            linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.025)),
            radial-gradient(circle at 50% 0%, rgba(157,92,255,.10), transparent 18rem) !important;
          box-shadow:
            0 28px 100px rgba(0,0,0,.34),
            0 0 40px rgba(157,92,255,.10),
            inset 0 1px 0 rgba(255,255,255,.08) !important;
        }

        .qyasat-trust span,
        .trust-row article {
          color: rgba(248,250,252,.76) !important;
          border-color: rgba(255,255,255,.10) !important;
          background: rgba(0,0,0,.18) !important;
        }

        .qyasat-section-head p,
        .qyasat-ai p {
          color: var(--ref-gold) !important;
        }

        .qyasat-card,
        .qyasat-process article,
        .qyasat-work article,
        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact {
          border-color: rgba(255,255,255,.11) !important;
          background:
            radial-gradient(circle at 16% 0%, rgba(33,244,255,.10), transparent 14rem),
            radial-gradient(circle at 100% 100%, rgba(247,183,51,.09), transparent 16rem),
            linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.018)) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.08),
            0 24px 88px rgba(0,0,0,.24) !important;
        }

        .qyasat-card i,
        .card-icon {
          color: var(--ref-cyan) !important;
          border-color: rgba(33,244,255,.26) !important;
          background: rgba(33,244,255,.08) !important;
          box-shadow:
            0 0 28px rgba(33,244,255,.12),
            inset 0 1px 0 rgba(255,255,255,.07) !important;
        }

        .qyasat-card b,
        .roi {
          color: #dffcff !important;
          border-color: rgba(33,244,255,.16) !important;
          background: rgba(33,244,255,.07) !important;
        }

        @media (min-width: 901px) and (max-width: 1180px) {
          .qyasat-hero {
            min-height: 650px !important;
            gap: 30px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(3rem, 5.6vw, 5.4rem) !important;
          }

          .qyasat-visual {
            height: 460px !important;
          }

          .qyasat-visual::before {
            width: 400px;
            height: 290px;
          }
        }

        @media (max-width: 900px) {
          .qyasat-hero {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(2.7rem, 12vw, 4.6rem) !important;
          }

          .qyasat-visual {
            height: 430px !important;
          }

          .qyasat-visual::before {
            width: 340px;
            height: 250px;
          }
        }
        /* QYASAT_RESPONSIVE_POLISH_20260702 */

        html {
          scroll-behavior: smooth;
        }

        .qyasat-home {
          padding-left: max(18px, calc((100vw - 1320px) / 2)) !important;
          padding-right: max(18px, calc((100vw - 1320px) / 2)) !important;
        }

        .qyasat-nav {
          max-width: 100% !important;
          margin-inline: auto !important;
        }

        .qyasat-hero {
          grid-template-columns: minmax(430px, .86fr) minmax(0, 1.08fr) !important;
          align-items: center !important;
        }

        .qyasat-hero-copy,
        .qyasat-copy {
          justify-self: end !important;
          width: min(100%, 740px) !important;
        }

        .qyasat-visual {
          justify-self: start !important;
          width: min(100%, 560px) !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1 {
          max-width: 720px !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p {
          max-width: 660px !important;
        }

        .qyasat-trust {
          width: min(100%, 1120px) !important;
          margin-inline: auto !important;
        }

        .qyasat-section-head {
          padding-inline: 12px !important;
        }

        .qyasat-grid {
          align-items: stretch !important;
        }

        .qyasat-card {
          min-height: 270px !important;
        }

        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact {
          width: min(100%, 1180px) !important;
          margin-inline: auto !important;
        }

        .qyasat-contact {
          margin-top: 12px !important;
        }

        @media (min-width: 1181px) {
          .qyasat-hero {
            min-height: 720px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(4.4rem, 5.9vw, 6.65rem) !important;
          }

          .qyasat-visual {
            transform: translateY(-8px) !important;
          }

          .qyasat-trust {
            margin-top: -8px !important;
          }
        }

        @media (min-width: 901px) and (max-width: 1180px) {
          .qyasat-home {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }

          .qyasat-nav {
            min-height: 66px !important;
            padding: 12px 16px !important;
          }

          .qyasat-nav nav {
            gap: 18px !important;
          }

          .qyasat-nav nav a {
            font-size: .88rem !important;
          }

          .qyasat-brand > span {
            width: 40px !important;
            height: 40px !important;
          }

          .qyasat-brand strong {
            font-size: .94rem !important;
          }

          .qyasat-hero {
            grid-template-columns: minmax(360px, .84fr) minmax(0, 1fr) !important;
            min-height: 650px !important;
            gap: 26px !important;
            padding-top: 50px !important;
            padding-bottom: 34px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(3.35rem, 5.4vw, 5.35rem) !important;
            line-height: 1 !important;
            letter-spacing: -.062em !important;
          }

          .qyasat-subtitle,
          .qyasat-hero p,
          .qyasat-copy p {
            font-size: 1rem !important;
            line-height: 1.82 !important;
          }

          .qyasat-actions {
            margin-top: 22px !important;
          }

          .qyasat-primary,
          .qyasat-secondary,
          .qyasat-nav-cta,
          .qyasat-tools a {
            min-height: 44px !important;
            padding-inline: 17px !important;
            font-size: .88rem !important;
          }

          .qyasat-visual {
            width: 100% !important;
            height: 420px !important;
          }

          .qyasat-code {
            width: 230px !important;
          }

          .qyasat-mini-card {
            width: 260px !important;
          }

          .qyasat-trust {
            margin-bottom: 70px !important;
          }

          .qyasat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 13px !important;
          }

          .qyasat-card {
            padding: 22px !important;
          }

          .qyasat-card h3 {
            font-size: 1.08rem !important;
          }

          .qyasat-card p {
            font-size: .92rem !important;
          }
        }

        @media (min-width: 701px) and (max-width: 900px) {
          .qyasat-home {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }

          .qyasat-nav {
            min-height: 64px !important;
            grid-template-columns: 1fr auto !important;
          }

          .qyasat-nav nav {
            display: none !important;
          }

          .qyasat-hero {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding-top: 58px !important;
            gap: 34px !important;
          }

          .qyasat-hero-copy,
          .qyasat-copy {
            justify-self: stretch !important;
            text-align: right !important;
            width: 100% !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            max-width: 760px !important;
            font-size: clamp(4rem, 9vw, 5.7rem) !important;
          }

          .qyasat-subtitle,
          .qyasat-hero p,
          .qyasat-copy p {
            max-width: 720px !important;
          }

          .qyasat-actions {
            max-width: 560px !important;
          }

          .qyasat-visual {
            justify-self: center !important;
            width: min(100%, 620px) !important;
            height: 455px !important;
          }

          .qyasat-trust {
            margin-top: 8px !important;
            margin-bottom: 68px !important;
          }

          .qyasat-grid,
          .qyasat-work-grid,
          .qyasat-process {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .qyasat-home {
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-top: max(12px, env(safe-area-inset-top)) !important;
          }

          .qyasat-nav {
            top: max(10px, env(safe-area-inset-top)) !important;
            min-height: 58px !important;
            padding: 10px 11px !important;
            border-radius: 18px !important;
            grid-template-columns: 1fr auto !important;
          }

          .qyasat-nav nav {
            display: none !important;
          }

          .qyasat-brand {
            gap: 9px !important;
          }

          .qyasat-brand > span {
            width: 38px !important;
            height: 38px !important;
            border-radius: 13px !important;
            font-size: .86rem !important;
          }

          .qyasat-brand strong {
            font-size: .9rem !important;
          }

          .qyasat-brand small,
          .qyasat-tools span {
            display: none !important;
          }

          .qyasat-tools {
            gap: 0 !important;
          }

          .qyasat-nav-cta,
          .qyasat-tools a {
            min-height: 40px !important;
            padding-inline: 13px !important;
            font-size: .82rem !important;
          }

          .qyasat-hero {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding-top: 42px !important;
            padding-bottom: 28px !important;
            gap: 28px !important;
          }

          .qyasat-hero-copy,
          .qyasat-copy {
            justify-self: stretch !important;
            width: 100% !important;
          }

          .qyasat-badge,
          .qyasat-pill {
            font-size: .82rem !important;
            padding: 7px 11px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            max-width: 100% !important;
            font-size: clamp(2.85rem, 14.2vw, 4.5rem) !important;
            line-height: 1.03 !important;
            letter-spacing: -.052em !important;
            margin-top: 16px !important;
            margin-bottom: 14px !important;
          }

          .qyasat-subtitle,
          .qyasat-hero p,
          .qyasat-copy p {
            max-width: 100% !important;
            font-size: .96rem !important;
            line-height: 1.82 !important;
          }

          .qyasat-actions {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            margin-top: 22px !important;
          }

          .qyasat-primary,
          .qyasat-secondary,
          .qyasat-contact a,
          .qyasat-estimator aside a {
            width: 100% !important;
            min-height: 46px !important;
            font-size: .92rem !important;
          }

          .qyasat-visual {
            justify-self: center !important;
            width: calc(100vw - 24px) !important;
            height: 390px !important;
            border-radius: 24px !important;
            transform: none !important;
          }

          .qyasat-visual::before {
            width: 315px !important;
            height: 230px !important;
            top: 12% !important;
          }

          .qyasat-core {
            width: 90px !important;
            height: 90px !important;
            top: 37% !important;
          }

          .qyasat-code {
            width: calc(100% - 42px) !important;
            left: 21px !important;
            right: 21px !important;
            top: 18px !important;
          }

          .qyasat-mini-card {
            width: calc(100% - 42px) !important;
            left: 21px !important;
            right: 21px !important;
            bottom: 18px !important;
          }

          .qyasat-trust {
            width: 100% !important;
            margin-top: 0 !important;
            margin-bottom: 58px !important;
            padding: 14px !important;
            border-radius: 20px !important;
          }

          .qyasat-trust div {
            gap: 8px !important;
          }

          .qyasat-trust span,
          .trust-row article {
            font-size: .8rem !important;
            padding: 8px 10px !important;
          }

          .qyasat-section,
          .qyasat-ai,
          .qyasat-estimator,
          .qyasat-work {
            margin-bottom: 62px !important;
          }

          .qyasat-section-head {
            margin-bottom: 24px !important;
          }

          .qyasat-section-head h2,
          .qyasat-ai h2,
          .qyasat-contact h2 {
            font-size: clamp(2rem, 9vw, 3rem) !important;
            line-height: 1.15 !important;
          }

          .qyasat-section-head span,
          .qyasat-ai span,
          .qyasat-contact p {
            font-size: .94rem !important;
            line-height: 1.78 !important;
          }

          .qyasat-grid,
          .qyasat-work-grid,
          .qyasat-process,
          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            grid-template-columns: 1fr !important;
          }

          .qyasat-card,
          .qyasat-process article,
          .qyasat-work article {
            padding: 20px !important;
            border-radius: 22px !important;
          }

          .qyasat-card {
            min-height: auto !important;
          }

          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            padding: 21px !important;
            border-radius: 24px !important;
          }
        }

        @media (display-mode: standalone) and (max-width: 700px) {
          .qyasat-home {
            padding-top: max(14px, env(safe-area-inset-top)) !important;
            padding-bottom: max(74px, env(safe-area-inset-bottom)) !important;
          }

          .qyasat-nav {
            backdrop-filter: blur(24px) !important;
          }

          .qyasat-contact {
            margin-bottom: max(56px, env(safe-area-inset-bottom)) !important;
          }
        }
        /* QYASAT_BRAND_LOGO_20260704 */

        .qyasat-brand {
          min-width: 176px !important;
          gap: 0 !important;
          align-items: center !important;
        }

        .qyasat-brand > span {
          display: none !important;
        }

        .qyasat-brand strong {
          display: block !important;
          width: clamp(138px, 14vw, 188px) !important;
          height: 42px !important;
          overflow: hidden !important;
          color: transparent !important;
          font-size: 0 !important;
          line-height: 0 !important;
          background-image: url("/brand/qyasat-logo.svg") !important;
          background-repeat: no-repeat !important;
          background-position: center right !important;
          background-size: contain !important;
          filter:
            drop-shadow(0 0 18px rgba(33,244,255,.12))
            drop-shadow(0 0 16px rgba(247,183,51,.08)) !important;
        }

        .qyasat-brand small {
          display: none !important;
        }

        @media (max-width: 700px) {
          .qyasat-brand {
            min-width: 132px !important;
          }

          .qyasat-brand strong {
            width: 132px !important;
            height: 36px !important;
          }
        }
        /* QYASAT_CONSOLE_LUXURY_20260704 */

        .qyasat-home {
          --console-max: 1180px;
          --console-bg: #05070d;
          --console-panel: rgba(5, 10, 20, .72);
          --console-border: rgba(255,255,255,.115);
          --console-line: rgba(33,244,255,.18);
          --console-text: #f8fafc;
          --console-muted: rgba(226,232,240,.66);
          --console-cyan: #21f4ff;
          --console-violet: #9d5cff;
          --console-gold: #f7b733;

          background:
            radial-gradient(circle at 18% 20%, rgba(33,244,255,.15), transparent 28rem),
            radial-gradient(circle at 80% 36%, rgba(157,92,255,.12), transparent 32rem),
            linear-gradient(135deg, #03050b 0%, #07101d 48%, #030409 100%) !important;
        }

        .qyasat-nav,
        .qyasat-hero,
        .qyasat-trust,
        .qyasat-section,
        .qyasat-ai,
        .qyasat-estimator,
        .qyasat-work,
        .qyasat-contact {
          max-width: var(--console-max) !important;
        }

        .qyasat-nav {
          min-height: 62px !important;
          border-radius: 18px !important;
          background: rgba(4, 8, 16, .82) !important;
          border-color: var(--console-border) !important;
          box-shadow:
            0 18px 70px rgba(0,0,0,.32),
            inset 0 1px 0 rgba(255,255,255,.065) !important;
        }

        .qyasat-nav::before {
          content: "<qyasat.sa />" !important;
          position: absolute !important;
          inset-inline-start: 18px !important;
          bottom: -28px !important;
          color: rgba(33,244,255,.55) !important;
          font: 700 12px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          letter-spacing: .01em !important;
        }

        .qyasat-nav nav a {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          font-size: .78rem !important;
          color: rgba(248,250,252,.62) !important;
        }

        .qyasat-brand > span {
          background: linear-gradient(135deg, var(--console-cyan), var(--console-violet), var(--console-gold)) !important;
        }

        .qyasat-hero {
          min-height: 620px !important;
          grid-template-columns: minmax(480px, .95fr) minmax(430px, 1.05fr) !important;
          gap: clamp(34px, 4vw, 58px) !important;
          align-items: center !important;
          padding-top: 68px !important;
          padding-bottom: 38px !important;
        }

        .qyasat-hero-copy,
        .qyasat-copy {
          max-width: 570px !important;
        }

        .qyasat-badge,
        .qyasat-pill {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          color: rgba(33,244,255,.88) !important;
          border-color: rgba(33,244,255,.20) !important;
          background: rgba(33,244,255,.055) !important;
          box-shadow: none !important;
        }

        .qyasat-badge::before,
        .qyasat-pill::before {
          content: "// " !important;
          color: rgba(247,183,51,.86) !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1 {
          max-width: 570px !important;
          font-size: clamp(3rem, 4.15vw, 4.75rem) !important;
          line-height: 1.14 !important;
          letter-spacing: -.035em !important;
          font-weight: 900 !important;
          margin: 16px 0 16px !important;
          text-shadow: 0 18px 46px rgba(0,0,0,.45) !important;
        }

        .qyasat-hero h1::before,
        .qyasat-copy h1::before {
          content: "const future = " !important;
          display: block !important;
          margin-bottom: 10px !important;
          color: rgba(33,244,255,.72) !important;
          font: 800 .9rem/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          letter-spacing: 0 !important;
        }

        .qyasat-hero h1 span,
        .qyasat-copy h1 span {
          display: inline !important;
          background: linear-gradient(135deg, #fff 0%, #bfffff 44%, var(--console-cyan) 58%, var(--console-gold) 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p {
          max-width: 540px !important;
          font-size: clamp(.94rem, 1.02vw, 1.04rem) !important;
          line-height: 1.86 !important;
          color: var(--console-muted) !important;
        }

        .qyasat-actions {
          margin-top: 22px !important;
        }

        .qyasat-primary,
        .qyasat-secondary,
        .qyasat-nav-cta,
        .qyasat-tools a {
          min-height: 42px !important;
          padding-inline: 17px !important;
          border-radius: 12px !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          font-size: .8rem !important;
        }

        .qyasat-secondary {
          background: rgba(255,255,255,.035) !important;
          border-color: rgba(255,255,255,.12) !important;
        }

        .qyasat-visual {
          width: min(100%, 575px) !important;
          height: 440px !important;
          border-radius: 22px !important;
          border: 1px solid var(--console-border) !important;
          background:
            linear-gradient(rgba(33,244,255,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(33,244,255,.045) 1px, transparent 1px),
            rgba(3, 8, 17, .68) !important;
          background-size: 28px 28px !important;
          box-shadow:
            0 28px 95px rgba(0,0,0,.36),
            0 0 46px rgba(33,244,255,.09),
            inset 0 1px 0 rgba(255,255,255,.075) !important;
          overflow: hidden !important;
        }

        .qyasat-visual::before {
          content: "{ }" !important;
          position: absolute !important;
          z-index: 0 !important;
          inset-inline-start: 34px !important;
          top: 34px !important;
          width: auto !important;
          height: auto !important;
          transform: none !important;
          border-radius: 0 !important;
          background: none !important;
          filter: none !important;
          opacity: .12 !important;
          color: #ffffff !important;
          font: 900 12rem/.8 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-visual::after {
          content: "npm run build && deploy" !important;
          position: absolute !important;
          left: 22px !important;
          right: 22px !important;
          bottom: 22px !important;
          height: auto !important;
          transform: none !important;
          border: 1px solid rgba(33,244,255,.16) !important;
          border-radius: 14px !important;
          padding: 13px 14px !important;
          color: rgba(33,244,255,.82) !important;
          background: rgba(0,0,0,.30) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06) !important;
          font: 800 .82rem/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-core {
          top: 43% !important;
          width: 86px !important;
          height: 86px !important;
          border-radius: 18px !important;
          color: #041015 !important;
          background: linear-gradient(135deg, var(--console-cyan), var(--console-violet), var(--console-gold)) !important;
          box-shadow:
            0 0 40px rgba(33,244,255,.22),
            0 0 34px rgba(157,92,255,.14) !important;
        }

        .qyasat-ring,
        .ring-a,
        .ring-b {
          border-style: dashed !important;
          opacity: .52 !important;
        }

        .qyasat-code,
        .qyasat-code-window,
        .qyasat-mini-card,
        .qyasat-floating-card {
          border-radius: 16px !important;
          border: 1px solid rgba(255,255,255,.11) !important;
          background: rgba(4, 9, 18, .78) !important;
          backdrop-filter: blur(18px) !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-code strong,
        .qyasat-code-window b,
        .qyasat-mini-card strong,
        .qyasat-floating-card strong {
          color: rgba(248,250,252,.92) !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-code span,
        .qyasat-code-window em,
        .qyasat-mini-card b,
        .qyasat-floating-card p {
          color: rgba(226,232,240,.58) !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-section-head {
          text-align: right !important;
          max-width: 760px !important;
          margin-inline: 0 auto !important;
        }

        .qyasat-section-head p::before,
        .qyasat-ai p::before {
          content: "" !important;
          color: rgba(33,244,255,.82) !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-section-head::after {
          margin-inline: 0 !important;
          background: linear-gradient(90deg, var(--console-cyan), var(--console-violet), var(--console-gold), transparent) !important;
        }

        .qyasat-card,
        .qyasat-process article,
        .qyasat-work article,
        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact {
          border-radius: 18px !important;
          background:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            rgba(4, 9, 18, .62) !important;
          background-size: 24px 24px !important;
          border-color: rgba(255,255,255,.10) !important;
        }

        .qyasat-card h3,
        .qyasat-process h3,
        .qyasat-work h3 {
          font-size: 1rem !important;
        }

        .qyasat-card i,
        .card-icon {
          border-radius: 12px !important;
          color: var(--console-cyan) !important;
          background: rgba(33,244,255,.065) !important;
        }

        .qyasat-card b,
        .qyasat-work article small {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        @media (max-width: 900px) {
          .qyasat-nav::before {
            display: none !important;
          }

          .qyasat-hero {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding-top: 38px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(2.2rem, 8.6vw, 3.25rem) !important;
            line-height: 1.18 !important;
          }

          .qyasat-visual {
            height: 320px !important;
          }

          .qyasat-visual::before {
            font-size: 7rem !important;
            inset-inline-start: 22px !important;
            top: 28px !important;
          }
        }

        @media (max-width: 700px) {
          .qyasat-home {
            padding-inline: 12px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(1.95rem, 8vw, 2.85rem) !important;
            line-height: 1.2 !important;
            letter-spacing: -.018em !important;
          }

          .qyasat-hero h1::before,
          .qyasat-copy h1::before {
            font-size: .76rem !important;
          }

          .qyasat-visual {
            height: 285px !important;
            border-radius: 18px !important;
          }

          .qyasat-visual::after {
            left: 14px !important;
            right: 14px !important;
            bottom: 14px !important;
            font-size: .66rem !important;
            padding: 10px 11px !important;
          }

          .qyasat-core {
            width: 62px !important;
            height: 62px !important;
            border-radius: 15px !important;
          }

          .qyasat-code,
          .qyasat-code-window,
          .qyasat-mini-card,
          .qyasat-floating-card {
            border-radius: 14px !important;
          }

          .qyasat-section-head {
            max-width: 100% !important;
          }
        }
        /* QYASAT_LIGHT_ORBIT_LUXURY_20260704 */

        .qyasat-home {
          --light-bg: #fffaf1;
          --light-bg-2: #f3fbff;
          --light-text: #111827;
          --light-muted: rgba(31, 41, 55, .68);
          --light-soft: rgba(255,255,255,.72);
          --light-border: rgba(17,24,39,.105);
          --light-cyan: #05c8de;
          --light-blue: #3388ff;
          --light-violet: #8b5cf6;
          --light-gold: #d99b22;

          color: var(--light-text) !important;
          background:
            radial-gradient(circle at 16% 18%, rgba(5,200,222,.18), transparent 30rem),
            radial-gradient(circle at 80% 26%, rgba(217,155,34,.20), transparent 32rem),
            radial-gradient(circle at 48% 78%, rgba(139,92,246,.12), transparent 34rem),
            linear-gradient(135deg, #fffaf1 0%, #f6fbff 46%, #fff7e8 100%) !important;
        }

        .qyasat-home::before {
          opacity: .38 !important;
          background-image:
            radial-gradient(circle, rgba(5,200,222,.22) 0 1px, transparent 1.4px),
            radial-gradient(circle, rgba(217,155,34,.20) 0 1px, transparent 1.4px),
            radial-gradient(circle, rgba(139,92,246,.18) 0 1px, transparent 1.4px) !important;
          background-size: 108px 108px, 152px 152px, 190px 190px !important;
        }

        .qyasat-home::after {
          opacity: .42 !important;
          background:
            radial-gradient(circle at 12% 46%, rgba(5,200,222,.20), transparent 23rem),
            radial-gradient(circle at 86% 56%, rgba(217,155,34,.20), transparent 25rem),
            radial-gradient(circle at 46% 78%, rgba(139,92,246,.14), transparent 28rem) !important;
        }

        .qyasat-nav {
          min-height: 66px !important;
          border-radius: 24px !important;
          border: 1px solid rgba(17,24,39,.10) !important;
          background: rgba(255,255,255,.72) !important;
          backdrop-filter: blur(22px) saturate(1.2) !important;
          box-shadow:
            0 24px 80px rgba(17,24,39,.10),
            inset 0 1px 0 rgba(255,255,255,.86) !important;
        }

        .qyasat-nav::before {
          display: none !important;
          content: "" !important;
        }

        .qyasat-nav::after {
          background: linear-gradient(90deg, transparent, rgba(5,200,222,.55), rgba(139,92,246,.40), rgba(217,155,34,.52), transparent) !important;
          opacity: .78 !important;
        }

        .qyasat-brand strong {
          background-image: url("/brand/qyasat-logo.svg") !important;
          filter:
            drop-shadow(0 8px 22px rgba(17,24,39,.08))
            drop-shadow(0 0 14px rgba(5,200,222,.08)) !important;
        }

        .qyasat-nav nav a {
          color: rgba(17,24,39,.66) !important;
        }

        .qyasat-nav nav a:hover {
          color: #111827 !important;
        }

        .qyasat-badge,
        .qyasat-pill {
          color: #8a5c12 !important;
          border-color: rgba(217,155,34,.22) !important;
          background: rgba(255,255,255,.68) !important;
          box-shadow:
            0 12px 34px rgba(17,24,39,.06),
            inset 0 1px 0 rgba(255,255,255,.85) !important;
        }

        .qyasat-badge::before,
        .qyasat-pill::before,
        .qyasat-hero h1::before,
        .qyasat-copy h1::before {
          display: none !important;
          content: "" !important;
        }

        .qyasat-hero {
          min-height: 660px !important;
          grid-template-columns: minmax(500px, .96fr) minmax(430px, 1.04fr) !important;
          gap: clamp(36px, 4.2vw, 64px) !important;
          padding-top: 58px !important;
          padding-bottom: 42px !important;
        }

        .qyasat-hero-copy,
        .qyasat-copy {
          max-width: 610px !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1 {
          max-width: 610px !important;
          color: var(--light-text) !important;
          font-size: clamp(3.35rem, 4.45vw, 5.25rem) !important;
          line-height: 1.1 !important;
          letter-spacing: -.045em !important;
          text-shadow: none !important;
        }

        .qyasat-hero h1 span,
        .qyasat-copy h1 span {
          display: inline !important;
          background: linear-gradient(135deg, #111827 0%, #0b7285 35%, var(--light-cyan) 54%, var(--light-violet) 74%, var(--light-gold) 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p {
          color: var(--light-muted) !important;
          font-size: clamp(.98rem, 1.08vw, 1.1rem) !important;
          line-height: 1.86 !important;
        }

        .qyasat-primary,
        .qyasat-nav-cta,
        .qyasat-tools a,
        .qyasat-contact a,
        .qyasat-estimator aside a {
          color: #ffffff !important;
          background: linear-gradient(135deg, #06bfd5 0%, #3388ff 42%, #8b5cf6 72%, #d99b22 100%) !important;
          box-shadow:
            0 16px 36px rgba(5,200,222,.20),
            0 14px 30px rgba(139,92,246,.12),
            inset 0 1px 0 rgba(255,255,255,.36) !important;
        }

        .qyasat-secondary {
          color: #111827 !important;
          border: 1px solid rgba(17,24,39,.12) !important;
          background: rgba(255,255,255,.72) !important;
          box-shadow:
            0 14px 34px rgba(17,24,39,.07),
            inset 0 1px 0 rgba(255,255,255,.86) !important;
        }

        .qyasat-visual {
          position: relative !important;
          width: min(100%, 590px) !important;
          height: clamp(430px, 38vw, 520px) !important;
          border: 1px solid rgba(17,24,39,.10) !important;
          border-radius: 34px !important;
          background:
            radial-gradient(circle at 48% 38%, rgba(5,200,222,.13), transparent 16rem),
            radial-gradient(circle at 70% 58%, rgba(217,155,34,.12), transparent 18rem),
            linear-gradient(145deg, rgba(255,255,255,.78), rgba(255,255,255,.42)) !important;
          box-shadow:
            0 30px 90px rgba(17,24,39,.12),
            inset 0 1px 0 rgba(255,255,255,.9) !important;
          overflow: visible !important;
        }

        .qyasat-visual::before {
          content: "" !important;
          position: absolute !important;
          z-index: 0 !important;
          left: 50% !important;
          top: 10% !important;
          width: 420px !important;
          height: 300px !important;
          transform: translateX(-50%) rotate(-4deg) !important;
          border-radius: 48% 52% 44% 56% / 54% 46% 56% 44% !important;
          background:
            radial-gradient(circle at 26% 32%, rgba(5,200,222,.52), transparent 24%),
            radial-gradient(circle at 68% 34%, rgba(139,92,246,.42), transparent 28%),
            radial-gradient(circle at 45% 64%, rgba(217,155,34,.38), transparent 22%),
            radial-gradient(circle at 50% 45%, rgba(255,255,255,.60), transparent 44%) !important;
          filter:
            drop-shadow(0 0 26px rgba(5,200,222,.28))
            drop-shadow(0 0 28px rgba(139,92,246,.18))
            drop-shadow(0 0 24px rgba(217,155,34,.16)) !important;
          opacity: .92 !important;
        }

        .qyasat-visual::after {
          content: "" !important;
          position: absolute !important;
          z-index: 1 !important;
          left: -18% !important;
          right: -22% !important;
          top: 42% !important;
          height: 190px !important;
          padding: 0 !important;
          border-radius: 50% !important;
          border: 1px solid rgba(5,200,222,.34) !important;
          border-bottom-color: rgba(217,155,34,.26) !important;
          background: transparent !important;
          transform: rotate(-9deg) !important;
          box-shadow:
            0 0 34px rgba(5,200,222,.12),
            inset 0 0 24px rgba(255,255,255,.30) !important;
        }

        .qyasat-ring,
        .ring-a,
        .ring-b {
          border-style: solid !important;
          opacity: .78 !important;
          border-color: rgba(5,200,222,.28) !important;
          box-shadow: 0 0 26px rgba(5,200,222,.12) !important;
        }

        .ring-b {
          border-color: rgba(217,155,34,.26) !important;
        }

        .qyasat-core {
          z-index: 3 !important;
          width: 92px !important;
          height: 92px !important;
          border-radius: 25px !important;
          color: #ffffff !important;
          background: linear-gradient(135deg, var(--light-cyan), var(--light-blue), var(--light-violet), var(--light-gold)) !important;
          box-shadow:
            0 22px 50px rgba(5,200,222,.20),
            0 16px 38px rgba(139,92,246,.13),
            inset 0 1px 0 rgba(255,255,255,.42) !important;
        }

        .qyasat-code,
        .qyasat-code-window,
        .qyasat-mini-card,
        .qyasat-floating-card {
          z-index: 4 !important;
          color: var(--light-text) !important;
          border: 1px solid rgba(17,24,39,.105) !important;
          background: rgba(255,255,255,.76) !important;
          backdrop-filter: blur(20px) saturate(1.25) !important;
          box-shadow:
            0 20px 58px rgba(17,24,39,.10),
            inset 0 1px 0 rgba(255,255,255,.88) !important;
        }

        .qyasat-code strong,
        .qyasat-code-window b,
        .qyasat-mini-card strong,
        .qyasat-floating-card strong,
        .qyasat-card h3,
        .qyasat-process h3,
        .qyasat-work h3,
        .qyasat-estimator h3 {
          color: var(--light-text) !important;
        }

        .qyasat-code span,
        .qyasat-code-window em,
        .qyasat-mini-card b,
        .qyasat-floating-card p,
        .qyasat-card p,
        .qyasat-process p,
        .qyasat-work p,
        .qyasat-estimator p {
          color: rgba(31,41,55,.64) !important;
        }

        .qyasat-trust,
        .qyasat-card,
        .qyasat-process article,
        .qyasat-work article,
        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact {
          color: var(--light-text) !important;
          border: 1px solid rgba(17,24,39,.095) !important;
          background:
            radial-gradient(circle at 12% 0%, rgba(5,200,222,.075), transparent 14rem),
            radial-gradient(circle at 100% 100%, rgba(217,155,34,.07), transparent 15rem),
            rgba(255,255,255,.70) !important;
          backdrop-filter: blur(20px) saturate(1.22) !important;
          box-shadow:
            0 24px 76px rgba(17,24,39,.09),
            inset 0 1px 0 rgba(255,255,255,.86) !important;
        }

        .qyasat-section-head p,
        .qyasat-ai p {
          color: #a26910 !important;
        }

        .qyasat-section-head h2,
        .qyasat-ai h2,
        .qyasat-contact h2 {
          color: var(--light-text) !important;
          text-shadow: none !important;
        }

        .qyasat-section-head span,
        .qyasat-ai span,
        .qyasat-contact p,
        .qyasat-trust p {
          color: rgba(31,41,55,.64) !important;
        }

        .qyasat-card i,
        .card-icon {
          color: #047d8d !important;
          border-color: rgba(5,200,222,.22) !important;
          background: rgba(5,200,222,.09) !important;
          box-shadow: none !important;
        }

        .qyasat-card b,
        .roi,
        .qyasat-work article small {
          color: #8a5c12 !important;
          border-color: rgba(217,155,34,.18) !important;
          background: rgba(217,155,34,.08) !important;
        }

        .qyasat-trust span,
        .trust-row article {
          color: rgba(17,24,39,.68) !important;
          border-color: rgba(17,24,39,.09) !important;
          background: rgba(255,255,255,.62) !important;
        }

        @media (max-width: 900px) {
          .qyasat-hero {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding-top: 44px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(2.35rem, 9vw, 3.8rem) !important;
            line-height: 1.16 !important;
          }

          .qyasat-visual {
            height: 380px !important;
          }

          .qyasat-visual::before {
            width: 330px !important;
            height: 235px !important;
          }
        }

        @media (max-width: 700px) {
          .qyasat-home {
            padding-inline: 12px !important;
          }

          .qyasat-nav {
            min-height: 58px !important;
            border-radius: 19px !important;
          }

          .qyasat-hero {
            padding-top: 36px !important;
            gap: 24px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(2.05rem, 8.9vw, 3.05rem) !important;
            line-height: 1.2 !important;
            letter-spacing: -.026em !important;
          }

          .qyasat-subtitle,
          .qyasat-hero p,
          .qyasat-copy p {
            font-size: .88rem !important;
            line-height: 1.72 !important;
          }

          .qyasat-visual {
            height: 305px !important;
            border-radius: 24px !important;
          }

          .qyasat-visual::before {
            width: 245px !important;
            height: 176px !important;
            top: 13% !important;
          }

          .qyasat-visual::after {
            left: -18% !important;
            right: -18% !important;
            height: 126px !important;
          }

          .qyasat-core {
            width: 66px !important;
            height: 66px !important;
            border-radius: 18px !important;
          }
        }
        /* QYASAT_LIGHT_CODE_EFFECTS_20260704 */

        .qyasat-nav::before {
          display: block !important;
          content: "<qyasat.sa />" !important;
          position: absolute !important;
          inset-inline-start: 22px !important;
          bottom: -27px !important;
          color: rgba(5, 126, 141, .58) !important;
          font: 800 12px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          letter-spacing: .01em !important;
        }

        .qyasat-badge,
        .qyasat-pill {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-badge::before,
        .qyasat-pill::before {
          display: inline !important;
          content: "// " !important;
          color: rgba(217,155,34,.92) !important;
        }

        .qyasat-hero h1::before,
        .qyasat-copy h1::before {
          display: block !important;
          content: "const qyasatCore = buildFuture();" !important;
          margin-bottom: 11px !important;
          color: rgba(4, 125, 141, .78) !important;
          font: 850 .92rem/1.25 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          letter-spacing: 0 !important;
          text-shadow: none !important;
        }

        .qyasat-visual {
          background:
            linear-gradient(rgba(5,200,222,.095) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5,200,222,.08) 1px, transparent 1px),
            radial-gradient(circle at 48% 38%, rgba(5,200,222,.13), transparent 16rem),
            radial-gradient(circle at 70% 58%, rgba(217,155,34,.12), transparent 18rem),
            linear-gradient(145deg, rgba(255,255,255,.84), rgba(255,255,255,.46)) !important;
          background-size: 30px 30px, 30px 30px, auto, auto, auto !important;
        }

        .qyasat-visual .qyasat-code,
        .qyasat-code,
        .qyasat-code-window {
          top: 28px !important;
          width: 270px !important;
          padding: 18px 18px 16px !important;
          border-radius: 18px !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-code::before,
        .qyasat-code-window::before {
          content: "●  ●  ●" !important;
          display: block !important;
          margin-bottom: 13px !important;
          color: rgba(217,155,34,.78) !important;
          font-size: .72rem !important;
          letter-spacing: .34em !important;
        }

        .qyasat-mini-card,
        .qyasat-floating-card {
          bottom: 28px !important;
          width: 300px !important;
          padding: 18px !important;
          border-radius: 18px !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-mini-card::before,
        .qyasat-floating-card::before {
          content: "$ npm run deploy" !important;
          display: block !important;
          margin-bottom: 12px !important;
          color: rgba(4, 125, 141, .82) !important;
          font: 850 .74rem/1.3 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-code strong,
        .qyasat-code-window b,
        .qyasat-mini-card strong,
        .qyasat-floating-card strong {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          letter-spacing: -.01em !important;
        }

        .qyasat-code span,
        .qyasat-code-window em,
        .qyasat-mini-card b,
        .qyasat-floating-card p {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-ring,
        .ring-a,
        .ring-b {
          border-style: dashed !important;
        }

        .qyasat-section-head p::before,
        .qyasat-ai p::before {
          content: "" !important;
          color: rgba(4, 125, 141, .78) !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-card b,
        .qyasat-work article small {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-card h3::before {
          content: "<" !important;
          color: rgba(5, 126, 141, .72) !important;
          margin-inline-end: 2px !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        .qyasat-card h3::after {
          content: " />" !important;
          color: rgba(217,155,34,.78) !important;
          margin-inline-start: 2px !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        @media (max-width: 900px) {
          .qyasat-nav::before {
            display: none !important;
          }

          .qyasat-hero h1::before,
          .qyasat-copy h1::before {
            font-size: .78rem !important;
            margin-bottom: 9px !important;
          }

          .qyasat-code,
          .qyasat-code-window {
            width: 245px !important;
            padding: 14px !important;
          }

          .qyasat-mini-card,
          .qyasat-floating-card {
            width: 270px !important;
            padding: 14px !important;
          }
        }

        @media (max-width: 700px) {
          .qyasat-hero h1::before,
          .qyasat-copy h1::before {
            content: "const mz = future();" !important;
            font-size: .68rem !important;
          }

          .qyasat-code,
          .qyasat-code-window {
            top: 14px !important;
            left: 16px !important;
            right: 16px !important;
            width: auto !important;
            padding: 11px 12px !important;
            border-radius: 15px !important;
          }

          .qyasat-mini-card,
          .qyasat-floating-card {
            bottom: 14px !important;
            left: 16px !important;
            right: 16px !important;
            width: auto !important;
            padding: 11px 12px !important;
            border-radius: 15px !important;
          }

          .qyasat-code::before,
          .qyasat-code-window::before,
          .qyasat-mini-card::before,
          .qyasat-floating-card::before {
            margin-bottom: 8px !important;
            font-size: .62rem !important;
          }

          .qyasat-card h3::before,
          .qyasat-card h3::after {
            display: none !important;
          }
        }
        /* QYASAT_PROFESSIONAL_LAYOUT_20260704 */

        .qyasat-home {
          --qyasat-layout-max: 1180px;
          --qyasat-section-gap: clamp(72px, 8vw, 118px);
          --qyasat-section-pad: clamp(26px, 3.2vw, 42px);
          --qyasat-card-radius: 24px;
        }

        .qyasat-nav,
        .qyasat-hero,
        .qyasat-trust,
        .qyasat-section,
        .qyasat-ai,
        .qyasat-estimator,
        .qyasat-work,
        .qyasat-contact {
          width: min(100%, var(--qyasat-layout-max)) !important;
          margin-inline: auto !important;
        }

        .qyasat-nav {
          margin-top: 18px !important;
          margin-bottom: 18px !important;
        }

        .qyasat-hero {
          min-height: auto !important;
          padding-top: clamp(52px, 6vw, 86px) !important;
          padding-bottom: clamp(56px, 6vw, 90px) !important;
          align-items: center !important;
        }

        .qyasat-hero-copy,
        .qyasat-copy {
          align-self: center !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1 {
          margin-top: 14px !important;
          margin-bottom: 18px !important;
          max-width: 640px !important;
          text-wrap: balance !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p {
          max-width: 610px !important;
        }

        .qyasat-actions {
          margin-top: 28px !important;
          gap: 12px !important;
        }

        .qyasat-visual {
          justify-self: end !important;
          transform: translateZ(0) !important;
        }

        .qyasat-trust {
          margin-top: 0 !important;
          margin-bottom: var(--qyasat-section-gap) !important;
          padding: 18px 20px !important;
          border-radius: 24px !important;
        }

        .trust-row,
        .qyasat-trust-row {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 12px !important;
          align-items: stretch !important;
        }

        .trust-row article,
        .qyasat-trust article,
        .qyasat-trust span {
          min-height: 58px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          border-radius: 16px !important;
        }

        .qyasat-section,
        .qyasat-ai,
        .qyasat-estimator,
        .qyasat-work,
        .qyasat-contact {
          margin-top: 0 !important;
          margin-bottom: var(--qyasat-section-gap) !important;
        }

        .qyasat-section {
          position: relative !important;
          padding-top: 0 !important;
        }

        .qyasat-section + .qyasat-section,
        .qyasat-section + .qyasat-ai,
        .qyasat-ai + .qyasat-estimator,
        .qyasat-estimator + .qyasat-work,
        .qyasat-work + .qyasat-contact {
          margin-top: calc(var(--qyasat-section-gap) * -.16) !important;
        }

        .qyasat-section-head {
          display: grid !important;
          grid-template-columns: minmax(0, .92fr) minmax(240px, .58fr) !important;
          gap: clamp(18px, 3vw, 42px) !important;
          align-items: end !important;
          max-width: 100% !important;
          margin-bottom: 30px !important;
          text-align: right !important;
        }

        .qyasat-section-head p {
          margin: 0 0 10px !important;
          font-size: .82rem !important;
          letter-spacing: .01em !important;
        }

        .qyasat-section-head h2 {
          max-width: 620px !important;
          margin: 0 !important;
          font-size: clamp(2rem, 3.2vw, 3.35rem) !important;
          line-height: 1.18 !important;
          letter-spacing: -.035em !important;
          text-wrap: balance !important;
        }

        .qyasat-section-head span {
          max-width: 430px !important;
          justify-self: end !important;
          font-size: .98rem !important;
          line-height: 1.82 !important;
        }

        .qyasat-section-head::after {
          grid-column: 1 / -1 !important;
          width: 100% !important;
          height: 1px !important;
          margin-top: 22px !important;
          opacity: .72 !important;
        }

        .qyasat-grid,
        .qyasat-cards,
        .services-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 18px !important;
          align-items: stretch !important;
        }

        .qyasat-card {
          min-height: 255px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          padding: 24px !important;
          border-radius: var(--qyasat-card-radius) !important;
        }

        .qyasat-card i,
        .card-icon {
          width: 46px !important;
          height: 46px !important;
          margin-bottom: 20px !important;
        }

        .qyasat-card h3 {
          margin: 0 0 12px !important;
          font-size: 1.08rem !important;
          line-height: 1.45 !important;
        }

        .qyasat-card p {
          margin: 0 !important;
          font-size: .94rem !important;
          line-height: 1.78 !important;
        }

        .qyasat-card b {
          width: fit-content !important;
          margin-top: 18px !important;
        }

        .qyasat-ai {
          padding: clamp(28px, 4vw, 44px) !important;
          border-radius: 30px !important;
        }

        .qyasat-ai h2 {
          max-width: 760px !important;
          font-size: clamp(2rem, 3.2vw, 3.35rem) !important;
          line-height: 1.18 !important;
          letter-spacing: -.035em !important;
          margin-bottom: 16px !important;
        }

        .qyasat-ai > p,
        .qyasat-ai > span {
          max-width: 760px !important;
          line-height: 1.84 !important;
        }

        .qyasat-ai-grid,
        .ai-grid {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 14px !important;
          margin-top: 28px !important;
        }

        .qyasat-ai-grid article,
        .ai-grid article {
          min-height: 132px !important;
          padding: 18px !important;
          border-radius: 20px !important;
        }

        .qyasat-estimator-box {
          display: grid !important;
          grid-template-columns: minmax(0, .95fr) minmax(320px, .62fr) !important;
          gap: clamp(22px, 3vw, 44px) !important;
          align-items: center !important;
          padding: clamp(26px, 4vw, 46px) !important;
          border-radius: 30px !important;
        }

        .qyasat-estimator h3 {
          font-size: clamp(1.75rem, 2.6vw, 2.75rem) !important;
          line-height: 1.2 !important;
          letter-spacing: -.025em !important;
          margin-bottom: 14px !important;
        }

        .qyasat-estimator p {
          max-width: 650px !important;
          line-height: 1.84 !important;
        }

        .qyasat-process {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 16px !important;
          counter-reset: mzstep !important;
        }

        .qyasat-process article {
          position: relative !important;
          min-height: 220px !important;
          padding: 24px !important;
          border-radius: var(--qyasat-card-radius) !important;
          counter-increment: mzstep !important;
        }

        .qyasat-process article::before {
          content: "0" counter(mzstep) !important;
          position: absolute !important;
          top: 18px !important;
          inset-inline-end: 18px !important;
          width: 42px !important;
          height: 42px !important;
          border-radius: 14px !important;
          display: grid !important;
          place-items: center !important;
          font: 900 .78rem/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          color: #047d8d !important;
          background: rgba(5,200,222,.09) !important;
          border: 1px solid rgba(5,200,222,.16) !important;
        }

        .qyasat-process h3 {
          max-width: calc(100% - 56px) !important;
          margin-top: 0 !important;
          margin-bottom: 12px !important;
        }

        .qyasat-process p {
          margin: 0 !important;
          font-size: .92rem !important;
          line-height: 1.76 !important;
        }

        .qyasat-work {
          display: block !important;
        }

        .qyasat-work-grid,
        .work-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 18px !important;
        }

        .qyasat-work article {
          min-height: 245px !important;
          padding: 24px !important;
          border-radius: var(--qyasat-card-radius) !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
        }

        .qyasat-work article h3 {
          margin: 0 0 12px !important;
        }

        .qyasat-work article p {
          margin: 0 !important;
          line-height: 1.76 !important;
        }

        .qyasat-contact {
          margin-bottom: 36px !important;
          padding: clamp(30px, 4.4vw, 54px) !important;
          border-radius: 34px !important;
          display: grid !important;
          grid-template-columns: minmax(0, .9fr) minmax(300px, .55fr) !important;
          gap: clamp(22px, 4vw, 52px) !important;
          align-items: center !important;
        }

        .qyasat-contact h2 {
          max-width: 640px !important;
          font-size: clamp(2rem, 3.35vw, 3.6rem) !important;
          line-height: 1.15 !important;
          letter-spacing: -.035em !important;
          margin-bottom: 16px !important;
        }

        .qyasat-contact p {
          max-width: 620px !important;
          line-height: 1.84 !important;
        }

        @media (min-width: 1200px) and (max-height: 860px) {
          .qyasat-hero {
            padding-top: 42px !important;
            padding-bottom: 54px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(3rem, 4vw, 4.55rem) !important;
            line-height: 1.12 !important;
          }

          .qyasat-visual {
            height: 430px !important;
          }
        }

        @media (max-width: 1100px) {
          .qyasat-hero {
            grid-template-columns: minmax(0, 1fr) minmax(360px, .85fr) !important;
            gap: 30px !important;
          }

          .qyasat-grid,
          .qyasat-cards,
          .services-grid,
          .qyasat-work-grid,
          .work-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .qyasat-process,
          .qyasat-ai-grid,
          .ai-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 900px) {
          .qyasat-home {
            --qyasat-section-gap: 66px;
          }

          .qyasat-section-head {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            margin-bottom: 22px !important;
          }

          .qyasat-section-head span {
            justify-self: start !important;
            max-width: 100% !important;
          }

          .trust-row,
          .qyasat-trust-row {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .qyasat-estimator-box,
          .qyasat-contact {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .qyasat-home {
            --qyasat-section-gap: 52px;
            --qyasat-card-radius: 20px;
          }

          .qyasat-nav {
            margin-top: 10px !important;
            margin-bottom: 8px !important;
          }

          .qyasat-hero {
            padding-top: 34px !important;
            padding-bottom: 42px !important;
          }

          .qyasat-actions {
            display: grid !important;
            grid-template-columns: 1fr !important;
            width: 100% !important;
          }

          .qyasat-actions a,
          .qyasat-actions button {
            width: 100% !important;
            justify-content: center !important;
          }

          .qyasat-trust {
            padding: 14px !important;
            border-radius: 20px !important;
          }

          .trust-row,
          .qyasat-trust-row,
          .qyasat-grid,
          .qyasat-cards,
          .services-grid,
          .qyasat-process,
          .qyasat-ai-grid,
          .ai-grid,
          .qyasat-work-grid,
          .work-grid {
            grid-template-columns: 1fr !important;
          }

          .qyasat-card,
          .qyasat-process article,
          .qyasat-work article {
            min-height: auto !important;
            padding: 20px !important;
          }

          .qyasat-section-head h2,
          .qyasat-ai h2,
          .qyasat-contact h2 {
            font-size: clamp(1.72rem, 8vw, 2.35rem) !important;
          }

          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            padding: 22px !important;
            border-radius: 24px !important;
          }
        }










      
        /* QYASAT_PROFESSIONAL_LIGHT_TONE_20260704 */

        .qyasat-home {
          --pro-bg: #f8f6f0;
          --pro-bg-2: #eef7f6;
          --pro-surface: rgba(255, 255, 255, .78);
          --pro-surface-solid: #ffffff;
          --pro-ink: #101827;
          --pro-muted: rgba(31, 41, 55, .68);
          --pro-border: rgba(16, 24, 39, .105);
          --pro-teal: #0f766e;
          --pro-cyan: #0891b2;
          --pro-gold: #b8872c;
          --pro-soft-teal: rgba(15, 118, 110, .11);
          --pro-soft-gold: rgba(184, 135, 44, .105);

          color: var(--pro-ink) !important;
          background:
            radial-gradient(circle at 18% 20%, rgba(8,145,178,.105), transparent 30rem),
            radial-gradient(circle at 84% 22%, rgba(184,135,44,.105), transparent 32rem),
            radial-gradient(circle at 52% 82%, rgba(15,118,110,.075), transparent 35rem),
            linear-gradient(135deg, #f8f6f0 0%, #f4f8f7 48%, #f7f1e7 100%) !important;
        }

        .qyasat-home::before {
          opacity: .22 !important;
          background-image:
            radial-gradient(circle, rgba(8,145,178,.22) 0 1px, transparent 1.4px),
            radial-gradient(circle, rgba(184,135,44,.16) 0 1px, transparent 1.4px) !important;
          background-size: 118px 118px, 172px 172px !important;
        }

        .qyasat-home::after {
          opacity: .24 !important;
          background:
            radial-gradient(circle at 14% 46%, rgba(8,145,178,.16), transparent 24rem),
            radial-gradient(circle at 86% 54%, rgba(184,135,44,.12), transparent 26rem) !important;
        }

        .qyasat-nav,
        .qyasat-trust,
        .qyasat-card,
        .qyasat-process article,
        .qyasat-work article,
        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact,
        .qyasat-code,
        .qyasat-code-window,
        .qyasat-mini-card,
        .qyasat-floating-card {
          background: var(--pro-surface) !important;
          border-color: var(--pro-border) !important;
          box-shadow:
            0 22px 70px rgba(16,24,39,.075),
            inset 0 1px 0 rgba(255,255,255,.86) !important;
        }

        .qyasat-nav {
          background: rgba(255,255,255,.82) !important;
        }

        .qyasat-nav::after {
          opacity: .42 !important;
          background: linear-gradient(90deg, transparent, rgba(8,145,178,.34), rgba(184,135,44,.28), transparent) !important;
        }

        .qyasat-nav::before {
          color: rgba(15, 118, 110, .56) !important;
        }

        .qyasat-nav nav a,
        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p,
        .qyasat-section-head span,
        .qyasat-ai span,
        .qyasat-contact p,
        .qyasat-card p,
        .qyasat-process p,
        .qyasat-work p,
        .qyasat-estimator p {
          color: var(--pro-muted) !important;
        }

        .qyasat-brand strong {
          background-image: url("/brand/qyasat-logo.svg") !important;
          filter: drop-shadow(0 10px 22px rgba(16,24,39,.08)) !important;
        }

        .qyasat-badge,
        .qyasat-pill {
          color: #6d501b !important;
          background: rgba(255,255,255,.74) !important;
          border-color: rgba(184,135,44,.20) !important;
          box-shadow:
            0 14px 34px rgba(16,24,39,.055),
            inset 0 1px 0 rgba(255,255,255,.88) !important;
        }

        .qyasat-badge::before,
        .qyasat-pill::before {
          color: rgba(184,135,44,.88) !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1,
        .qyasat-section-head h2,
        .qyasat-ai h2,
        .qyasat-contact h2,
        .qyasat-card h3,
        .qyasat-process h3,
        .qyasat-work h3,
        .qyasat-estimator h3 {
          color: var(--pro-ink) !important;
          text-shadow: none !important;
        }

        .qyasat-hero h1::before,
        .qyasat-copy h1::before {
          color: rgba(15,118,110,.78) !important;
        }

        .qyasat-hero h1 span,
        .qyasat-copy h1 span {
          color: var(--pro-ink) !important;
          background: linear-gradient(135deg, #101827 0%, #0f766e 54%, #6d501b 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
        }

        .qyasat-primary,
        .qyasat-nav-cta,
        .qyasat-tools a,
        .qyasat-contact a,
        .qyasat-estimator aside a {
          color: #ffffff !important;
          background: linear-gradient(135deg, #101827 0%, #0f766e 100%) !important;
          box-shadow:
            0 16px 34px rgba(15,118,110,.18),
            0 12px 26px rgba(16,24,39,.10),
            inset 0 1px 0 rgba(255,255,255,.20) !important;
        }

        .qyasat-secondary {
          color: var(--pro-ink) !important;
          background: rgba(255,255,255,.78) !important;
          border-color: var(--pro-border) !important;
          box-shadow:
            0 14px 32px rgba(16,24,39,.055),
            inset 0 1px 0 rgba(255,255,255,.88) !important;
        }

        .qyasat-visual {
          background:
            linear-gradient(rgba(8,145,178,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,145,178,.055) 1px, transparent 1px),
            radial-gradient(circle at 48% 38%, rgba(8,145,178,.10), transparent 16rem),
            radial-gradient(circle at 70% 58%, rgba(184,135,44,.08), transparent 18rem),
            rgba(255,255,255,.58) !important;
          background-size: 30px 30px, 30px 30px, auto, auto, auto !important;
          border-color: var(--pro-border) !important;
          box-shadow:
            0 30px 90px rgba(16,24,39,.09),
            inset 0 1px 0 rgba(255,255,255,.88) !important;
        }

        .qyasat-visual::before {
          opacity: .70 !important;
          background:
            radial-gradient(circle at 26% 32%, rgba(8,145,178,.26), transparent 24%),
            radial-gradient(circle at 66% 34%, rgba(15,118,110,.18), transparent 28%),
            radial-gradient(circle at 45% 64%, rgba(184,135,44,.16), transparent 22%),
            radial-gradient(circle at 50% 45%, rgba(255,255,255,.62), transparent 44%) !important;
          filter:
            drop-shadow(0 0 22px rgba(8,145,178,.15))
            drop-shadow(0 0 20px rgba(184,135,44,.09)) !important;
        }

        .qyasat-visual::after {
          border-color: rgba(8,145,178,.24) !important;
          border-bottom-color: rgba(184,135,44,.18) !important;
          box-shadow:
            0 0 24px rgba(8,145,178,.075),
            inset 0 0 20px rgba(255,255,255,.26) !important;
        }

        .qyasat-core {
          color: #ffffff !important;
          background: linear-gradient(135deg, #101827 0%, #0f766e 100%) !important;
          box-shadow:
            0 22px 48px rgba(15,118,110,.16),
            0 16px 34px rgba(16,24,39,.10),
            inset 0 1px 0 rgba(255,255,255,.22) !important;
        }

        .qyasat-ring,
        .ring-a,
        .ring-b {
          border-color: rgba(8,145,178,.22) !important;
          opacity: .58 !important;
          box-shadow: 0 0 22px rgba(8,145,178,.075) !important;
        }

        .ring-b {
          border-color: rgba(184,135,44,.20) !important;
        }

        .qyasat-code::before,
        .qyasat-code-window::before {
          color: rgba(184,135,44,.72) !important;
        }

        .qyasat-mini-card::before,
        .qyasat-floating-card::before,
        .qyasat-section-head p::before,
        .qyasat-ai p::before,
        .qyasat-card h3::before {
          color: rgba(15,118,110,.76) !important;
        }

        .qyasat-card h3::after {
          color: rgba(184,135,44,.74) !important;
        }

        .qyasat-card i,
        .card-icon,
        .qyasat-process article::before {
          color: #0f766e !important;
          background: rgba(15,118,110,.085) !important;
          border-color: rgba(15,118,110,.16) !important;
        }

        .qyasat-card b,
        .roi,
        .qyasat-work article small {
          color: #6d501b !important;
          background: rgba(184,135,44,.085) !important;
          border-color: rgba(184,135,44,.15) !important;
        }

        .trust-row article,
        .qyasat-trust article,
        .qyasat-trust span {
          background: rgba(255,255,255,.64) !important;
          color: rgba(16,24,39,.72) !important;
          border-color: rgba(16,24,39,.08) !important;
        }
        /* QYASAT_MUTED_PROFESSIONAL_COLORS_20260704 */

        .qyasat-home {
          --qyasat-ink: #111827;
          --qyasat-muted: rgba(31, 41, 55, .68);
          --qyasat-border: rgba(17, 24, 39, .105);
          --qyasat-surface: rgba(255, 255, 255, .80);
          --qyasat-teal: #0f766e;
          --qyasat-teal-2: #115e59;
          --qyasat-gold: #a97723;
          --qyasat-warm: #f7f3ea;

          color: var(--qyasat-ink) !important;
          background:
            radial-gradient(circle at 18% 18%, rgba(15,118,110,.10), transparent 30rem),
            radial-gradient(circle at 82% 22%, rgba(169,119,35,.10), transparent 32rem),
            radial-gradient(circle at 45% 82%, rgba(17,94,89,.07), transparent 35rem),
            linear-gradient(135deg, #f7f3ea 0%, #f3f7f5 52%, #f7f0e4 100%) !important;
        }

        .qyasat-home::before {
          opacity: .22 !important;
          background-image:
            radial-gradient(circle, rgba(15,118,110,.22) 0 1px, transparent 1.5px),
            radial-gradient(circle, rgba(169,119,35,.16) 0 1px, transparent 1.5px) !important;
          background-size: 118px 118px, 176px 176px !important;
        }

        .qyasat-home::after {
          opacity: .22 !important;
          background:
            radial-gradient(circle at 16% 44%, rgba(15,118,110,.15), transparent 24rem),
            radial-gradient(circle at 84% 56%, rgba(169,119,35,.12), transparent 26rem) !important;
        }

        .qyasat-nav,
        .qyasat-trust,
        .qyasat-card,
        .qyasat-process article,
        .qyasat-work article,
        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact,
        .qyasat-code,
        .qyasat-code-window,
        .qyasat-mini-card,
        .qyasat-floating-card {
          background: var(--qyasat-surface) !important;
          border-color: var(--qyasat-border) !important;
          box-shadow:
            0 22px 70px rgba(17,24,39,.075),
            inset 0 1px 0 rgba(255,255,255,.88) !important;
        }

        .qyasat-nav::after {
          opacity: .38 !important;
          background: linear-gradient(90deg, transparent, rgba(15,118,110,.34), rgba(169,119,35,.26), transparent) !important;
        }

        .qyasat-nav::before,
        .qyasat-hero h1::before,
        .qyasat-copy h1::before,
        .qyasat-mini-card::before,
        .qyasat-floating-card::before,
        .qyasat-section-head p::before,
        .qyasat-ai p::before,
        .qyasat-card h3::before {
          color: rgba(15,118,110,.76) !important;
        }

        .qyasat-badge,
        .qyasat-pill {
          color: #6f4f16 !important;
          background: rgba(255,255,255,.76) !important;
          border-color: rgba(169,119,35,.20) !important;
          box-shadow:
            0 14px 32px rgba(17,24,39,.055),
            inset 0 1px 0 rgba(255,255,255,.90) !important;
        }

        .qyasat-badge::before,
        .qyasat-pill::before,
        .qyasat-card h3::after,
        .qyasat-code::before,
        .qyasat-code-window::before {
          color: rgba(169,119,35,.78) !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1,
        .qyasat-section-head h2,
        .qyasat-ai h2,
        .qyasat-contact h2,
        .qyasat-card h3,
        .qyasat-process h3,
        .qyasat-work h3,
        .qyasat-estimator h3 {
          color: var(--qyasat-ink) !important;
          text-shadow: none !important;
        }

        .qyasat-hero h1 span,
        .qyasat-copy h1 span {
          color: var(--qyasat-ink) !important;
          background: linear-gradient(135deg, #111827 0%, #0f766e 62%, #6f4f16 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p,
        .qyasat-section-head span,
        .qyasat-ai span,
        .qyasat-contact p,
        .qyasat-card p,
        .qyasat-process p,
        .qyasat-work p,
        .qyasat-estimator p,
        .qyasat-code span,
        .qyasat-code-window em,
        .qyasat-mini-card b,
        .qyasat-floating-card p {
          color: var(--qyasat-muted) !important;
        }

        .qyasat-primary,
        .qyasat-nav-cta,
        .qyasat-tools a,
        .qyasat-contact a,
        .qyasat-estimator aside a {
          color: #ffffff !important;
          background: linear-gradient(135deg, #111827 0%, #0f766e 100%) !important;
          box-shadow:
            0 16px 34px rgba(15,118,110,.18),
            0 10px 24px rgba(17,24,39,.10),
            inset 0 1px 0 rgba(255,255,255,.20) !important;
        }

        .qyasat-secondary {
          color: var(--qyasat-ink) !important;
          background: rgba(255,255,255,.78) !important;
          border-color: var(--qyasat-border) !important;
          box-shadow:
            0 14px 32px rgba(17,24,39,.055),
            inset 0 1px 0 rgba(255,255,255,.90) !important;
        }

        .qyasat-visual {
          background:
            linear-gradient(rgba(15,118,110,.065) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,118,110,.052) 1px, transparent 1px),
            radial-gradient(circle at 48% 38%, rgba(15,118,110,.10), transparent 16rem),
            radial-gradient(circle at 70% 58%, rgba(169,119,35,.08), transparent 18rem),
            rgba(255,255,255,.58) !important;
          background-size: 30px 30px, 30px 30px, auto, auto, auto !important;
          border-color: var(--qyasat-border) !important;
          box-shadow:
            0 30px 90px rgba(17,24,39,.09),
            inset 0 1px 0 rgba(255,255,255,.88) !important;
        }

        .qyasat-visual::before {
          opacity: .66 !important;
          background:
            radial-gradient(circle at 26% 32%, rgba(15,118,110,.25), transparent 24%),
            radial-gradient(circle at 66% 34%, rgba(17,94,89,.18), transparent 28%),
            radial-gradient(circle at 45% 64%, rgba(169,119,35,.15), transparent 22%),
            radial-gradient(circle at 50% 45%, rgba(255,255,255,.62), transparent 44%) !important;
          filter:
            drop-shadow(0 0 22px rgba(15,118,110,.13))
            drop-shadow(0 0 18px rgba(169,119,35,.08)) !important;
        }

        .qyasat-visual::after {
          border-color: rgba(15,118,110,.23) !important;
          border-bottom-color: rgba(169,119,35,.18) !important;
          box-shadow:
            0 0 22px rgba(15,118,110,.07),
            inset 0 0 20px rgba(255,255,255,.26) !important;
        }

        .qyasat-core {
          color: #ffffff !important;
          background: linear-gradient(135deg, #111827 0%, #0f766e 100%) !important;
          box-shadow:
            0 22px 48px rgba(15,118,110,.16),
            0 16px 34px rgba(17,24,39,.10),
            inset 0 1px 0 rgba(255,255,255,.22) !important;
        }

        .qyasat-ring,
        .ring-a,
        .ring-b {
          border-color: rgba(15,118,110,.20) !important;
          opacity: .56 !important;
          box-shadow: 0 0 20px rgba(15,118,110,.07) !important;
        }

        .ring-b {
          border-color: rgba(169,119,35,.18) !important;
        }

        .qyasat-card i,
        .card-icon,
        .qyasat-process article::before {
          color: #0f766e !important;
          background: rgba(15,118,110,.085) !important;
          border-color: rgba(15,118,110,.16) !important;
        }

        .qyasat-card b,
        .roi,
        .qyasat-work article small {
          color: #6f4f16 !important;
          background: rgba(169,119,35,.085) !important;
          border-color: rgba(169,119,35,.15) !important;
        }
        /* QYASAT_ARABIC_RESPONSIVE_FIX_20260704 */

        html,
        body {
          overflow-x: hidden !important;
        }

        .qyasat-home {
          overflow-x: hidden !important;
          text-rendering: geometricPrecision !important;
          -webkit-font-smoothing: antialiased !important;
        }

        .qyasat-home,
        .qyasat-hero,
        .qyasat-section,
        .qyasat-ai,
        .qyasat-estimator,
        .qyasat-work,
        .qyasat-contact {
          direction: rtl !important;
          text-align: right !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1,
        .qyasat-section-head h2,
        .qyasat-ai h2,
        .qyasat-contact h2,
        .qyasat-estimator h3,
        .qyasat-card h3,
        .qyasat-process h3,
        .qyasat-work h3 {
          font-family: inherit !important;
          letter-spacing: -0.012em !important;
          word-spacing: 0 !important;
          text-wrap: balance !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p,
        .qyasat-section-head span,
        .qyasat-ai span,
        .qyasat-contact p,
        .qyasat-estimator p,
        .qyasat-card p,
        .qyasat-process p,
        .qyasat-work p {
          font-family: inherit !important;
          letter-spacing: 0 !important;
          word-spacing: 0 !important;
        }

        .qyasat-nav nav a,
        .qyasat-badge,
        .qyasat-pill,
        .qyasat-primary,
        .qyasat-secondary,
        .qyasat-nav-cta,
        .qyasat-tools a {
          letter-spacing: 0 !important;
        }

        .qyasat-code,
        .qyasat-code-window,
        .qyasat-mini-card,
        .qyasat-floating-card,
        .qyasat-code strong,
        .qyasat-code span,
        .qyasat-code-window b,
        .qyasat-code-window em,
        .qyasat-mini-card strong,
        .qyasat-mini-card b,
        .qyasat-floating-card strong,
        .qyasat-floating-card p,
        .qyasat-hero h1::before,
        .qyasat-copy h1::before,
        .qyasat-nav::before,
        .qyasat-mini-card::before,
        .qyasat-floating-card::before {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          letter-spacing: 0 !important;
        }

        .qyasat-nav {
          width: min(calc(100% - 40px), 1180px) !important;
          min-height: 64px !important;
          padding: 0 18px !important;
          margin-top: 18px !important;
          border-radius: 22px !important;
        }

        .qyasat-brand {
          min-width: 168px !important;
        }

        .qyasat-brand strong {
          width: 168px !important;
          height: 40px !important;
        }

        .qyasat-nav nav {
          gap: clamp(16px, 2vw, 28px) !important;
        }

        .qyasat-nav nav a {
          font-family: inherit !important;
          font-size: .82rem !important;
          font-weight: 800 !important;
        }

        .qyasat-nav-cta {
          min-height: 42px !important;
          padding-inline: 18px !important;
          font-family: inherit !important;
          font-size: .84rem !important;
        }

        .qyasat-hero {
          width: min(calc(100% - 56px), 1180px) !important;
          grid-template-columns: minmax(0, .98fr) minmax(420px, .92fr) !important;
          gap: clamp(34px, 4vw, 58px) !important;
          align-items: center !important;
          padding-top: clamp(52px, 6vw, 76px) !important;
          padding-bottom: clamp(54px, 6vw, 78px) !important;
        }

        .qyasat-hero-copy,
        .qyasat-copy {
          max-width: 560px !important;
          justify-self: start !important;
        }

        .qyasat-badge,
        .qyasat-pill {
          font-family: inherit !important;
          font-size: .9rem !important;
          font-weight: 850 !important;
          padding: 11px 18px !important;
          border-radius: 999px !important;
          width: fit-content !important;
        }

        .qyasat-hero h1,
        .qyasat-copy h1 {
          max-width: 560px !important;
          margin: 14px 0 18px !important;
          font-size: clamp(2.75rem, 4.15vw, 4.28rem) !important;
          line-height: 1.19 !important;
          font-weight: 950 !important;
        }

        .qyasat-hero h1::before,
        .qyasat-copy h1::before {
          margin-bottom: 10px !important;
          font-size: .78rem !important;
          line-height: 1.4 !important;
        }

        .qyasat-subtitle,
        .qyasat-hero p,
        .qyasat-copy p {
          max-width: 540px !important;
          font-size: clamp(.98rem, 1.08vw, 1.08rem) !important;
          line-height: 1.9 !important;
          font-weight: 750 !important;
        }

        .qyasat-actions {
          margin-top: 26px !important;
          gap: 12px !important;
          justify-content: flex-start !important;
        }

        .qyasat-primary,
        .qyasat-secondary {
          min-height: 44px !important;
          padding-inline: 19px !important;
          border-radius: 14px !important;
          font-family: inherit !important;
          font-size: .88rem !important;
          font-weight: 900 !important;
        }

        .qyasat-visual {
          justify-self: end !important;
          width: min(100%, 540px) !important;
          height: clamp(390px, 34vw, 455px) !important;
          border-radius: 28px !important;
          overflow: hidden !important;
        }

        .qyasat-visual::before {
          width: 340px !important;
          height: 245px !important;
          top: 12% !important;
        }

        .qyasat-visual::after {
          left: -12% !important;
          right: -14% !important;
          top: 42% !important;
          height: 152px !important;
        }

        .qyasat-core {
          width: 78px !important;
          height: 78px !important;
          border-radius: 22px !important;
          font-size: 1.35rem !important;
        }

        .qyasat-code,
        .qyasat-code-window {
          top: 28px !important;
          inset-inline-start: 28px !important;
          width: 255px !important;
          padding: 16px !important;
          border-radius: 18px !important;
          text-align: left !important;
          direction: ltr !important;
        }

        .qyasat-code strong,
        .qyasat-code-window b {
          font-size: .9rem !important;
        }

        .qyasat-code span,
        .qyasat-code-window em {
          font-size: .78rem !important;
          line-height: 1.6 !important;
        }

        .qyasat-mini-card,
        .qyasat-floating-card {
          bottom: 28px !important;
          inset-inline-end: 28px !important;
          width: 270px !important;
          padding: 16px !important;
          border-radius: 18px !important;
          text-align: right !important;
          direction: rtl !important;
        }

        .qyasat-mini-card::before,
        .qyasat-floating-card::before {
          direction: ltr !important;
          text-align: left !important;
          font-size: .7rem !important;
        }

        .qyasat-trust {
          width: min(calc(100% - 56px), 1180px) !important;
          margin-top: 4px !important;
          margin-bottom: clamp(64px, 7vw, 96px) !important;
          padding: 18px 22px !important;
          border-radius: 24px !important;
        }

        .qyasat-trust > p {
          margin-bottom: 14px !important;
          font-size: .96rem !important;
          font-weight: 900 !important;
        }

        .trust-row,
        .qyasat-trust-row {
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 12px !important;
        }

        .trust-row article,
        .qyasat-trust article,
        .qyasat-trust span {
          min-height: 56px !important;
          gap: 8px !important;
          padding: 10px 12px !important;
          border-radius: 16px !important;
        }

        .qyasat-section,
        .qyasat-ai,
        .qyasat-estimator,
        .qyasat-work,
        .qyasat-contact {
          width: min(calc(100% - 56px), 1180px) !important;
          margin-bottom: clamp(68px, 7vw, 104px) !important;
        }

        .qyasat-section-head {
          grid-template-columns: minmax(0, .88fr) minmax(300px, .56fr) !important;
          gap: clamp(22px, 3vw, 44px) !important;
          align-items: end !important;
          margin-bottom: 28px !important;
        }

        .qyasat-section-head p,
        .qyasat-ai > p {
          font-family: inherit !important;
          font-size: .86rem !important;
          font-weight: 900 !important;
          margin-bottom: 10px !important;
        }

        .qyasat-section-head h2,
        .qyasat-ai h2,
        .qyasat-contact h2 {
          font-size: clamp(2rem, 3.1vw, 3.15rem) !important;
          line-height: 1.24 !important;
          font-weight: 950 !important;
        }

        .qyasat-section-head span {
          font-size: .98rem !important;
          line-height: 1.9 !important;
          font-weight: 700 !important;
        }

        .qyasat-grid,
        .qyasat-cards,
        .services-grid,
        .qyasat-work-grid,
        .work-grid {
          gap: 18px !important;
        }

        .qyasat-card,
        .qyasat-process article,
        .qyasat-work article {
          min-height: auto !important;
          padding: 22px !important;
          border-radius: 22px !important;
        }

        .qyasat-card h3,
        .qyasat-process h3,
        .qyasat-work h3 {
          font-size: 1.05rem !important;
          line-height: 1.55 !important;
        }

        .qyasat-card p,
        .qyasat-process p,
        .qyasat-work p {
          font-size: .93rem !important;
          line-height: 1.85 !important;
        }

        .qyasat-ai,
        .qyasat-estimator-box,
        .qyasat-contact {
          border-radius: 28px !important;
          padding: clamp(26px, 3.5vw, 40px) !important;
        }

        @media (min-width: 1100px) and (max-height: 860px) {
          .qyasat-hero {
            padding-top: 42px !important;
            padding-bottom: 54px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(2.55rem, 3.75vw, 3.8rem) !important;
            line-height: 1.18 !important;
          }

          .qyasat-visual {
            height: 385px !important;
          }

          .qyasat-trust {
            margin-bottom: 72px !important;
          }
        }

        @media (max-width: 1050px) {
          .qyasat-nav,
          .qyasat-hero,
          .qyasat-trust,
          .qyasat-section,
          .qyasat-ai,
          .qyasat-estimator,
          .qyasat-work,
          .qyasat-contact {
            width: min(calc(100% - 34px), 100%) !important;
          }

          .qyasat-hero {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
            padding-top: 44px !important;
          }

          .qyasat-hero-copy,
          .qyasat-copy {
            max-width: 720px !important;
            justify-self: stretch !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            max-width: 720px !important;
            font-size: clamp(2.45rem, 6.6vw, 4rem) !important;
          }

          .qyasat-subtitle,
          .qyasat-hero p,
          .qyasat-copy p {
            max-width: 680px !important;
          }

          .qyasat-visual {
            justify-self: center !important;
            width: min(100%, 620px) !important;
          }

          .qyasat-section-head {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }

          .qyasat-section-head span {
            max-width: 720px !important;
            justify-self: start !important;
          }

          .qyasat-grid,
          .qyasat-cards,
          .services-grid,
          .qyasat-work-grid,
          .work-grid,
          .qyasat-process,
          .qyasat-ai-grid,
          .ai-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 760px) {
          .qyasat-home {
            padding-inline: 12px !important;
          }

          .qyasat-nav {
            width: 100% !important;
            min-height: 58px !important;
            margin-top: 10px !important;
            padding: 0 12px !important;
            border-radius: 18px !important;
            display: flex !important;
            justify-content: space-between !important;
          }

          .qyasat-nav::before {
            display: none !important;
          }

          .qyasat-brand {
            min-width: 126px !important;
          }

          .qyasat-brand strong {
            width: 126px !important;
            height: 34px !important;
          }

          .qyasat-nav nav {
            display: none !important;
          }

          .qyasat-nav-cta {
            min-height: 38px !important;
            padding-inline: 13px !important;
            border-radius: 13px !important;
            font-size: .78rem !important;
            white-space: nowrap !important;
          }

          .qyasat-hero {
            width: 100% !important;
            grid-template-columns: 1fr !important;
            gap: 26px !important;
            padding-top: 34px !important;
            padding-bottom: 42px !important;
          }

          .qyasat-badge,
          .qyasat-pill {
            max-width: 100% !important;
            font-size: .78rem !important;
            line-height: 1.7 !important;
            padding: 9px 13px !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            max-width: 100% !important;
            margin: 12px 0 14px !important;
            font-size: clamp(2rem, 11.2vw, 2.95rem) !important;
            line-height: 1.25 !important;
            letter-spacing: -0.006em !important;
          }

          .qyasat-hero h1::before,
          .qyasat-copy h1::before {
            font-size: .64rem !important;
            line-height: 1.55 !important;
            margin-bottom: 8px !important;
            white-space: normal !important;
          }

          .qyasat-subtitle,
          .qyasat-hero p,
          .qyasat-copy p {
            max-width: 100% !important;
            font-size: .92rem !important;
            line-height: 1.85 !important;
            font-weight: 720 !important;
          }

          .qyasat-actions {
            display: grid !important;
            grid-template-columns: 1fr !important;
            width: 100% !important;
            margin-top: 22px !important;
            gap: 10px !important;
          }

          .qyasat-primary,
          .qyasat-secondary {
            width: 100% !important;
            min-height: 44px !important;
            justify-content: center !important;
            font-size: .86rem !important;
          }

          .qyasat-visual {
            width: 100% !important;
            height: 310px !important;
            border-radius: 22px !important;
            overflow: hidden !important;
          }

          .qyasat-visual::before {
            width: 245px !important;
            height: 175px !important;
            top: 12% !important;
          }

          .qyasat-visual::after {
            left: -24% !important;
            right: -24% !important;
            top: 44% !important;
            height: 116px !important;
          }

          .qyasat-core {
            width: 60px !important;
            height: 60px !important;
            border-radius: 17px !important;
            font-size: 1.05rem !important;
          }

          .qyasat-code,
          .qyasat-code-window {
            top: 14px !important;
            inset-inline-start: 14px !important;
            width: min(230px, calc(100% - 28px)) !important;
            padding: 11px 12px !important;
            border-radius: 15px !important;
          }

          .qyasat-code::before,
          .qyasat-code-window::before {
            margin-bottom: 7px !important;
            font-size: .58rem !important;
          }

          .qyasat-code strong,
          .qyasat-code-window b {
            font-size: .72rem !important;
          }

          .qyasat-code span,
          .qyasat-code-window em {
            font-size: .65rem !important;
            line-height: 1.55 !important;
          }

          .qyasat-mini-card,
          .qyasat-floating-card {
            bottom: 14px !important;
            inset-inline-end: 14px !important;
            width: min(245px, calc(100% - 28px)) !important;
            padding: 11px 12px !important;
            border-radius: 15px !important;
          }

          .qyasat-mini-card::before,
          .qyasat-floating-card::before {
            margin-bottom: 7px !important;
            font-size: .58rem !important;
          }

          .qyasat-mini-card strong,
          .qyasat-floating-card strong {
            font-size: .72rem !important;
          }

          .qyasat-mini-card b,
          .qyasat-floating-card p {
            font-size: .66rem !important;
            line-height: 1.55 !important;
          }

          .qyasat-trust {
            width: 100% !important;
            margin-bottom: 52px !important;
            padding: 14px !important;
            border-radius: 20px !important;
          }

          .qyasat-trust > p {
            font-size: .88rem !important;
            line-height: 1.7 !important;
          }

          .trust-row,
          .qyasat-trust-row {
            grid-template-columns: 1fr !important;
            gap: 9px !important;
          }

          .trust-row article,
          .qyasat-trust article,
          .qyasat-trust span {
            min-height: 46px !important;
            justify-content: space-between !important;
            padding: 10px 12px !important;
          }

          .qyasat-section,
          .qyasat-ai,
          .qyasat-estimator,
          .qyasat-work,
          .qyasat-contact {
            width: 100% !important;
            margin-bottom: 52px !important;
          }

          .qyasat-section-head {
            gap: 10px !important;
            margin-bottom: 20px !important;
          }

          .qyasat-section-head h2,
          .qyasat-ai h2,
          .qyasat-contact h2,
          .qyasat-estimator h3 {
            font-size: clamp(1.65rem, 8vw, 2.2rem) !important;
            line-height: 1.3 !important;
            letter-spacing: -0.006em !important;
          }

          .qyasat-section-head span,
          .qyasat-ai span,
          .qyasat-contact p,
          .qyasat-estimator p {
            font-size: .92rem !important;
            line-height: 1.85 !important;
          }

          .qyasat-grid,
          .qyasat-cards,
          .services-grid,
          .qyasat-work-grid,
          .work-grid,
          .qyasat-process,
          .qyasat-ai-grid,
          .ai-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .qyasat-card,
          .qyasat-process article,
          .qyasat-work article {
            padding: 18px !important;
            border-radius: 18px !important;
          }

          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            padding: 20px !important;
            border-radius: 22px !important;
          }
        }

        @media (max-width: 390px) {
          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(1.82rem, 10.8vw, 2.45rem) !important;
          }

          .qyasat-visual {
            height: 285px !important;
          }

          .qyasat-brand strong {
            width: 112px !important;
          }

          .qyasat-nav-cta {
            font-size: .72rem !important;
            padding-inline: 10px !important;
          }
        }
        /* QYASAT_FONT_FAMILY_FINAL_LOCK_20260704 */

        .qyasat-home {
          --qyasat-final-font: var(--font-arabic), "Cairo", "Noto Sans Arabic", "Tajawal", "Dubai", "Segoe UI", Arial, sans-serif;
          font-family: var(--qyasat-final-font) !important;
        }

        .qyasat-home,
        .qyasat-home body,
        .qyasat-home h1,
        .qyasat-home h2,
        .qyasat-home h3,
        .qyasat-home h4,
        .qyasat-home h5,
        .qyasat-home h6,
        .qyasat-home p,
        .qyasat-home a,
        .qyasat-home span,
        .qyasat-home small,
        .qyasat-home strong,
        .qyasat-home b,
        .qyasat-home em,
        .qyasat-home i,
        .qyasat-home article,
        .qyasat-home section,
        .qyasat-home div,
        .qyasat-home button,
        .qyasat-home input,
        .qyasat-home textarea,
        .qyasat-home select,
        .qyasat-nav,
        .qyasat-nav nav,
        .qyasat-nav nav a,
        .qyasat-nav-cta,
        .qyasat-brand,
        .qyasat-brand strong,
        .qyasat-badge,
        .qyasat-pill,
        .qyasat-primary,
        .qyasat-secondary,
        .qyasat-subtitle,
        .qyasat-section-head,
        .qyasat-section-head p,
        .qyasat-section-head h2,
        .qyasat-section-head span,
        .qyasat-card,
        .qyasat-card h3,
        .qyasat-card p,
        .qyasat-process,
        .qyasat-process h3,
        .qyasat-process p,
        .qyasat-work,
        .qyasat-work h3,
        .qyasat-work p,
        .qyasat-ai,
        .qyasat-ai h2,
        .qyasat-ai h3,
        .qyasat-ai p,
        .qyasat-ai span,
        .qyasat-contact,
        .qyasat-contact h2,
        .qyasat-contact p,
        .qyasat-tools a,
        .qyasat-estimator,
        .qyasat-estimator h3,
        .qyasat-estimator p,
        .qyasat-estimator a,
        .qyasat-trust,
        .qyasat-trust p,
        .qyasat-trust strong,
        .qyasat-trust span {
          font-family: var(--qyasat-final-font) !important;
        }

        .qyasat-home h1,
        .qyasat-home h2,
        .qyasat-home h3,
        .qyasat-home p,
        .qyasat-home a,
        .qyasat-home span,
        .qyasat-home strong,
        .qyasat-home b,
        .qyasat-home small {
          letter-spacing: 0 !important;
          word-spacing: 0 !important;
        }

        .qyasat-code,
        .qyasat-code-window,
        .qyasat-code *,
        .qyasat-code-window *,
        .qyasat-mini-card::before,
        .qyasat-floating-card::before,
        .qyasat-hero h1::before,
        .qyasat-copy h1::before,
        .qyasat-badge::before,
        .qyasat-pill::before,
        .qyasat-section-head p::before,
        .qyasat-ai p::before,
        .qyasat-card h3::before,
        .qyasat-card h3::after {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        @media (max-width: 760px) {
          .qyasat-home,
          .qyasat-home h1,
          .qyasat-home h2,
          .qyasat-home h3,
          .qyasat-home p,
          .qyasat-home a,
          .qyasat-home span,
          .qyasat-home small,
          .qyasat-home strong,
          .qyasat-home b,
          .qyasat-nav,
          .qyasat-nav-cta,
          .qyasat-badge,
          .qyasat-pill,
          .qyasat-primary,
          .qyasat-secondary,
          .qyasat-section-head,
          .qyasat-card,
          .qyasat-process,
          .qyasat-work,
          .qyasat-ai,
          .qyasat-contact,
          .qyasat-estimator,
          .qyasat-trust {
            font-family: var(--qyasat-final-font) !important;
          }
        }
        /* QYASAT_MOBILE_ORBIT_BLOCKS_20260704 */

        @media (max-width: 760px) {
          html,
          body {
            overflow-x: hidden !important;
          }

          .qyasat-home {
            padding-inline: 12px !important;
            overflow-x: hidden !important;
          }

          .qyasat-nav {
            top: 10px !important;
            min-height: 58px !important;
            margin-top: 10px !important;
            padding: 0 12px !important;
            border-radius: 18px !important;
            grid-template-columns: 1fr auto !important;
          }

          .qyasat-nav nav {
            display: none !important;
          }

          .qyasat-brand {
            min-width: 0 !important;
          }

          .qyasat-brand strong {
            width: 124px !important;
            height: 34px !important;
          }

          .qyasat-nav-cta {
            min-height: 38px !important;
            padding-inline: 12px !important;
            border-radius: 12px !important;
            font-size: .76rem !important;
          }

          .qyasat-hero {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding-top: 34px !important;
            padding-bottom: 44px !important;
            min-height: auto !important;
          }

          .qyasat-hero-copy,
          .qyasat-copy {
            width: 100% !important;
            max-width: 100% !important;
          }

          .qyasat-badge,
          .qyasat-pill {
            max-width: 100% !important;
            padding: 8px 12px !important;
            font-size: .76rem !important;
            line-height: 1.6 !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            max-width: 100% !important;
            margin: 12px 0 14px !important;
            font-size: clamp(2.05rem, 10.2vw, 2.9rem) !important;
            line-height: 1.27 !important;
            letter-spacing: 0 !important;
            text-wrap: balance !important;
          }

          .qyasat-hero h1::before,
          .qyasat-copy h1::before {
            font-size: .66rem !important;
            line-height: 1.45 !important;
            margin-bottom: 8px !important;
            opacity: .82 !important;
          }

          .qyasat-subtitle,
          .qyasat-hero p,
          .qyasat-copy p {
            max-width: 100% !important;
            font-size: .91rem !important;
            line-height: 1.84 !important;
          }

          .qyasat-actions {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
            margin-top: 22px !important;
          }

          .qyasat-primary,
          .qyasat-secondary {
            width: 100% !important;
            min-height: 43px !important;
            border-radius: 13px !important;
            font-size: .82rem !important;
            padding-inline: 10px !important;
            display: inline-flex !important;
          }

          /*
            الجوال: نحافظ على الأوربيت والجانب البصري،
            لكن نعيد ترتيبه حتى لا يضغط على النص.
          */
          .qyasat-visual {
            display: block !important;
            width: 100% !important;
            height: 340px !important;
            border-radius: 22px !important;
            overflow: hidden !important;
            margin-top: 2px !important;
            background-size: 34px 34px, 34px 34px, auto, auto, auto !important;
            box-shadow:
              0 22px 62px rgba(17, 24, 39, .09),
              inset 0 1px 0 rgba(255,255,255,.86) !important;
          }

          .qyasat-visual::before {
            display: block !important;
            width: 275px !important;
            height: 195px !important;
            top: 11% !important;
            opacity: .76 !important;
          }

          .qyasat-visual::after {
            display: block !important;
            left: -26% !important;
            right: -26% !important;
            top: 43% !important;
            height: 128px !important;
            opacity: .72 !important;
          }

          .qyasat-ring,
          .ring-a,
          .ring-b {
            display: block !important;
            opacity: .46 !important;
          }

          .ring-a {
            width: 238px !important;
            height: 238px !important;
            top: 56px !important;
          }

          .ring-b {
            width: 184px !important;
            height: 184px !important;
            top: 82px !important;
          }

          .qyasat-core {
            display: grid !important;
            width: 66px !important;
            height: 66px !important;
            top: 43% !important;
            border-radius: 18px !important;
            font-size: 1.08rem !important;
          }

          .qyasat-code,
          .qyasat-code-window {
            display: block !important;
            top: 14px !important;
            inset-inline-start: 14px !important;
            width: min(240px, calc(100% - 28px)) !important;
            padding: 11px 12px !important;
            border-radius: 15px !important;
          }

          .qyasat-code::before,
          .qyasat-code-window::before {
            margin-bottom: 7px !important;
            font-size: .56rem !important;
            opacity: .78 !important;
          }

          .qyasat-code strong,
          .qyasat-code-window b {
            font-size: .7rem !important;
            line-height: 1.45 !important;
          }

          .qyasat-code span,
          .qyasat-code-window em {
            display: block !important;
            font-size: .62rem !important;
            line-height: 1.55 !important;
            margin-top: 5px !important;
          }

          .qyasat-mini-card,
          .qyasat-floating-card {
            display: block !important;
            bottom: 14px !important;
            inset-inline-end: 14px !important;
            width: min(235px, calc(100% - 28px)) !important;
            padding: 11px 12px !important;
            border-radius: 15px !important;
          }

          .qyasat-mini-card::before,
          .qyasat-floating-card::before {
            margin-bottom: 7px !important;
            font-size: .56rem !important;
          }

          .qyasat-mini-card strong,
          .qyasat-floating-card strong {
            font-size: .7rem !important;
            line-height: 1.45 !important;
          }

          .qyasat-mini-card b,
          .qyasat-floating-card p {
            display: block !important;
            font-size: .62rem !important;
            line-height: 1.55 !important;
            margin-top: 5px !important;
          }

          /*
            تنظيم البلوكات والكروت فقط.
          */
          .qyasat-trust {
            margin-top: 0 !important;
            margin-bottom: 52px !important;
            padding: 13px !important;
            border-radius: 20px !important;
          }

          .qyasat-trust > p {
            margin-bottom: 11px !important;
            font-size: .86rem !important;
            line-height: 1.65 !important;
          }

          .trust-row,
          .qyasat-trust-row {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 9px !important;
          }

          .trust-row article,
          .qyasat-trust article {
            min-height: 58px !important;
            padding: 10px 8px !important;
            border-radius: 14px !important;
            text-align: center !important;
          }

          .trust-row strong,
          .qyasat-trust strong {
            font-size: .78rem !important;
            line-height: 1.35 !important;
          }

          .trust-row span,
          .qyasat-trust article span {
            font-size: .69rem !important;
            line-height: 1.45 !important;
          }

          .qyasat-section,
          .qyasat-ai,
          .qyasat-estimator,
          .qyasat-work,
          .qyasat-contact {
            margin-bottom: 54px !important;
          }

          .qyasat-section-head {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            margin-bottom: 20px !important;
          }

          .qyasat-section-head p,
          .qyasat-ai > p {
            margin-bottom: 8px !important;
            font-size: .78rem !important;
            line-height: 1.55 !important;
          }

          .qyasat-section-head h2,
          .qyasat-ai h2,
          .qyasat-contact h2,
          .qyasat-estimator h3 {
            max-width: 100% !important;
            font-size: clamp(1.62rem, 7.4vw, 2.18rem) !important;
            line-height: 1.34 !important;
            letter-spacing: 0 !important;
            text-wrap: balance !important;
          }

          .qyasat-section-head span,
          .qyasat-ai > span,
          .qyasat-contact p,
          .qyasat-estimator p {
            display: block !important;
            max-width: 100% !important;
            font-size: .89rem !important;
            line-height: 1.8 !important;
          }

          .qyasat-grid,
          .qyasat-cards,
          .services-grid,
          .qyasat-work-grid,
          .work-grid,
          .qyasat-process,
          .qyasat-ai-grid,
          .ai-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .qyasat-card,
          .qyasat-process article,
          .qyasat-work article {
            min-height: auto !important;
            padding: 17px !important;
            border-radius: 18px !important;
          }

          .qyasat-card i,
          .card-icon {
            width: 38px !important;
            height: 38px !important;
            margin-bottom: 12px !important;
            border-radius: 12px !important;
            font-size: .74rem !important;
          }

          .qyasat-card h3,
          .qyasat-process h3,
          .qyasat-work h3 {
            margin-bottom: 8px !important;
            font-size: 1rem !important;
            line-height: 1.55 !important;
          }

          .qyasat-card h3::before,
          .qyasat-card h3::after {
            display: none !important;
          }

          .qyasat-card p,
          .qyasat-process p,
          .qyasat-work p,
          .qyasat-ai-grid p,
          .ai-grid p {
            font-size: .86rem !important;
            line-height: 1.74 !important;
          }

          .qyasat-card b,
          .qyasat-work article small {
            display: inline-flex !important;
            margin-top: 12px !important;
            font-size: .68rem !important;
            padding: 6px 9px !important;
          }

          .qyasat-ai,
          .qyasat-estimator-box,
          .qyasat-contact {
            padding: 19px !important;
            border-radius: 21px !important;
          }

          .qyasat-ai-grid article,
          .ai-grid article {
            min-height: auto !important;
            padding: 14px !important;
            border-radius: 16px !important;
          }

          .qyasat-process article {
            padding-top: 17px !important;
          }

          .qyasat-process article::before {
            position: static !important;
            width: 34px !important;
            height: 34px !important;
            margin-bottom: 12px !important;
            border-radius: 11px !important;
            font-size: .68rem !important;
          }

          .qyasat-process h3 {
            max-width: 100% !important;
          }

          .qyasat-estimator-box,
          .qyasat-contact {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          .qyasat-tools {
            display: grid !important;
            grid-template-columns: 1fr !important;
            width: 100% !important;
            gap: 9px !important;
          }

          .qyasat-tools a,
          .qyasat-contact a,
          .qyasat-estimator aside a {
            width: 100% !important;
            min-height: 43px !important;
            border-radius: 13px !important;
            font-size: .84rem !important;
          }
        }

        @media (max-width: 390px) {
          .qyasat-brand strong {
            width: 112px !important;
          }

          .qyasat-nav-cta {
            padding-inline: 10px !important;
            font-size: .7rem !important;
          }

          .qyasat-hero h1,
          .qyasat-copy h1 {
            font-size: clamp(1.86rem, 9.7vw, 2.42rem) !important;
          }

          .qyasat-actions {
            grid-template-columns: 1fr !important;
          }

          .qyasat-visual {
            height: 318px !important;
          }

          .qyasat-code,
          .qyasat-code-window,
          .qyasat-mini-card,
          .qyasat-floating-card {
            width: min(220px, calc(100% - 28px)) !important;
          }
        }






      
        /* QYASAT_CORRECT_VISIBLE_SECTIONS_20260705_START */

        html body .qyasat-home {
          --qyasat-correct-visible-sections-20260705: 1;
        }

        html body .qyasat-home section#ai.qyasat-ai {
          display: grid !important;
          grid-template-columns: minmax(0, .95fr) minmax(420px, 1.05fr) !important;
          grid-template-areas:
            "cards eyebrow"
            "cards title"
            "cards desc" !important;
          align-items: center !important;
          gap: 18px 70px !important;
          padding: 64px 64px !important;
          border-radius: 34px !important;
          border: 1px solid rgba(15, 23, 42, .09) !important;
          background:
            radial-gradient(circle at 12% 20%, rgba(14, 124, 116, .16), transparent 34%),
            radial-gradient(circle at 86% 12%, rgba(174, 117, 29, .10), transparent 30%),
            linear-gradient(145deg, rgba(255,255,255,.99), rgba(250,250,247,.94)) !important;
          box-shadow:
            0 34px 100px rgba(15, 23, 42, .09),
            inset 0 1px 0 rgba(255,255,255,.95) !important;
        }

        html body .qyasat-home section#ai.qyasat-ai > p {
          grid-area: eyebrow !important;
          margin: 0 !important;
          justify-self: start !important;
          color: #9b6612 !important;
          font-size: .88rem !important;
          font-weight: 950 !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 9px !important;
        }

        html body .qyasat-home section#ai.qyasat-ai > p::before {
          content: "" !important;
          color: #087d76 !important;
          font-weight: 950 !important;
        }

        html body .qyasat-home section#ai.qyasat-ai > h2 {
          grid-area: title !important;
          margin: 0 !important;
          max-width: 660px !important;
          color: #111827 !important;
          font-size: clamp(3.2rem, 5.4vw, 5.7rem) !important;
          line-height: .95 !important;
          letter-spacing: -.07em !important;
          text-wrap: balance !important;
        }

        html body .qyasat-home section#ai.qyasat-ai > span {
          grid-area: desc !important;
          display: block !important;
          max-width: 780px !important;
          margin: 12px 0 0 !important;
          color: rgba(17, 24, 39, .60) !important;
          font-size: 1.03rem !important;
          line-height: 2.05 !important;
          font-weight: 760 !important;
        }

        html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid {
          grid-area: cards !important;
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 16px !important;
          width: 100% !important;
          margin: 0 !important;
        }

        html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid article {
          min-height: 190px !important;
          padding: 24px 22px !important;
          border-radius: 26px !important;
          border: 1px solid rgba(15, 23, 42, .08) !important;
          background:
            linear-gradient(145deg, rgba(255,255,255,.99), rgba(252,251,248,.94)),
            radial-gradient(circle at 12% 4%, rgba(8, 125, 118, .12), transparent 40%) !important;
          box-shadow:
            0 24px 65px rgba(15, 23, 42, .075),
            inset 0 1px 0 rgba(255,255,255,.92) !important;
        }

        html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid article::before {
          content: "AI" !important;
          width: 44px !important;
          height: 44px !important;
          margin-bottom: 18px !important;
          border-radius: 16px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #087d76 !important;
          background: rgba(8, 125, 118, .08) !important;
          border: 1px solid rgba(8, 125, 118, .20) !important;
          font-weight: 950 !important;
          font-size: .75rem !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid h3 {
          margin: 0 0 10px !important;
          color: #151f31 !important;
          font-size: 1.08rem !important;
          line-height: 1.55 !important;
          font-weight: 950 !important;
        }

        html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid p {
          margin: 0 !important;
          color: #99620e !important;
          font-size: .94rem !important;
          line-height: 1.85 !important;
          font-weight: 850 !important;
        }

        html body .qyasat-home section#process .qyasat-process {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 18px !important;
        }

        html body .qyasat-home section#process .qyasat-process article {
          position: relative !important;
          min-height: 176px !important;
          padding: 26px 22px 24px !important;
          border-radius: 26px !important;
          overflow: hidden !important;
          border: 1px solid rgba(15, 23, 42, .08) !important;
          background:
            radial-gradient(circle at 88% 12%, rgba(8, 125, 118, .10), transparent 30%),
            linear-gradient(145deg, rgba(255,255,255,.99), rgba(252,251,248,.94)) !important;
          box-shadow:
            0 24px 70px rgba(15, 23, 42, .075),
            inset 0 1px 0 rgba(255,255,255,.92) !important;
        }

        html body .qyasat-home section#process .qyasat-process article::before {
          content: "" !important;
          position: absolute !important;
          inset-inline-end: 20px !important;
          top: 20px !important;
          width: 44px !important;
          height: 44px !important;
          border-radius: 16px !important;
          border: 1px solid rgba(8, 125, 118, .20) !important;
          background: rgba(8, 125, 118, .08) !important;
        }

        html body .qyasat-home section#process .qyasat-process article::after {
          content: "" !important;
          position: absolute !important;
          inset-inline-start: 22px !important;
          bottom: 0 !important;
          width: 76px !important;
          height: 4px !important;
          border-radius: 999px 999px 0 0 !important;
          background: linear-gradient(90deg, #087d76, rgba(174,117,29,.55)) !important;
        }

        html body .qyasat-home section#process .qyasat-process h3 {
          max-width: calc(100% - 58px) !important;
          margin: 0 0 12px !important;
          color: #151f31 !important;
          font-size: 1.12rem !important;
          line-height: 1.55 !important;
          font-weight: 950 !important;
        }

        html body .qyasat-home section#process .qyasat-process p {
          margin: 0 !important;
          color: rgba(17, 24, 39, .60) !important;
          font-size: .95rem !important;
          line-height: 1.9 !important;
          font-weight: 760 !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 22px !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid article {
          min-height: 330px !important;
          padding: 0 !important;
          overflow: hidden !important;
          border-radius: 30px !important;
          border: 1px solid rgba(15, 23, 42, .085) !important;
          background: rgba(255,255,255,.99) !important;
          box-shadow:
            0 30px 86px rgba(15, 23, 42, .09),
            inset 0 1px 0 rgba(255,255,255,.94) !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid article small {
          height: 40px !important;
          padding: 0 18px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          color: #8a5a12 !important;
          background: rgba(174, 117, 29, .08) !important;
          font-size: .76rem !important;
          font-weight: 900 !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid article small::before {
          content: "● ● ●" !important;
          color: rgba(8, 125, 118, .70) !important;
          letter-spacing: .22em !important;
          font-size: .62rem !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid article > div {
          min-height: 248px !important;
          margin: 20px !important;
          padding: 30px 26px !important;
          border-radius: 26px !important;
          background:
            radial-gradient(circle at 18% 18%, rgba(8, 125, 118, .23), transparent 34%),
            radial-gradient(circle at 92% 84%, rgba(174, 117, 29, .13), transparent 34%),
            linear-gradient(135deg, rgba(210,251,252,.94), rgba(239,236,255,.93)) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.82) !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid h3 {
          margin: 0 0 14px !important;
          color: #111827 !important;
          font-size: 1.28rem !important;
          line-height: 1.45 !important;
          font-weight: 950 !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid p {
          max-width: 92% !important;
          margin: 0 !important;
          color: rgba(17, 24, 39, .63) !important;
          font-size: .97rem !important;
          line-height: 1.92 !important;
          font-weight: 760 !important;
        }

        html body .qyasat-home section.qyasat-estimator,
        html body .qyasat-home section#contact.qyasat-contact {
          padding: 46px 58px !important;
          border-radius: 34px !important;
          border: 1px solid rgba(15, 23, 42, .085) !important;
          background:
            radial-gradient(circle at 14% 50%, rgba(8, 125, 118, .12), transparent 28%),
            linear-gradient(145deg, rgba(255,255,255,.99), rgba(250,250,247,.94)) !important;
          box-shadow:
            0 30px 92px rgba(15, 23, 42, .085),
            inset 0 1px 0 rgba(255,255,255,.94) !important;
        }

        html body .qyasat-home section.qyasat-estimator .qyasat-estimator-box,
        html body .qyasat-home section#contact.qyasat-contact {
          display: grid !important;
          grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr) !important;
          gap: 42px !important;
          align-items: center !important;
        }

        html body .qyasat-home section.qyasat-estimator h3,
        html body .qyasat-home section#contact.qyasat-contact h2 {
          margin: 0 0 14px !important;
          color: #111827 !important;
          font-size: clamp(2.4rem, 4.15vw, 4rem) !important;
          line-height: 1.08 !important;
          letter-spacing: -.06em !important;
        }

        html body .qyasat-home section.qyasat-estimator p,
        html body .qyasat-home section#contact.qyasat-contact p {
          margin: 0 !important;
          color: rgba(17, 24, 39, .60) !important;
          font-size: 1rem !important;
          line-height: 1.9 !important;
          font-weight: 760 !important;
        }

        html body .qyasat-home section.qyasat-estimator a,
        html body .qyasat-home section#contact.qyasat-contact a {
          min-height: 48px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 28px !important;
          border-radius: 999px !important;
          background: linear-gradient(90deg, #102333, #087d76) !important;
          color: #fff !important;
          font-weight: 950 !important;
          box-shadow:
            0 20px 50px rgba(8, 125, 118, .24),
            inset 0 1px 0 rgba(255,255,255,.18) !important;
        }

        @media (max-width: 900px) {
          html body .qyasat-home section#ai.qyasat-ai {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "eyebrow"
              "title"
              "desc"
              "cards" !important;
            gap: 16px !important;
            padding: 34px 22px !important;
            border-radius: 28px !important;
          }

          html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid,
          html body .qyasat-home section#process .qyasat-process,
          html body .qyasat-home section#work .qyasat-work-grid.work-grid {
            grid-template-columns: 1fr !important;
          }

          html body .qyasat-home section#ai.qyasat-ai > h2 {
            font-size: clamp(2.35rem, 10vw, 3.55rem) !important;
          }

          html body .qyasat-home section.qyasat-estimator,
          html body .qyasat-home section#contact.qyasat-contact {
            padding: 30px 22px !important;
            border-radius: 28px !important;
          }

          html body .qyasat-home section.qyasat-estimator .qyasat-estimator-box,
          html body .qyasat-home section#contact.qyasat-contact {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          html body .qyasat-home section.qyasat-estimator a,
          html body .qyasat-home section#contact.qyasat-contact a {
            width: 100% !important;
          }
        }



        /* QYASAT_UI_REFINEMENT_20260726_START */
        html body .qyasat-home {
          --qy-ink: #121821;
          --qy-muted: rgba(18, 24, 33, .62);
          --qy-line: rgba(18, 24, 33, .085);
          --qy-card: rgba(255,255,255,.94);
          --qy-gold: #ad7725;
          --qy-teal: #0b827a;
          padding-bottom: 54px !important;
          background:
            radial-gradient(circle at 10% 8%, rgba(11,130,122,.055), transparent 29rem),
            radial-gradient(circle at 87% 15%, rgba(173,119,37,.06), transparent 31rem),
            linear-gradient(180deg, #f8f5ef 0%, #f7f4ee 100%) !important;
        }

        html body .qyasat-home::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: .16;
          background-image:
            repeating-linear-gradient(0deg, rgba(18,24,33,.025) 0 1px, transparent 1px 4px),
            repeating-linear-gradient(90deg, rgba(18,24,33,.018) 0 1px, transparent 1px 5px);
          mix-blend-mode: multiply;
        }

        html body .qyasat-home > * {
          position: relative;
          z-index: 1;
        }

        html body .qyasat-home .qyasat-nav {
          min-height: 76px !important;
          padding: 15px 20px !important;
          border-radius: 22px !important;
          box-shadow: 0 18px 54px rgba(18,24,33,.075), inset 0 1px 0 rgba(255,255,255,.96) !important;
        }

        html body .qyasat-home .qyasat-brand-logo {
          width: 47px !important;
          height: 47px !important;
        }

        html body .qyasat-home .qyasat-nav nav a {
          font-weight: 760 !important;
          transition: color .2s ease, transform .2s ease !important;
        }

        html body .qyasat-home .qyasat-nav nav a:hover {
          transform: translateY(-2px) !important;
        }

        html body .qyasat-home .qyasat-hero {
          min-height: 650px !important;
          padding-top: 48px !important;
          padding-bottom: 48px !important;
          gap: 62px !important;
        }

        html body .qyasat-home .qyasat-hero-copy,
        html body .qyasat-home .qyasat-copy {
          transform: translateY(-22px);
        }

        html body .qyasat-home .qyasat-hero h1,
        html body .qyasat-home .qyasat-copy h1 {
          max-width: 710px !important;
          font-size: clamp(4.4rem, 6.25vw, 6.3rem) !important;
          line-height: .96 !important;
          letter-spacing: -.072em !important;
          text-wrap: balance !important;
        }

        html body .qyasat-home .qyasat-subtitle {
          max-width: 540px !important;
          font-size: 1.02rem !important;
          line-height: 1.82 !important;
        }

        html body .qyasat-home .qyasat-visual {
          transform: translateY(-8px);
        }

        html body .qyasat-home .qyasat-code,
        html body .qyasat-home .qyasat-code-window,
        html body .qyasat-home .qyasat-mini-card,
        html body .qyasat-home .qyasat-floating-card {
          transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease !important;
          will-change: transform;
        }

        html body .qyasat-home .qyasat-code:hover,
        html body .qyasat-home .qyasat-code-window:hover {
          transform: translateY(-6px) rotate(-1deg) !important;
          box-shadow: 0 28px 62px rgba(18,24,33,.16) !important;
        }

        html body .qyasat-home .qyasat-mini-card:hover,
        html body .qyasat-home .qyasat-floating-card:hover {
          transform: translateY(-7px) rotate(1deg) !important;
          box-shadow: 0 30px 68px rgba(18,24,33,.16) !important;
        }

        html body .qyasat-home .qyasat-trust {
          margin-top: 18px !important;
          margin-bottom: 96px !important;
          padding: 26px 36px !important;
          border-radius: 26px !important;
        }

        html body .qyasat-home .qyasat-trust-row,
        html body .qyasat-home .trust-row {
          gap: 10px !important;
        }

        html body .qyasat-home section.qyasat-section,
        html body .qyasat-home section.qyasat-ai,
        html body .qyasat-home section.qyasat-estimator,
        html body .qyasat-home section.qyasat-contact {
          margin-top: 104px !important;
        }

        html body .qyasat-home .qyasat-section-head {
          margin-bottom: 38px !important;
          align-items: end !important;
        }

        html body .qyasat-home .qyasat-section-head h2 {
          max-width: 720px !important;
          text-wrap: balance !important;
        }

        html body .qyasat-home .qyasat-section-head > span {
          max-width: 470px !important;
          line-height: 1.82 !important;
        }

        html body .qyasat-home section#services .services-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 20px !important;
        }

        html body .qyasat-home section#services .services-grid .qyasat-card:first-child {
          grid-column: 1 / -1 !important;
          min-height: 260px !important;
          display: grid !important;
          grid-template-columns: minmax(0,1.2fr) minmax(250px,.8fr) !important;
          align-items: end !important;
        }

        html body .qyasat-home .qyasat-card,
        html body .qyasat-home .qyasat-ai-grid article,
        html body .qyasat-home .qyasat-process article,
        html body .qyasat-home .qyasat-work-grid article,
        html body .qyasat-home .qyasat-blog-card {
          transition: transform .28s cubic-bezier(.2,.8,.2,1), box-shadow .28s ease, border-color .28s ease !important;
        }

        html body .qyasat-home .qyasat-card:hover,
        html body .qyasat-home .qyasat-ai-grid article:hover,
        html body .qyasat-home .qyasat-process article:hover,
        html body .qyasat-home .qyasat-work-grid article:hover,
        html body .qyasat-home .qyasat-blog-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 28px 68px rgba(18,24,33,.105) !important;
          border-color: rgba(11,130,122,.20) !important;
        }

        html body .qyasat-home section#ai.qyasat-ai {
          min-height: 610px !important;
          padding: 58px !important;
          gap: 18px 62px !important;
        }

        html body .qyasat-home section#ai.qyasat-ai::after {
          content: "";
          position: absolute;
          inset-inline-start: 44%;
          top: 23%;
          bottom: 23%;
          width: 1px;
          background: linear-gradient(transparent, rgba(11,130,122,.22), transparent);
          pointer-events: none;
        }

        html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid {
          position: relative !important;
        }

        html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid::before {
          content: "";
          position: absolute;
          left: 12%;
          right: 12%;
          top: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(11,130,122,.18), transparent);
          pointer-events: none;
        }

        html body .qyasat-home section#process .qyasat-process {
          position: relative !important;
          gap: 16px !important;
        }

        html body .qyasat-home section#process .qyasat-process::before {
          content: "";
          position: absolute;
          top: 42px;
          left: 8%;
          right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(11,130,122,.24) 12%, rgba(173,119,37,.22) 88%, transparent);
          z-index: 0;
        }

        html body .qyasat-home section#process .qyasat-process article {
          min-height: 190px !important;
          padding-top: 72px !important;
          z-index: 1;
        }

        html body .qyasat-home section#process .qyasat-process article::before {
          content: counter(qy-step, decimal-leading-zero) !important;
          counter-increment: qy-step;
          display: grid !important;
          place-items: center !important;
          color: var(--qy-ink) !important;
          font-size: .78rem !important;
          font-weight: 900 !important;
          background: #f7f4ee !important;
          border-color: rgba(18,24,33,.16) !important;
          z-index: 2;
        }

        html body .qyasat-home section#process .qyasat-process {
          counter-reset: qy-step;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid article {
          min-height: 320px !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid article > div {
          position: relative !important;
          overflow: hidden !important;
        }

        html body .qyasat-home section#work .qyasat-work-grid.work-grid article > div::after {
          content: "";
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 22px;
          height: 64px;
          border-radius: 16px;
          border: 1px solid rgba(18,24,33,.08);
          background:
            linear-gradient(90deg, rgba(11,130,122,.08) 0 26%, transparent 26% 29%, rgba(18,24,33,.045) 29% 100%),
            linear-gradient(#fff,#fbfaf7);
          opacity: .72;
        }

        html body .qyasat-home .qyasat-blog-empty {
          min-height: 146px !important;
          position: relative !important;
          overflow: hidden !important;
          color: transparent !important;
          background: rgba(255,255,255,.74) !important;
        }

        html body .qyasat-home .qyasat-blog-empty::before,
        html body .qyasat-home .qyasat-blog-empty::after {
          content: "";
          position: absolute;
          left: 7%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(18,24,33,.07), rgba(18,24,33,.025), rgba(18,24,33,.07));
          background-size: 220% 100%;
          animation: qySkeleton 2.2s linear infinite;
        }

        html body .qyasat-home .qyasat-blog-empty::before {
          top: 42px;
          width: 48%;
          height: 17px;
        }

        html body .qyasat-home .qyasat-blog-empty::after {
          top: 75px;
          width: 76%;
          height: 12px;
        }

        html body .qyasat-home section#contact.qyasat-contact {
          min-height: 290px !important;
          overflow: hidden !important;
        }

        html body .qyasat-home section#contact.qyasat-contact::before {
          content: "CMS  →  Analytics  →  Website  →  Growth";
          position: absolute;
          inset-inline-start: 52px;
          bottom: 38px;
          max-width: 430px;
          color: rgba(11,130,122,.62);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: .78rem;
          letter-spacing: .03em;
          white-space: nowrap;
        }

        html body .qyasat-home footer {
          margin-top: 86px !important;
        }

        html body .qyasat-home footer .site-footer,
        html body .qyasat-home footer[class*="footer"] {
          padding-top: 52px !important;
          padding-bottom: 32px !important;
        }

        @keyframes qySkeleton {
          from { background-position: 120% 0; }
          to { background-position: -120% 0; }
        }

        @keyframes qyFloatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        html body .qyasat-home .qyasat-code-window {
          animation: qyFloatSoft 6s ease-in-out infinite;
        }

        html body .qyasat-home .qyasat-floating-card {
          animation: qyFloatSoft 7.2s ease-in-out infinite reverse;
        }

        @media (max-width: 900px) {
          html body .qyasat-home .qyasat-hero {
            min-height: auto !important;
            padding-top: 32px !important;
            gap: 34px !important;
          }

          html body .qyasat-home .qyasat-hero-copy,
          html body .qyasat-home .qyasat-copy {
            transform: none !important;
          }

          html body .qyasat-home .qyasat-hero h1,
          html body .qyasat-home .qyasat-copy h1 {
            font-size: clamp(2.55rem, 11vw, 4.25rem) !important;
          }

          html body .qyasat-home section.qyasat-section,
          html body .qyasat-home section.qyasat-ai,
          html body .qyasat-home section.qyasat-estimator,
          html body .qyasat-home section.qyasat-contact {
            margin-top: 72px !important;
          }

          html body .qyasat-home section#services .services-grid,
          html body .qyasat-home section#services .services-grid .qyasat-card:first-child {
            grid-template-columns: 1fr !important;
          }

          html body .qyasat-home section#services .services-grid .qyasat-card:first-child {
            grid-column: auto !important;
          }

          html body .qyasat-home section#ai.qyasat-ai::after,
          html body .qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid::before,
          html body .qyasat-home section#process .qyasat-process::before,
          html body .qyasat-home section#contact.qyasat-contact::before {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html body .qyasat-home *,
          html body .qyasat-home *::before,
          html body .qyasat-home *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }

        /* QYASAT_HERO_CLEAN_UPDATE_20260726_START */
        html body .qyasat-home .qyasat-nav::before,
        html body .qyasat-home .qyasat-hero h1::before,
        html body .qyasat-home .qyasat-copy h1::before {
          content: none !important;
          display: none !important;
        }

        html body .qyasat-home .qyasat-hero {
          min-height: min(760px, calc(100vh - 118px)) !important;
          padding-top: 62px !important;
          padding-bottom: 52px !important;
          gap: clamp(52px, 7vw, 108px) !important;
          align-items: center !important;
        }

        html body .qyasat-home .qyasat-hero-copy,
        html body .qyasat-home .qyasat-copy {
          align-self: center !important;
          transform: none !important;
          max-width: 650px !important;
        }

        html body .qyasat-home .qyasat-badge {
          width: fit-content !important;
          max-width: 100% !important;
          margin-bottom: 30px !important;
          padding: 14px 22px !important;
          border-radius: 999px !important;
          font-size: .92rem !important;
          line-height: 1.25 !important;
          letter-spacing: -.015em !important;
          white-space: normal !important;
        }

        html body .qyasat-home .qyasat-hero h1,
        html body .qyasat-home .qyasat-copy h1 {
          max-width: 650px !important;
          margin: 0 !important;
          font-size: clamp(4rem, 5.2vw, 5.35rem) !important;
          line-height: 1.03 !important;
          letter-spacing: -.055em !important;
          text-wrap: balance !important;
        }

        html body .qyasat-home .qyasat-subtitle,
        html body .qyasat-home .qyasat-hero-copy > p:not(.qyasat-badge) {
          max-width: 590px !important;
          margin-top: 28px !important;
          font-size: 1rem !important;
          line-height: 1.72 !important;
        }

        html body .qyasat-home .qyasat-actions {
          margin-top: 28px !important;
          gap: 14px !important;
        }

        html body .qyasat-home .qyasat-actions a {
          min-height: 50px !important;
          padding-inline: 24px !important;
          border-radius: 999px !important;
        }

        html body .qyasat-home .qyasat-visual {
          min-height: 430px !important;
          height: 430px !important;
          border-radius: 28px !important;
          box-shadow: 0 28px 75px rgba(17,24,39,.11) !important;
        }

        html body .qyasat-home .qyasat-code-window,
        html body .qyasat-home .qyasat-floating-card {
          box-shadow: 0 20px 50px rgba(17,24,39,.12) !important;
        }

        @media (max-width: 1100px) {
          html body .qyasat-home .qyasat-hero h1,
          html body .qyasat-home .qyasat-copy h1 {
            font-size: clamp(3.65rem, 6vw, 4.7rem) !important;
          }
        }

        @media (max-width: 900px) {
          html body .qyasat-home .qyasat-hero {
            min-height: auto !important;
            padding-top: 42px !important;
            padding-bottom: 42px !important;
            gap: 38px !important;
          }

          html body .qyasat-home .qyasat-hero h1,
          html body .qyasat-home .qyasat-copy h1 {
            max-width: 720px !important;
            font-size: clamp(3.1rem, 9vw, 4.35rem) !important;
            line-height: 1.06 !important;
          }

          html body .qyasat-home .qyasat-visual {
            height: 390px !important;
            min-height: 390px !important;
          }
        }

        @media (max-width: 700px) {
          html body .qyasat-home .qyasat-hero {
            padding-top: 30px !important;
            gap: 30px !important;
          }

          html body .qyasat-home .qyasat-badge {
            margin-bottom: 22px !important;
            padding: 11px 16px !important;
            font-size: .78rem !important;
          }

          html body .qyasat-home .qyasat-hero h1,
          html body .qyasat-home .qyasat-copy h1 {
            font-size: clamp(2.65rem, 12vw, 3.7rem) !important;
            line-height: 1.07 !important;
            letter-spacing: -.045em !important;
          }

          html body .qyasat-home .qyasat-subtitle,
          html body .qyasat-home .qyasat-hero-copy > p:not(.qyasat-badge) {
            margin-top: 22px !important;
            font-size: .92rem !important;
            line-height: 1.68 !important;
          }

          html body .qyasat-home .qyasat-visual {
            height: 320px !important;
            min-height: 320px !important;
          }
        }
        /* QYASAT_HERO_CLEAN_UPDATE_20260726_END */

        /* QYASAT_UI_REFINEMENT_20260726_END */

        /* QYASAT_CORRECT_VISIBLE_SECTIONS_20260705_END */

` }} />
    </main>
    </>
  );
}
