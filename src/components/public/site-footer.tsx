import qyasatLogo from "@/app/qyasat-logo-black.png";
import type { SiteSettings } from "@/lib/site-settings";

type SiteFooterProps = {
  locale: "ar" | "en";
  settings: SiteSettings;
  brandName: string;
  brandTagline: string;
};

const labels = {
  ar: {
    navigation: "روابط سريعة",
    contact: "تواصل معنا",
    social: "تابعنا",
    services: "الخدمات",
    ai: "حلول الذكاء الاصطناعي",
    work: "أعمالنا",
    process: "طريقة العمل",
    contactLink: "تواصل معنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    whatsapp: "واتساب",
    address: "العنوان",
    rights: "جميع الحقوق محفوظة.",
    emptyContact: "أضف بيانات التواصل من إعدادات الموقع.",
    emptySocial: "أضف روابط التواصل الاجتماعي من إعدادات الموقع.",
  },
  en: {
    navigation: "Quick Links",
    contact: "Contact",
    social: "Follow Us",
    services: "Services",
    ai: "AI Solutions",
    work: "Our Work",
    process: "Process",
    contactLink: "Contact Us",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    address: "Address",
    rights: "All rights reserved.",
    emptyContact: "Add contact information from Site Settings.",
    emptySocial: "Add social links from Site Settings.",
  },
} as const;

const socialLabels: Record<keyof SiteSettings["social"], string> = {
  instagram: "Instagram",
  x: "X",
  linkedin: "LinkedIn",
  github: "GitHub",
  tiktok: "TikTok",
};

function whatsappHref(value: string) {
  return value.startsWith("http") ? value : `https://wa.me/${value.replace(/\D/g, "")}`;
}

export function SiteFooter({ locale, settings, brandName, brandTagline }: SiteFooterProps) {
  const t = labels[locale];
  const address = locale === "ar" ? settings.contact.addressAr : settings.contact.addressEn;
  const socialEntries = Object.entries(settings.social).filter((entry): entry is [keyof SiteSettings["social"], string] => Boolean(entry[1]));
  const hasContact = Boolean(settings.contact.email || settings.contact.phone || settings.contact.whatsapp || address);

  return (
    <footer className="qyasat-site-footer" aria-label={locale === "ar" ? "تذييل الموقع" : "Site footer"}>
      <div className="qyasat-footer-glow" aria-hidden="true" />

      <div className="qyasat-footer-grid">
        <div className="qyasat-footer-brand">
          <a href={`/${locale}`} aria-label={brandName}>
            {settings.brand.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.brand.logoUrl} alt={settings.brand.logoAlt || brandName} />
            ) : (
              <img src={qyasatLogo.src} alt={settings.brand.logoAlt || brandName} />
            )}
            <span>
              <strong>{brandName}</strong>
              <small>{brandTagline}</small>
            </span>
          </a>
          <p>
            {locale === "ar"
              ? "نبني حلولاً رقمية ذكية تساعد الشركات على التشغيل، النمو، واتخاذ قرارات أفضل."
              : "We build intelligent digital solutions that help businesses operate, grow, and make better decisions."}
          </p>
        </div>

        <div className="qyasat-footer-column">
          <h2>{t.navigation}</h2>
          <nav>
            <a href={`/${locale}#services`}>{t.services}</a>
            <a href={`/${locale}#ai`}>{t.ai}</a>
            <a href={`/${locale}#work`}>{t.work}</a>
            <a href={`/${locale}#process`}>{t.process}</a>
            <a href={`/${locale}#contact`}>{t.contactLink}</a>
          </nav>
        </div>

        <div className="qyasat-footer-column qyasat-footer-contact">
          <h2>{t.contact}</h2>
          {hasContact ? (
            <div>
              {settings.contact.email ? (
                <a href={`mailto:${settings.contact.email}`}><small>{t.email}</small><span>{settings.contact.email}</span></a>
              ) : null}
              {settings.contact.phone ? (
                <a href={`tel:${settings.contact.phone}`}><small>{t.phone}</small><span dir="ltr">{settings.contact.phone}</span></a>
              ) : null}
              {settings.contact.whatsapp ? (
                <a href={whatsappHref(settings.contact.whatsapp)} target="_blank" rel="noreferrer"><small>{t.whatsapp}</small><span dir="ltr">{settings.contact.whatsapp}</span></a>
              ) : null}
              {address ? <p><small>{t.address}</small><span>{address}</span></p> : null}
            </div>
          ) : <p className="qyasat-footer-empty">{t.emptyContact}</p>}
        </div>

        <div className="qyasat-footer-column">
          <h2>{t.social}</h2>
          {socialEntries.length ? (
            <div className="qyasat-footer-socials">
              {socialEntries.map(([name, url]) => (
                <a href={url} target="_blank" rel="noreferrer" key={name} aria-label={socialLabels[name]}>
                  <span>{socialLabels[name].slice(0, 2).toUpperCase()}</span>
                  {socialLabels[name]}
                </a>
              ))}
            </div>
          ) : <p className="qyasat-footer-empty">{t.emptySocial}</p>}
        </div>
      </div>

      <div className="qyasat-footer-bottom">
        <p>© {new Date().getFullYear()} {brandName}. {t.rights}</p>
        <a href={`/${locale}`}>qyasat.sa</a>
      </div>

      <style>{`
        .qyasat-site-footer {
          position: relative;
          width: 100%;
          max-width: var(--qyasat-max-width, 1160px);
          margin: 34px auto 0;
          box-sizing: border-box;
          padding: 56px 48px 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 36px;
          color: #f8fafc;
          background:
            radial-gradient(circle at 10% 0%, rgba(37,244,255,.17), transparent 30rem),
            radial-gradient(circle at 96% 100%, rgba(157,92,255,.16), transparent 28rem),
            linear-gradient(135deg, #07111c, #0b1725 52%, #09101a);
          box-shadow: 0 34px 100px rgba(15,23,42,.20), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .qyasat-footer-glow { position:absolute; inset:0; pointer-events:none; opacity:.22; background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px); background-size:44px 44px; mask-image:linear-gradient(to bottom,black,transparent 82%); }
        .qyasat-footer-grid { position:relative; display:grid; grid-template-columns:1.35fr .7fr 1fr .8fr; gap:44px; }
        .qyasat-footer-brand > a { display:flex; align-items:center; gap:13px; width:fit-content; color:inherit; text-decoration:none; }
        .qyasat-footer-brand img { width:48px; height:48px; object-fit:contain; }
        .qyasat-footer-mark { width:48px; height:48px; display:grid; place-items:center; border-radius:16px; color:#061016; font-weight:950; letter-spacing:-.08em; background:linear-gradient(135deg,#25f4ff,#9d5cff 64%,#f1c46b); box-shadow:0 0 34px rgba(37,244,255,.22); }
        .qyasat-footer-brand strong,.qyasat-footer-brand small { display:block; }
        .qyasat-footer-brand strong { font-size:1.08rem; }
        .qyasat-footer-brand small { margin-top:3px; color:rgba(226,232,240,.58); font-size:.76rem; }
        .qyasat-footer-brand > p { max-width:360px; margin:23px 0 0; color:rgba(226,232,240,.67); line-height:1.9; font-size:.95rem; }
        .qyasat-footer-column h2 { margin:4px 0 19px; color:#fff; font-size:.95rem; font-weight:900; }
        .qyasat-footer-column nav,.qyasat-footer-contact > div,.qyasat-footer-socials { display:grid; gap:11px; }
        .qyasat-footer-column a { color:rgba(226,232,240,.69); text-decoration:none; transition:color .18s ease,transform .18s ease; }
        .qyasat-footer-column a:hover { color:#fff; transform:translateY(-1px); }
        .qyasat-footer-contact a,.qyasat-footer-contact p { display:grid; gap:3px; margin:0; }
        .qyasat-footer-contact small { color:rgba(37,244,255,.72); font-size:.68rem; font-weight:850; text-transform:uppercase; letter-spacing:.06em; }
        .qyasat-footer-contact span { color:rgba(226,232,240,.76); overflow-wrap:anywhere; line-height:1.55; }
        .qyasat-footer-socials a { display:flex; align-items:center; gap:9px; }
        .qyasat-footer-socials a > span { width:30px; height:30px; display:grid; place-items:center; border:1px solid rgba(255,255,255,.12); border-radius:10px; color:#d8fbff; background:rgba(255,255,255,.05); font-size:.63rem; font-weight:900; }
        .qyasat-footer-empty { margin:0; color:rgba(226,232,240,.44); font-size:.84rem; line-height:1.7; }
        .qyasat-footer-bottom { position:relative; display:flex; justify-content:space-between; align-items:center; gap:20px; margin-top:42px; padding-top:22px; border-top:1px solid rgba(255,255,255,.09); color:rgba(226,232,240,.48); font-size:.78rem; }
        .qyasat-footer-bottom p { margin:0; }
        .qyasat-footer-bottom a { color:rgba(226,232,240,.58); text-decoration:none; }
        @media (max-width:1000px) { .qyasat-footer-grid { grid-template-columns:1fr 1fr; } }
        @media (max-width:640px) { .qyasat-site-footer { padding:38px 22px 20px; border-radius:28px; } .qyasat-footer-grid { grid-template-columns:1fr; gap:32px; } .qyasat-footer-bottom { align-items:flex-start; flex-direction:column; gap:8px; } }
      `}</style>
    </footer>
  );
}
