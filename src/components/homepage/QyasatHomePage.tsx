"use client";

import { useMemo, useState } from "react";

type QyasatHomePageProps = {
  locale?: string;
  settings?: unknown;
  [key: string]: unknown;
};

const content = {
  ar: {
    dir: "rtl",
    lang: "ar",
    brandEyebrow: "AI & Web Dev Studio",
    brandName: "قياسات",
    nav: ["الخدمات", "حلول AI", "أعمالنا", "الطريقة", "تواصل معنا"],
    navHref: ["#solutions", "#ai", "#work", "#process", "#contact"],
    start: "ابدأ مشروعك الآن",
    badge: "برمجيات فاخرة · ذكاء اصطناعي · منصات SaaS",
    headlineTop: "نبني أنظمة ذكية",
    headlineBottom: "تجعل مشروعك يعمل ويبيع وينمو",
    subtitle:
      "نطور تطبيقات ويب، منصات SaaS، لوحات تحكم، تكاملات دفع، وحلول ذكاء اصطناعي للشركات ورواد الأعمال في الخليج.",
    primaryCta: "احجز استشارة مجانية",
    secondaryCta: "شاهد ماذا نبني",
    trustTitle: "نطاق الخبرة الذي تحتاجه لإطلاق منتج رقمي ناضج",
    trustItems: ["SaaS Platforms", "Payment Integrations", "AI Automation", "Admin Dashboards", "Business Intelligence", "Web Apps"],
    visualLabel: "QY Intelligence Layer",
    visualTitle: "واجهة قرار رقمية",
    visualText: "تحويل الفكرة إلى نظام قابل للتشغيل، القياس، والتوسع.",
    codeA: "analyze business flow",
    codeB: "design scalable modules",
    codeC: "launch, measure, improve",
    solutionsKicker: "مصفوفة الحلول",
    solutionsTitle: "ماذا تحتاج أن نبني لك؟",
    solutionsSubtitle:
      "بدل عرض خدمات عامة، نبدأ من المشكلة التجارية ونحوّلها إلى نظام عملي قابل للبيع والتوسع.",
    solutionCards: [
      {
        icon: "◇",
        title: "منصة SaaS كاملة",
        desc: "بنية متعددة العملاء، اشتراكات، صلاحيات، فواتير، لوحة إدارة، وتجربة مستخدم جاهزة للنمو.",
        roi: "مناسب لإطلاق منتج قابل للتوسع",
      },
      {
        icon: "▣",
        title: "تطبيق ويب مخصص",
        desc: "واجهة سريعة ونظام خلفي منظم للشركات التي تحتاج منتجاً دقيقاً وليس قالباً جاهزاً.",
        roi: "اختصار التشغيل والاعتماد على الأدوات المتفرقة",
      },
      {
        icon: "✦",
        title: "ذكاء اصطناعي وأتمتة",
        desc: "مساعدات ذكية، تلخيص، كتابة، تحليل بيانات، تصنيف، وربط AI داخل عملياتك اليومية.",
        roi: "تقليل الوقت اليدوي وتحسين جودة القرار",
      },
      {
        icon: "◌",
        title: "لوحات تحكم وإدارة",
        desc: "صلاحيات، تقارير، عمليات، محتوى، مستخدمون، رسائل، ومراقبة دقيقة للنظام.",
        roi: "وضوح إداري وتحكم أعلى",
      },
      {
        icon: "⌁",
        title: "تكاملات الدفع والفواتير",
        desc: "ربط بوابات دفع، محافظ، إشعارات، حالات طلبات، وسجلات مالية قابلة للمراجعة.",
        roi: "تجربة شراء أوضح وأقل أخطاء",
      },
      {
        icon: "↗",
        title: "تطوير مشروع قائم",
        desc: "تحليل الكود الحالي، تنظيف المنطق، تحسين الأداء، إعادة بناء UI/UX، وخطة تطوير آمنة.",
        roi: "إنقاذ المشروع بدون البدء من الصفر",
      },
    ],
    aiKicker: "AI داخل النظام وليس كزينة",
    aiTitle: "نربط الذكاء الاصطناعي بما يخدم قرارك التجاري",
    aiText:
      "نصمم طبقة AI عملية: مساعد ذكي، تحليل بيانات، أتمتة رسائل، توليد محتوى، بحث داخلي، وربط مع لوحات الإدارة. الهدف ليس الاستعراض؛ الهدف تقليل الوقت ورفع جودة التشغيل.",
    aiStats: [
      ["أتمتة", "للعمليات المتكررة"],
      ["تحليل", "للمبيعات والسلوك"],
      ["مساعد", "للعميل أو الموظف"],
    ],
    estimatorKicker: "حاسبة المشروع",
    estimatorTitle: "اعرف نطاق مشروعك خلال دقيقة",
    estimatorSubtitle:
      "اختر نوع المشروع والمتطلبات الأساسية لنقترح لك نطاقاً مبدئياً ومدة تنفيذ تقريبية قبل الاجتماع.",
    projectLabel: "نوع المشروع",
    complexityLabel: "مستوى التعقيد",
    togglesLabel: "إضافات مؤثرة",
    projectTypes: [
      { label: "موقع أو تطبيق ويب", weight: 1 },
      { label: "لوحة تحكم ونظام إدارة", weight: 2 },
      { label: "منصة SaaS", weight: 3 },
      { label: "تطوير مشروع قائم", weight: 2 },
    ],
    complexities: [
      { label: "MVP سريع", weight: 1 },
      { label: "منتج متكامل", weight: 2 },
      { label: "نظام مؤسسي", weight: 3 },
    ],
    aiToggle: "ذكاء اصطناعي",
    paymentToggle: "بوابة دفع",
    estimateLabel: "النطاق المبدئي",
    durationLabel: "مدة تقديرية",
    nextStep: "الخطوة التالية",
    bookEngineer: "ناقش التفاصيل مع مهندس",
    estimates: {
      simple: ["نطاق بسيط", "2 - 4 أسابيع", "جلسة تشخيص سريعة ثم عرض تنفيذ واضح"],
      medium: ["نطاق متوسط", "4 - 8 أسابيع", "تحليل متطلبات وتجربة استخدام ثم خطة إطلاق"],
      advanced: ["نطاق متقدم", "8 - 14 أسبوعاً", "ورشة اكتشاف، تقسيم مراحل، وبناء تدريجي"],
    },
    processKicker: "طريقة العمل",
    processTitle: "من الفكرة إلى نظام يعمل",
    process: [
      ["01", "تشخيص", "نفهم الهدف التجاري، المستخدمين، العمليات، ونقاط الألم."],
      ["02", "تصميم", "نرسم تجربة الاستخدام، بنية النظام، والموديولات الأساسية."],
      ["03", "تطوير", "نبني المنتج على مراحل قابلة للفحص والتحسين بدون فوضى."],
      ["04", "إطلاق وتحسين", "نراقب الأداء، نعالج الملاحظات، ونجهز التوسع."],
    ],
    workKicker: "أعمال وأنظمة",
    workTitle: "نصنع منتجات رقمية لا صفحات جميلة فقط",
    workItems: [
      ["Barcode Platform", "منصة طلبات ونقاط وتكاملات دفع ولوحات إدارة."],
      ["Presence CMS", "موقع ديناميكي وإدارة محتوى وتحسين ظهور رقمي."],
      ["ITQAN Workshops", "نظام ورش، تسجيل، إدارة محتوى، ورسائل."],
    ],
    contactTitle: "عندك فكرة أو مشروع يحتاج إنقاذ؟",
    contactText:
      "ابدأ برسالة قصيرة: ما الذي تريد بناءه، ما المشكلة الحالية، وما النتيجة التي تريد الوصول لها. سنحوّلها إلى خطة تقنية واضحة.",
    finalCta: "ابدأ مشروعك مع قياسات",
  },
  en: {
    dir: "ltr",
    lang: "en",
    brandEyebrow: "AI & Web Dev Studio",
    brandName: "قياسات",
    nav: ["Services", "AI Solutions", "Work", "Process", "Contact"],
    navHref: ["#solutions", "#ai", "#work", "#process", "#contact"],
    start: "Start your project",
    badge: "Luxury Software · AI · SaaS Platforms",
    headlineTop: "We build intelligent systems",
    headlineBottom: "that help your business run, sell, and grow",
    subtitle:
      "قياسات develops web apps, SaaS platforms, admin dashboards, payment integrations, and practical AI solutions for companies and founders in the Gulf.",
    primaryCta: "Book a free consultation",
    secondaryCta: "See what we build",
    trustTitle: "The technical scope you need to launch a mature digital product",
    trustItems: ["SaaS Platforms", "Payment Integrations", "AI Automation", "Admin Dashboards", "Business Intelligence", "Web Apps"],
    visualLabel: "QY Intelligence Layer",
    visualTitle: "Digital decision interface",
    visualText: "Turning an idea into a system that can operate, measure, and scale.",
    codeA: "analyze business flow",
    codeB: "design scalable modules",
    codeC: "launch, measure, improve",
    solutionsKicker: "Solution Matrix",
    solutionsTitle: "What do you need us to build?",
    solutionsSubtitle:
      "Instead of generic services, we start from the business problem and turn it into a working system that can grow.",
    solutionCards: [
      {
        icon: "◇",
        title: "Complete SaaS Platform",
        desc: "Multi-tenant architecture, subscriptions, permissions, billing, admin panel, and a scalable user experience.",
        roi: "Best for scalable digital products",
      },
      {
        icon: "▣",
        title: "Custom Web App",
        desc: "Fast frontend and organized backend for companies that need precision, not a generic template.",
        roi: "Reduces scattered tools and manual work",
      },
      {
        icon: "✦",
        title: "AI & Automation",
        desc: "Smart assistants, summaries, writing, data analysis, classification, and AI embedded in daily workflows.",
        roi: "Less manual time, better decisions",
      },
      {
        icon: "◌",
        title: "Admin Dashboards",
        desc: "Permissions, reports, operations, content, users, messages, and detailed system monitoring.",
        roi: "More control and operational clarity",
      },
      {
        icon: "⌁",
        title: "Payment & Billing Integrations",
        desc: "Payment gateways, wallets, notifications, order states, and reviewable financial records.",
        roi: "Clearer checkout and fewer errors",
      },
      {
        icon: "↗",
        title: "Existing Project Upgrade",
        desc: "Code review, logic cleanup, performance improvements, UI/UX rebuild, and a safe development plan.",
        roi: "Rescue the product without restarting",
      },
    ],
    aiKicker: "AI inside the system, not decoration",
    aiTitle: "We connect AI to real business decisions",
    aiText:
      "We design a practical AI layer: smart assistant, data analysis, message automation, content generation, internal search, and admin dashboard integration. The goal is not a gimmick; the goal is less time and better operations.",
    aiStats: [
      ["Automation", "for repetitive operations"],
      ["Analysis", "for sales and behavior"],
      ["Assistant", "for customers or staff"],
    ],
    estimatorKicker: "Project Estimator",
    estimatorTitle: "Understand your project scope in one minute",
    estimatorSubtitle:
      "Choose the project type and main requirements, and we will suggest an initial scope and estimated timeline before the meeting.",
    projectLabel: "Project type",
    complexityLabel: "Complexity",
    togglesLabel: "Impact add-ons",
    projectTypes: [
      { label: "Website or web app", weight: 1 },
      { label: "Admin dashboard", weight: 2 },
      { label: "SaaS platform", weight: 3 },
      { label: "Existing project upgrade", weight: 2 },
    ],
    complexities: [
      { label: "Fast MVP", weight: 1 },
      { label: "Complete product", weight: 2 },
      { label: "Enterprise system", weight: 3 },
    ],
    aiToggle: "Artificial intelligence",
    paymentToggle: "Payment gateway",
    estimateLabel: "Initial scope",
    durationLabel: "Estimated timeline",
    nextStep: "Next step",
    bookEngineer: "Discuss details with an engineer",
    estimates: {
      simple: ["Simple scope", "2 - 4 weeks", "Quick diagnosis session then a clear execution proposal"],
      medium: ["Medium scope", "4 - 8 weeks", "Requirements analysis, UX plan, then launch roadmap"],
      advanced: ["Advanced scope", "8 - 14 weeks", "Discovery workshop, phased delivery, and gradual build"],
    },
    processKicker: "Process",
    processTitle: "From idea to working system",
    process: [
      ["01", "Diagnose", "We understand the business goal, users, operations, and pain points."],
      ["02", "Design", "We map the UX, system architecture, and core modules."],
      ["03", "Develop", "We build in clear, testable stages without chaos."],
      ["04", "Launch & improve", "We monitor performance, process feedback, and prepare for scale."],
    ],
    workKicker: "Work & Systems",
    workTitle: "We build digital products, not just pretty pages",
    workItems: [
      ["Barcode Platform", "Ordering, loyalty points, payment integrations, and admin dashboards."],
      ["Presence CMS", "Dynamic website, content management, and digital presence improvements."],
      ["ITQAN Workshops", "Workshops, registration, content management, and messaging system."],
    ],
    contactTitle: "Have an idea or a project that needs rescue?",
    contactText:
      "Start with a short message: what you want to build, the current problem, and the result you want. We will turn it into a clear technical plan.",
    finalCta: "Start with قياسات",
  },
} as const;

export function QyasatHomePage({ locale = "ar" }: QyasatHomePageProps) {
  const isEnglish = locale.toLowerCase().startsWith("en");
  const t = isEnglish ? content.en : content.ar;

  const [projectIndex, setProjectIndex] = useState(1);
  const [complexityIndex, setComplexityIndex] = useState(1);
  const [needsAi, setNeedsAi] = useState(true);
  const [needsPayment, setNeedsPayment] = useState(true);

  const estimate = useMemo(() => {
    const projectWeight = t.projectTypes[projectIndex]?.weight ?? 2;
    const complexityWeight = t.complexities[complexityIndex]?.weight ?? 2;
    const score = projectWeight + complexityWeight + (needsAi ? 2 : 0) + (needsPayment ? 1 : 0);

    if (score <= 4) return t.estimates.simple;
    if (score <= 7) return t.estimates.medium;
    return t.estimates.advanced;
  }, [complexityIndex, needsAi, needsPayment, projectIndex, t]);

  return (
    <main className="qyasat-lux-root" dir={t.dir} lang={t.lang}>
      <section className="qyasat-lux-shell">
        <header className="qyasat-lux-header">
          <a className="qyasat-lux-brand" href={isEnglish ? "/en" : "/ar"} aria-label={t.brandName}>
            <span className="qyasat-lux-mark">QY</span>
            <span>
              <strong>{t.brandName}</strong>
              <small>{t.brandEyebrow}</small>
            </span>
          </a>

          <nav className="qyasat-lux-nav" aria-label="Main navigation">
            {t.nav.map((item, index) => (
              <a href={t.navHref[index]} key={item}>
                {item}
              </a>
            ))}
          </nav>

          <a className="qyasat-lux-header-cta" href="#contact">
            {t.start}
          </a>
        </header>

        <section className="qyasat-lux-hero">
          <div className="qyasat-lux-hero-copy">
            <div className="qyasat-lux-badge">
              <span />
              {t.badge}
            </div>

            <h1>
              {t.headlineTop}
              <span>{t.headlineBottom}</span>
            </h1>

            <p>{t.subtitle}</p>

            <div className="qyasat-lux-actions">
              <a className="qyasat-lux-primary" href="#contact">
                {t.primaryCta}
              </a>
              <a className="qyasat-lux-secondary" href="#solutions">
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <div className="qyasat-lux-visual" aria-hidden="true">
            <div className="qyasat-lux-orb qyasat-lux-orb-a" />
            <div className="qyasat-lux-orb qyasat-lux-orb-b" />
            <div className="qyasat-lux-neural">
              <div className="qyasat-lux-ring qyasat-lux-ring-one" />
              <div className="qyasat-lux-ring qyasat-lux-ring-two" />
              <div className="qyasat-lux-ring qyasat-lux-ring-three" />
              <div className="qyasat-lux-core">AI</div>
            </div>
            <div className="qyasat-lux-code-card qyasat-lux-code-card-a">
              <b>{t.visualLabel}</b>
              <span>{t.codeA}</span>
              <span>{t.codeB}</span>
              <span>{t.codeC}</span>
            </div>
            <div className="qyasat-lux-insight-card">
              <small>{t.visualTitle}</small>
              <strong>{t.visualText}</strong>
            </div>
          </div>
        </section>

        <section className="qyasat-lux-trust">
          <p>{t.trustTitle}</p>
          <div>
            {t.trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="qyasat-lux-section" id="solutions">
          <div className="qyasat-lux-section-head">
            <span>{t.solutionsKicker}</span>
            <h2>{t.solutionsTitle}</h2>
            <p>{t.solutionsSubtitle}</p>
          </div>

          <div className="qyasat-lux-grid">
            {t.solutionCards.map((card) => (
              <article className="qyasat-lux-card" key={card.title}>
                <i>{card.icon}</i>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <b>{card.roi}</b>
              </article>
            ))}
          </div>
        </section>

        <section className="qyasat-lux-ai" id="ai">
          <div>
            <span>{t.aiKicker}</span>
            <h2>{t.aiTitle}</h2>
            <p>{t.aiText}</p>
          </div>
          <div className="qyasat-lux-ai-stats">
            {t.aiStats.map(([title, text]) => (
              <article key={title}>
                <strong>{title}</strong>
                <small>{text}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="qyasat-lux-estimator">
          <div className="qyasat-lux-section-head">
            <span>{t.estimatorKicker}</span>
            <h2>{t.estimatorTitle}</h2>
            <p>{t.estimatorSubtitle}</p>
          </div>

          <div className="qyasat-lux-estimator-box">
            <div className="qyasat-lux-picker">
              <h3>{t.projectLabel}</h3>
              <div>
                {t.projectTypes.map((item, index) => (
                  <button
                    className={projectIndex === index ? "is-active" : ""}
                    key={item.label}
                    onClick={() => setProjectIndex(index)}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <h3>{t.complexityLabel}</h3>
              <div>
                {t.complexities.map((item, index) => (
                  <button
                    className={complexityIndex === index ? "is-active" : ""}
                    key={item.label}
                    onClick={() => setComplexityIndex(index)}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <h3>{t.togglesLabel}</h3>
              <div>
                <button className={needsAi ? "is-active" : ""} onClick={() => setNeedsAi((value) => !value)} type="button">
                  {t.aiToggle}
                </button>
                <button
                  className={needsPayment ? "is-active" : ""}
                  onClick={() => setNeedsPayment((value) => !value)}
                  type="button"
                >
                  {t.paymentToggle}
                </button>
              </div>
            </div>

            <aside className="qyasat-lux-result">
              <small>{t.estimateLabel}</small>
              <strong>{estimate[0]}</strong>
              <dl>
                <div>
                  <dt>{t.durationLabel}</dt>
                  <dd>{estimate[1]}</dd>
                </div>
                <div>
                  <dt>{t.nextStep}</dt>
                  <dd>{estimate[2]}</dd>
                </div>
              </dl>
              <a href="#contact">{t.bookEngineer}</a>
            </aside>
          </div>
        </section>

        <section className="qyasat-lux-section" id="process">
          <div className="qyasat-lux-section-head">
            <span>{t.processKicker}</span>
            <h2>{t.processTitle}</h2>
          </div>

          <div className="qyasat-lux-process">
            {t.process.map(([number, title, text]) => (
              <article key={number}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="qyasat-lux-work" id="work">
          <div className="qyasat-lux-section-head">
            <span>{t.workKicker}</span>
            <h2>{t.workTitle}</h2>
          </div>

          <div className="qyasat-lux-work-grid">
            {t.workItems.map(([title, text]) => (
              <article key={title}>
                <div />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="qyasat-lux-contact" id="contact">
          <div>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
          </div>
          <a href={isEnglish ? "/en/contact" : "/ar/contact"}>{t.finalCta}</a>
        </section>
      </section>

      <style>{`
        .qyasat-lux-root {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 16% 18%, rgba(0, 242, 254, 0.16), transparent 31rem),
            radial-gradient(circle at 78% 12%, rgba(159, 92, 255, 0.12), transparent 34rem),
            radial-gradient(circle at 83% 72%, rgba(255, 198, 92, 0.11), transparent 30rem),
            linear-gradient(135deg, #05060b 0%, #08111f 46%, #05060b 100%);
          color: #f8fafc;
          font-family: "IBM Plex Sans Arabic", "Tajawal", "Plus Jakarta Sans", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .qyasat-lux-root * {
          box-sizing: border-box;
        }

        .qyasat-lux-shell {
          width: min(1240px, calc(100% - 32px));
          margin: 0 auto;
          padding: 20px 0 56px;
          position: relative;
        }

        .qyasat-lux-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.28;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(circle at center, black, transparent 72%);
        }

        .qyasat-lux-header {
          position: sticky;
          top: 16px;
          z-index: 20;
          min-height: 72px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 18px;
          padding: 14px 18px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          background: rgba(8, 12, 22, 0.68);
          backdrop-filter: blur(22px);
          box-shadow: 0 22px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .qyasat-lux-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: inherit;
          text-decoration: none;
        }

        .qyasat-lux-mark {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          color: #061016;
          font-weight: 950;
          letter-spacing: -0.08em;
          background: linear-gradient(135deg, #25f4ff, #9d5cff 62%, #f1c46b);
          box-shadow: 0 0 32px rgba(37, 244, 255, 0.25);
        }

        .qyasat-lux-brand strong,
        .qyasat-lux-brand small {
          display: block;
        }

        .qyasat-lux-brand strong {
          font-size: 1rem;
          letter-spacing: -0.03em;
        }

        .qyasat-lux-brand small {
          margin-top: 2px;
          color: rgba(226, 232, 240, 0.58);
          font-size: 0.74rem;
        }

        .qyasat-lux-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 26px;
          white-space: nowrap;
        }

        .qyasat-lux-nav a {
          color: rgba(226, 232, 240, 0.68);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 180ms ease, transform 180ms ease;
        }

        .qyasat-lux-nav a:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .qyasat-lux-header-cta {
          justify-self: end;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          color: #061016;
          text-decoration: none;
          font-weight: 850;
          background: linear-gradient(135deg, #25f4ff, #5fb6ff 45%, #9d5cff);
          box-shadow: 0 0 34px rgba(37, 244, 255, 0.22);
        }

        [dir="rtl"] .qyasat-lux-header-cta {
          justify-self: start;
        }

        .qyasat-lux-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 0.86fr);
          align-items: center;
          gap: 42px;
          min-height: 650px;
          padding: 76px 10px 34px;
          position: relative;
        }

        .qyasat-lux-hero-copy {
          position: relative;
          z-index: 2;
        }

        .qyasat-lux-badge {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          color: rgba(226, 232, 240, 0.76);
          background: rgba(255,255,255,0.045);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
        }

        .qyasat-lux-badge span {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #25f4ff;
          box-shadow: 0 0 22px #25f4ff;
        }

        .qyasat-lux-hero h1 {
          max-width: 820px;
          margin: 22px 0 18px;
          color: #ffffff;
          font-size: clamp(3rem, 7vw, 6.8rem);
          line-height: 0.98;
          letter-spacing: -0.075em;
          font-weight: 950;
        }

        .qyasat-lux-hero h1 span {
          display: block;
          padding-top: 8px;
          background: linear-gradient(135deg, #ffffff 0%, #dbeafe 34%, #25f4ff 63%, #b079ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .qyasat-lux-hero p {
          max-width: 680px;
          margin: 0;
          color: rgba(226, 232, 240, 0.72);
          font-size: clamp(1.05rem, 1.8vw, 1.28rem);
          line-height: 1.9;
        }

        .qyasat-lux-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .qyasat-lux-primary,
        .qyasat-lux-secondary,
        .qyasat-lux-contact a,
        .qyasat-lux-result a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 24px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 850;
        }

        .qyasat-lux-primary,
        .qyasat-lux-contact a,
        .qyasat-lux-result a {
          color: #061016;
          background: linear-gradient(135deg, #25f4ff, #5fb6ff 48%, #9d5cff);
          box-shadow: 0 0 42px rgba(37, 244, 255, 0.23);
        }

        .qyasat-lux-secondary {
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.045);
        }

        .qyasat-lux-visual {
          position: relative;
          height: 520px;
          border-radius: 36px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            radial-gradient(circle at 50% 40%, rgba(37,244,255,0.14), transparent 19rem),
            radial-gradient(circle at 70% 58%, rgba(157,92,255,0.16), transparent 18rem),
            linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 40px 130px rgba(0,0,0,0.28);
          overflow: hidden;
        }

        .qyasat-lux-visual::before,
        .qyasat-lux-visual::after {
          content: "";
          position: absolute;
          inset: auto -20% 17% -20%;
          height: 170px;
          border: 1px solid rgba(37, 244, 255, 0.18);
          border-radius: 50%;
          transform: rotate(-9deg);
        }

        .qyasat-lux-visual::after {
          inset: auto -16% 6% -18%;
          border-color: rgba(157, 92, 255, 0.22);
          transform: rotate(8deg);
        }

        .qyasat-lux-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(2px);
        }

        .qyasat-lux-orb-a {
          width: 210px;
          height: 210px;
          top: 58px;
          right: 48px;
          background: radial-gradient(circle, rgba(37,244,255,0.26), transparent 64%);
        }

        .qyasat-lux-orb-b {
          width: 270px;
          height: 270px;
          left: 4px;
          bottom: 18px;
          background: radial-gradient(circle, rgba(157,92,255,0.18), transparent 66%);
        }

        .qyasat-lux-neural {
          position: absolute;
          inset: 86px 70px auto auto;
          width: 285px;
          height: 285px;
          display: grid;
          place-items: center;
        }

        [dir="ltr"] .qyasat-lux-neural {
          inset: 86px auto auto 70px;
        }

        .qyasat-lux-ring {
          position: absolute;
          border-radius: 45% 55% 50% 50%;
          border: 1px solid rgba(37,244,255,0.42);
          box-shadow: 0 0 28px rgba(37,244,255,0.12);
          animation: qyasat-lux-spin 16s linear infinite;
        }

        .qyasat-lux-ring-one {
          inset: 0;
        }

        .qyasat-lux-ring-two {
          inset: 28px;
          border-color: rgba(157,92,255,0.48);
          animation-duration: 20s;
          animation-direction: reverse;
        }

        .qyasat-lux-ring-three {
          inset: 56px;
          border-color: rgba(241,196,107,0.45);
          animation-duration: 13s;
        }

        .qyasat-lux-core {
          width: 104px;
          height: 104px;
          display: grid;
          place-items: center;
          border-radius: 32px;
          color: #ffffff;
          font-size: 2rem;
          font-weight: 950;
          letter-spacing: -0.08em;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 0 45px rgba(37,244,255,0.14);
          backdrop-filter: blur(16px);
        }

        .qyasat-lux-code-card,
        .qyasat-lux-insight-card {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 22px;
          background: rgba(6, 10, 20, 0.66);
          backdrop-filter: blur(18px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.32);
        }

        .qyasat-lux-code-card {
          left: 34px;
          top: 54px;
          width: 260px;
          padding: 18px;
        }

        [dir="ltr"] .qyasat-lux-code-card {
          left: auto;
          right: 34px;
        }

        .qyasat-lux-code-card b,
        .qyasat-lux-code-card span {
          display: block;
        }

        .qyasat-lux-code-card b {
          margin-bottom: 14px;
          color: #ffffff;
        }

        .qyasat-lux-code-card span {
          margin-top: 8px;
          color: rgba(226,232,240,0.62);
          font-size: 0.86rem;
        }

        .qyasat-lux-code-card span::before {
          content: ">";
          color: #25f4ff;
          margin-inline-end: 7px;
        }

        .qyasat-lux-insight-card {
          right: 34px;
          bottom: 34px;
          width: 300px;
          padding: 20px;
        }

        [dir="ltr"] .qyasat-lux-insight-card {
          right: auto;
          left: 34px;
        }

        .qyasat-lux-insight-card small {
          display: block;
          margin-bottom: 8px;
          color: #25f4ff;
        }

        .qyasat-lux-insight-card strong {
          color: #ffffff;
          line-height: 1.7;
        }

        .qyasat-lux-trust {
          margin: 10px 0 92px;
          padding: 22px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          background: rgba(255,255,255,0.045);
          backdrop-filter: blur(18px);
        }

        .qyasat-lux-trust p {
          margin: 0 0 18px;
          text-align: center;
          color: rgba(226,232,240,0.62);
        }

        .qyasat-lux-trust div {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .qyasat-lux-trust span {
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(248,250,252,0.76);
          background: rgba(0,0,0,0.18);
          font-size: 0.9rem;
        }

        .qyasat-lux-section {
          margin: 0 0 105px;
        }

        .qyasat-lux-section-head {
          width: min(760px, 100%);
          margin: 0 auto 34px;
          text-align: center;
        }

        .qyasat-lux-section-head span,
        .qyasat-lux-ai span {
          display: inline-flex;
          margin-bottom: 12px;
          color: #25f4ff;
          font-weight: 850;
        }

        .qyasat-lux-section-head h2,
        .qyasat-lux-ai h2,
        .qyasat-lux-contact h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(2rem, 4.4vw, 4rem);
          line-height: 1.05;
          letter-spacing: -0.06em;
        }

        .qyasat-lux-section-head p,
        .qyasat-lux-ai p,
        .qyasat-lux-contact p {
          margin: 16px auto 0;
          color: rgba(226,232,240,0.68);
          font-size: 1.06rem;
          line-height: 1.9;
        }

        .qyasat-lux-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .qyasat-lux-card {
          min-height: 278px;
          padding: 26px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.018)),
            radial-gradient(circle at 20% 0%, rgba(37,244,255,0.08), transparent 14rem);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .qyasat-lux-card:hover {
          transform: translateY(-5px);
          border-color: rgba(37,244,255,0.28);
          background:
            linear-gradient(145deg, rgba(255,255,255,0.082), rgba(255,255,255,0.025)),
            radial-gradient(circle at 20% 0%, rgba(37,244,255,0.12), transparent 14rem);
        }

        .qyasat-lux-card i {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          border-radius: 17px;
          color: #25f4ff;
          font-style: normal;
          font-size: 1.3rem;
          border: 1px solid rgba(37,244,255,0.22);
          background: rgba(37,244,255,0.08);
        }

        .qyasat-lux-card h3,
        .qyasat-lux-process h3,
        .qyasat-lux-work h3,
        .qyasat-lux-picker h3 {
          margin: 0;
          color: #ffffff;
          font-size: 1.22rem;
          letter-spacing: -0.035em;
        }

        .qyasat-lux-card p,
        .qyasat-lux-process p,
        .qyasat-lux-work p {
          margin: 12px 0 18px;
          color: rgba(226,232,240,0.66);
          line-height: 1.85;
        }

        .qyasat-lux-card b {
          display: inline-flex;
          padding: 8px 10px;
          border-radius: 999px;
          color: #dffcff;
          background: rgba(37,244,255,0.08);
          font-size: 0.84rem;
        }

        .qyasat-lux-ai {
          display: grid;
          grid-template-columns: 1fr 0.82fr;
          gap: 24px;
          align-items: stretch;
          margin: 0 0 105px;
          padding: 34px;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            radial-gradient(circle at 12% 30%, rgba(157,92,255,0.13), transparent 24rem),
            linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.018));
        }

        .qyasat-lux-ai-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .qyasat-lux-ai-stats article {
          padding: 20px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.18);
        }

        .qyasat-lux-ai-stats strong {
          display: block;
          color: #ffffff;
          font-size: 1.35rem;
        }

        .qyasat-lux-ai-stats small {
          display: block;
          margin-top: 6px;
          color: rgba(226,232,240,0.62);
        }

        .qyasat-lux-estimator {
          margin: 0 0 105px;
        }

        .qyasat-lux-estimator-box {
          display: grid;
          grid-template-columns: 1fr 0.46fr;
          gap: 18px;
          padding: 18px;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            radial-gradient(circle at 82% 25%, rgba(37,244,255,0.1), transparent 22rem),
            linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .qyasat-lux-picker,
        .qyasat-lux-result {
          padding: 26px;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(0,0,0,0.18);
        }

        .qyasat-lux-picker h3 {
          margin-top: 24px;
          margin-bottom: 12px;
          font-size: 1rem;
        }

        .qyasat-lux-picker h3:first-child {
          margin-top: 0;
        }

        .qyasat-lux-picker div {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .qyasat-lux-picker button {
          cursor: pointer;
          min-height: 44px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(248,250,252,0.78);
          background: rgba(255,255,255,0.045);
          font: inherit;
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .qyasat-lux-picker button:hover {
          transform: translateY(-1px);
          border-color: rgba(37,244,255,0.28);
        }

        .qyasat-lux-picker button.is-active {
          color: #061016;
          border-color: transparent;
          background: linear-gradient(135deg, #25f4ff, #9d5cff);
          font-weight: 850;
        }

        .qyasat-lux-result {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .qyasat-lux-result small {
          color: rgba(226,232,240,0.58);
        }

        .qyasat-lux-result > strong {
          display: block;
          margin: 10px 0 18px;
          color: #ffffff;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1;
          letter-spacing: -0.06em;
          background: linear-gradient(135deg, #ffffff, #25f4ff 54%, #b079ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .qyasat-lux-result dl {
          display: grid;
          gap: 12px;
          margin: 0 0 22px;
        }

        .qyasat-lux-result div {
          padding: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.04);
        }

        .qyasat-lux-result dt {
          color: rgba(226,232,240,0.56);
          font-size: 0.84rem;
        }

        .qyasat-lux-result dd {
          margin: 5px 0 0;
          color: #ffffff;
          line-height: 1.6;
        }

        .qyasat-lux-process {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .qyasat-lux-process article {
          padding: 24px;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
        }

        .qyasat-lux-process strong {
          display: block;
          margin-bottom: 20px;
          color: #25f4ff;
          font-size: 1.35rem;
        }

        .qyasat-lux-work {
          margin: 0 0 105px;
        }

        .qyasat-lux-work-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .qyasat-lux-work article {
          min-height: 340px;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.1);
          background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
        }

        .qyasat-lux-work article div {
          height: 170px;
          margin-bottom: 20px;
          border-radius: 22px;
          background:
            linear-gradient(135deg, rgba(37,244,255,0.22), transparent),
            radial-gradient(circle at 70% 30%, rgba(157,92,255,0.22), transparent 16rem),
            linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.1);
        }

        .qyasat-lux-contact {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 36px;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,0.12);
          background:
            radial-gradient(circle at 12% 20%, rgba(37,244,255,0.14), transparent 24rem),
            radial-gradient(circle at 88% 22%, rgba(157,92,255,0.13), transparent 24rem),
            linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.018));
        }

        .qyasat-lux-contact p {
          max-width: 760px;
          margin-inline: 0;
        }

        @keyframes qyasat-lux-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1040px) {
          .qyasat-lux-header {
            grid-template-columns: 1fr auto;
          }

          .qyasat-lux-nav {
            display: none;
          }

          .qyasat-lux-hero,
          .qyasat-lux-ai,
          .qyasat-lux-estimator-box,
          .qyasat-lux-contact {
            grid-template-columns: 1fr;
          }

          .qyasat-lux-hero {
            min-height: auto;
          }

          .qyasat-lux-visual {
            min-height: 480px;
          }

          .qyasat-lux-grid,
          .qyasat-lux-work-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .qyasat-lux-process {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .qyasat-lux-shell {
            width: min(100% - 22px, 1240px);
            padding-top: 12px;
          }

          .qyasat-lux-header {
            top: 10px;
            padding: 12px;
            border-radius: 20px;
          }

          .qyasat-lux-header-cta {
            min-height: 40px;
            padding: 0 13px;
            font-size: 0.86rem;
          }

          .qyasat-lux-brand small {
            display: none;
          }

          .qyasat-lux-hero {
            padding-top: 52px;
            gap: 26px;
          }

          .qyasat-lux-hero h1 {
            font-size: clamp(2.55rem, 14vw, 4.4rem);
          }

          .qyasat-lux-actions {
            flex-direction: column;
          }

          .qyasat-lux-primary,
          .qyasat-lux-secondary,
          .qyasat-lux-contact a,
          .qyasat-lux-result a {
            width: 100%;
          }

          .qyasat-lux-visual {
            height: 440px;
            min-height: 440px;
            border-radius: 26px;
          }

          .qyasat-lux-neural {
            inset: 74px 50%;
            transform: translateX(50%);
            width: 240px;
            height: 240px;
          }

          [dir="ltr"] .qyasat-lux-neural {
            inset: 74px 50% auto auto;
            transform: translateX(50%);
          }

          .qyasat-lux-code-card {
            width: calc(100% - 40px);
            left: 20px;
            right: 20px;
            top: 24px;
          }

          [dir="ltr"] .qyasat-lux-code-card {
            left: 20px;
            right: 20px;
          }

          .qyasat-lux-insight-card {
            width: calc(100% - 40px);
            right: 20px;
            left: 20px;
            bottom: 20px;
          }

          [dir="ltr"] .qyasat-lux-insight-card {
            right: 20px;
            left: 20px;
          }

          .qyasat-lux-trust {
            margin-bottom: 72px;
            border-radius: 22px;
          }

          .qyasat-lux-grid,
          .qyasat-lux-work-grid,
          .qyasat-lux-process {
            grid-template-columns: 1fr;
          }

          .qyasat-lux-ai,
          .qyasat-lux-contact {
            padding: 24px;
            border-radius: 26px;
          }

          .qyasat-lux-estimator-box {
            padding: 12px;
            border-radius: 26px;
          }

          .qyasat-lux-picker,
          .qyasat-lux-result {
            padding: 20px;
            border-radius: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .qyasat-lux-ring {
            animation: none;
          }

          .qyasat-lux-card,
          .qyasat-lux-nav a,
          .qyasat-lux-picker button {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}

export default QyasatHomePage;
