const paths = [
  {
    label: "01",
    title: "أحتاج حضورًا يقنع",
    text: "موقع أو صفحة بيع تشرح خدمتك بوضوح، تبني ثقة، وتدفع العميل للتواصل.",
    output: "Website / Landing / Profile",
  },
  {
    label: "02",
    title: "أحتاج نظامًا يدير",
    text: "لوحة تحكم لإدارة العملاء، الطلبات، المحتوى، الموظفين، الصلاحيات، والتقارير.",
    output: "Dashboard / CRM / Admin",
  },
  {
    label: "03",
    title: "أحتاج حجزًا أو طلبات",
    text: "رحلة كاملة من اختيار الخدمة إلى الحجز أو الطلب أو الدفع والتنبيه وتتبع الحالة.",
    output: "Booking / Orders / Payments",
  },
  {
    label: "04",
    title: "أحتاج أتمتة وذكاء",
    text: "واتساب، CRM، تذكيرات، ردود، تقارير، ومساعدات ذكية تعمل داخل النظام.",
    output: "Automation / AI Agents",
  },
];

const proof = [
  {
    name: "Barcode Platform",
    type: "Commerce OS",
    text: "طلبات، QR Menu، ولاء، واتساب، ومدفوعات للمقاهي والمطاعم.",
    href: "https://www.barcode.sa",
  },
  {
    name: "ITQAN Workshops",
    type: "Booking Platform",
    text: "حجوزات، شهادات، ماليات، متجر، مستودع، ولوحة إدارة.",
    href: "https://itqanws.com",
  },
  {
    name: "Presence CMS",
    type: "Professional CMS",
    text: "حضور رقمي احترافي مع مدونة، SEO، ونصوص ديناميكية.",
    href: "https://sarah.qyasat.sa",
  },
  {
    name: "Merchant Intelligence",
    type: "BI System",
    text: "لوحة ذكاء أعمال للتجار: مبيعات، كاش باك، وتقارير.",
    href: "https://acc.qyasat.sa",
  },
];

const packages = [
  {
    name: "Presence",
    title: "موقع يقنع",
    points: ["رسالة واضحة", "تصميم راقٍ", "صفحات خدمة", "نموذج تواصل", "SEO أساسي"],
  },
  {
    name: "Operate",
    title: "نظام يدير",
    points: ["لوحة تحكم", "عملاء وطلبات", "صلاحيات", "تقارير", "محتوى ديناميكي"],
  },
  {
    name: "Automate",
    title: "أتمتة تختصر",
    points: ["واتساب", "CRM", "تنبيهات", "ردود", "تدفقات عمل"],
  },
  {
    name: "Scale",
    title: "منصة تنمو",
    points: ["SaaS", "اشتراكات", "فروع", "لغات", "مديولات"],
  },
];

const objections = [
  ["لا أعرف ماذا أحتاج", "هذا طبيعي. أنت تشرح المشكلة، ونحن نحدد هل تحتاج موقعًا، نظامًا، أتمتة، أو منصة."],
  ["أخاف أبدأ بشيء كبير", "نبدأ بنسخة واضحة قابلة للاستخدام، ثم نضيف الخصائص حسب الواقع وليس التخمين."],
  ["هل التصميم وحده يكفي؟", "لا. التصميم يقنع، لكن النظام يدير. لذلك نبني الواجهة والمنطق معًا عندما يحتاج المشروع."],
  ["هل يناسب مشروع غير تقني؟", "نعم. أغلب المشاريع تبدأ بفوضى تشغيلية أو خدمة تحتاج طريقة أوضح للبيع والإدارة."],
];

const method = [
  ["Diagnose", "نفهم ما الذي يحدث اليوم، أين يضيع الوقت، ولماذا العميل لا يقرر."],
  ["Shape", "نحول الكلام إلى خريطة: صفحات، لوحة، بيانات، رسائل، وأتمتة."],
  ["Build", "نبني نسخة تعمل وتُستخدم، وليست مجرد شكل في ملف تصميم."],
  ["Improve", "نطور بناءً على الاستخدام: تقارير، ربط، ذكاء، وتجربة أفضل."],
];

export default function MzPracticeV7Page() {
  return (
    <main className="qyasatv7" dir="rtl" data-version="QYASAT_PRACTICE_BEST_V7">
      <header className="header">
        <a className="brand" href="#top">
          <span>QY</span>
          <strong>Code</strong>
        </a>

        <nav>
          <a href="#paths">الحلول</a>
          <a href="#packages">المسارات</a>
          <a href="#work">الأعمال</a>
          <a href="#contact">ابدأ</a>
        </nav>

        <a className="headerAction" href="#contact">تشخيص مشروعك</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Digital systems for real businesses</p>

          <h1>
            لا تحتاج موقعًا فقط.
            <br />
            تحتاج تجربة تجعل العميل يقرر.
          </h1>

          <p className="lead">
            قياسات يحوّل الخدمة أو الفكرة أو الفوضى التشغيلية إلى حضور رقمي،
            نظام إدارة، أتمتة، أو منصة قابلة للنمو — بلغة يفهمها العميل غير التقني.
          </p>

          <div className="heroActions">
            <a className="primary" href="#contact">اكتب مشكلتك الآن</a>
            <a className="secondary" href="#paths">اختر ما يشبه احتياجك</a>
          </div>

          <div className="trust">
            <span>مواقع تقنع</span>
            <span>أنظمة تدير</span>
            <span>أتمتة تختصر</span>
            <span>AI داخل العمل</span>
          </div>
        </div>

        <aside className="decisionBox">
          <div className="decisionHeader">
            <span>Decision Assistant</span>
            <strong>ابدأ من الألم، لا من التقنية</strong>
          </div>

          <div className="question">
            <small>السؤال الصحيح</small>
            <h2>ما الذي تريد أن يتغير في عملك؟</h2>
          </div>

          <div className="answerList">
            <a href="#contact">
              <span>العميل لا يفهم خدمتي بسرعة</span>
              <strong>نحتاج واجهة ورسالة مقنعة</strong>
            </a>
            <a href="#contact">
              <span>كل شيء عندي يدوي ومتفرق</span>
              <strong>نحتاج نظامًا ولوحة تحكم</strong>
            </a>
            <a href="#contact">
              <span>أتابع العملاء والطلبات بصعوبة</span>
              <strong>نحتاج CRM وأتمتة</strong>
            </a>
          </div>

          <div className="decisionResult">
            <span>النتيجة</span>
            <strong>حل واضح: موقع، نظام، أتمتة، أو منصة — حسب المشكلة.</strong>
          </div>
        </aside>
      </section>

      <section className="message">
        <strong>أفضل واجهة ليست الأجمل فقط.</strong>
        <span>أفضل واجهة هي التي تجعل الزائر يفهم، يثق، ويعرف الخطوة التالية بدون تفكير زائد.</span>
      </section>

      <section className="paths" id="paths">
        <div className="sectionTitle">
          <p>الحلول</p>
          <h2>اختر الجملة الأقرب لمشكلتك.</h2>
        </div>

        <div className="pathGrid">
          {paths.map((item) => (
            <a className="pathCard" href="#contact" key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <em>{item.output}</em>
            </a>
          ))}
        </div>
      </section>

      <section className="packages" id="packages">
        <div className="sectionTitle">
          <p>مسارات البناء</p>
          <h2>نختار المسار المناسب بدل بناء شيء عشوائي.</h2>
        </div>

        <div className="packageGrid">
          {packages.map((item) => (
            <article className="packageCard" key={item.name}>
              <small>{item.name}</small>
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="feature">
        <div className="featureCopy">
          <p>كيف نرفع القرار؟</p>
          <h2>نصمم حول قرار العميل، لا حول ذوق المصمم.</h2>
          <span>
            كل قسم في الواجهة يجب أن يجيب سؤالًا في ذهن الزائر: ماذا تقدمون؟
            هل تفهمون مشكلتي؟ هل لديكم أعمال؟ ما الخطوة التالية؟
          </span>
        </div>

        <div className="featurePanel">
          <div>
            <small>Before</small>
            <strong>زائر محتار، خدمة غير واضحة، ومتابعة يدوية.</strong>
          </div>
          <div>
            <small>After</small>
            <strong>رسالة واضحة، مسار قرار، نظام يدير، وطلب تواصل أسهل.</strong>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="sectionTitle">
          <p>أعمال مختارة</p>
          <h2>منتجات وأنظمة حقيقية تثبت القدرة.</h2>
        </div>

        <div className="workGrid">
          {proof.map((item) => (
            <a className="workCard" href={item.href} target="_blank" rel="noreferrer" key={item.name}>
              <small>{item.type}</small>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <strong>فتح المشروع</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="method">
        <div className="methodInner">
          <div className="methodTitle">
            <p>المنهجية</p>
            <h2>من مشكلة غير مرتبة إلى منتج قابل للاستخدام.</h2>
          </div>

          <div className="methodGrid">
            {method.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="objections">
        <div className="sectionTitle">
          <p>قبل أن تبدأ</p>
          <h2>أسئلة تمنع كثير من الناس من اتخاذ القرار.</h2>
        </div>

        <div className="objectionList">
          {objections.map(([q, a]) => (
            <article key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contactCopy">
          <p>ابدأ بتشخيص بسيط</p>
          <h2>اكتب مشكلتك كما هي. نحن نرتبها تقنيًا.</h2>
          <span>
            لا تحتاج ملف متطلبات. اكتب ما يحدث في عملك، وسنحوّله إلى تصور واضح:
            موقع، نظام، أتمتة، ذكاء اصطناعي، أو منصة.
          </span>
        </div>

        <form className="contactForm">
          <input placeholder="اسمك" />
          <input placeholder="رقم الجوال أو الإيميل" />
          <select defaultValue="">
            <option value="" disabled>ما الأقرب لاحتياجك؟</option>
            <option>موقع يقنع العملاء</option>
            <option>لوحة تحكم أو نظام داخلي</option>
            <option>حجوزات أو طلبات</option>
            <option>أتمتة واتساب وCRM</option>
            <option>ذكاء اصطناعي داخل العمل</option>
            <option>منصة SaaS كاملة</option>
            <option>لا أعرف، أحتاج توجيه</option>
          </select>
          <textarea placeholder="اكتب المشكلة أو الفكرة بكلام عادي..." />
          <button type="button">إرسال للتشخيص</button>
        </form>
      </section>

      <a className="floatingCta" href="#contact">ابدأ مشروعك</a>

      <footer className="footer">
        <strong>قياسات</strong>
        <span>Websites · Systems · Automation · AI · SaaS</span>
      </footer>

      <style>{`
        .qyasatv7 {
          min-height: 100vh;
          color: #25211c;
          background:
            radial-gradient(circle at 14% 8%, rgba(183, 148, 101, .12), transparent 30rem),
            radial-gradient(circle at 88% 12%, rgba(91, 123, 112, .12), transparent 28rem),
            linear-gradient(180deg, #fbf8f1 0%, #fffdf8 40%, #f6f1e8 100%);
          font-family: "IBM Plex Sans Arabic", "Tajawal", "Segoe UI", system-ui, sans-serif;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .qyasatv7 * {
          box-sizing: border-box;
        }

        .qyasatv7 a {
          color: inherit;
        }

        .header {
          position: fixed;
          top: 20px;
          left: 50%;
          z-index: 60;
          width: min(1180px, calc(100% - 32px));
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 18px;
          padding: 12px;
          border: 1px solid rgba(37, 33, 28, .08);
          border-radius: 28px;
          background: rgba(255, 253, 248, .78);
          backdrop-filter: blur(28px);
          box-shadow: 0 18px 60px rgba(55, 48, 40, .08);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand span {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 16px;
          color: #fbf8f1;
          background: #25211c;
          font-weight: 800;
          letter-spacing: -.06em;
        }

        .brand strong {
          font-size: 18px;
          font-weight: 720;
          letter-spacing: -.02em;
        }

        .header nav {
          display: flex;
          justify-content: center;
          gap: 4px;
        }

        .header nav a {
          padding: 10px 13px;
          border-radius: 15px;
          color: #70675d;
          text-decoration: none;
          font-size: 14px;
        }

        .header nav a:hover {
          color: #25211c;
          background: rgba(37, 33, 28, .055);
        }

        .headerAction,
        .floatingCta {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          border-radius: 15px;
          color: #fbf8f1;
          text-decoration: none;
          background: #25211c;
          font-size: 14px;
          font-weight: 720;
        }

        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr);
          gap: 54px;
          align-items: center;
          padding: 144px 6vw 86px;
        }

        .eyebrow,
        .sectionTitle p,
        .featureCopy p,
        .methodTitle p,
        .contactCopy p {
          margin: 0 0 18px;
          color: #8b6f47;
          font-size: 13px;
          font-weight: 760;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          max-width: 980px;
          margin-bottom: 28px;
          font-size: clamp(44px, 7.2vw, 94px);
          line-height: 1.04;
          font-weight: 680;
          letter-spacing: -.048em;
        }

        .lead {
          max-width: 760px;
          color: #6b6258;
          font-size: clamp(18px, 2vw, 23px);
          line-height: 1.95;
        }

        .heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 34px;
        }

        .heroActions a,
        .contactForm button {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          border-radius: 18px;
          text-decoration: none;
          font-weight: 740;
          transition: transform .22s ease, box-shadow .22s ease, background .22s ease;
        }

        .primary,
        .contactForm button {
          color: #fbf8f1;
          background: #25211c;
          box-shadow: 0 14px 34px rgba(37, 33, 28, .15);
        }

        .secondary {
          color: #25211c;
          border: 1px solid rgba(37, 33, 28, .1);
          background: rgba(255,255,255,.62);
        }

        .heroActions a:hover,
        .contactForm button:hover,
        .headerAction:hover,
        .floatingCta:hover {
          transform: translateY(-3px);
        }

        .trust {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 34px;
        }

        .trust span {
          padding: 9px 12px;
          border: 1px solid rgba(37, 33, 28, .08);
          border-radius: 999px;
          color: #655d54;
          background: rgba(255,255,255,.54);
          font-size: 13px;
        }

        .decisionBox {
          padding: 34px;
          border: 1px solid rgba(37, 33, 28, .08);
          border-radius: 40px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.86), rgba(255,255,255,.58)),
            rgba(255,255,255,.76);
          box-shadow: 0 30px 90px rgba(55, 48, 40, .11);
        }

        .decisionHeader {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 30px;
          color: #8b6f47;
          font-size: 13px;
          font-weight: 760;
        }

        .question small,
        .decisionResult span {
          display: block;
          margin-bottom: 10px;
          color: #8b6f47;
          font-weight: 760;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .question h2 {
          margin-bottom: 24px;
          font-size: clamp(32px, 4vw, 54px);
          line-height: 1.12;
          font-weight: 680;
          letter-spacing: -.035em;
        }

        .answerList {
          display: grid;
          gap: 10px;
        }

        .answerList a {
          display: block;
          padding: 18px;
          border: 1px solid rgba(37, 33, 28, .08);
          border-radius: 22px;
          text-decoration: none;
          background: rgba(255,255,255,.68);
          transition: transform .22s ease, background .22s ease;
        }

        .answerList a:hover {
          transform: translateY(-3px);
          background: #fff;
        }

        .answerList span {
          display: block;
          margin-bottom: 8px;
          color: #766d63;
          line-height: 1.65;
        }

        .answerList strong {
          color: #25211c;
          line-height: 1.65;
        }

        .decisionResult {
          margin-top: 16px;
          padding: 20px;
          border-radius: 24px;
          color: #fbf8f1;
          background: #25211c;
        }

        .decisionResult strong {
          line-height: 1.7;
        }

        .message {
          display: grid;
          grid-template-columns: .55fr 1fr;
          gap: 20px;
          align-items: center;
          margin: 0 6vw;
          padding: 24px 28px;
          border: 1px solid rgba(37, 33, 28, .08);
          border-radius: 30px;
          color: #fbf8f1;
          background: #25211c;
          box-shadow: 0 20px 60px rgba(37, 33, 28, .14);
        }

        .message strong {
          font-size: 25px;
          font-weight: 680;
          letter-spacing: -.025em;
        }

        .message span {
          color: rgba(251, 248, 241, .78);
          line-height: 1.85;
        }

        .paths,
        .packages,
        .feature,
        .work,
        .method,
        .objections,
        .contact {
          padding: 108px 6vw;
        }

        .sectionTitle {
          max-width: 840px;
          margin-bottom: 42px;
        }

        .sectionTitle h2,
        .featureCopy h2,
        .methodTitle h2,
        .contactCopy h2 {
          margin-bottom: 0;
          font-size: clamp(34px, 5vw, 68px);
          line-height: 1.12;
          font-weight: 680;
          letter-spacing: -.04em;
        }

        .pathGrid,
        .packageGrid,
        .workGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .pathCard,
        .packageCard,
        .workCard,
        .objectionList article {
          border: 1px solid rgba(37, 33, 28, .08);
          border-radius: 30px;
          background: rgba(255,255,255,.62);
          box-shadow: 0 14px 40px rgba(55, 48, 40, .055);
        }

        .pathCard,
        .workCard {
          min-height: 330px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          text-decoration: none;
          transition: transform .22s ease, background .22s ease, box-shadow .22s ease;
        }

        .pathCard:hover,
        .workCard:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,.94);
          box-shadow: 0 24px 70px rgba(55, 48, 40, .1);
        }

        .pathCard > span,
        .workCard small,
        .packageCard small {
          color: #8b6f47;
          font-weight: 760;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .pathCard h3,
        .packageCard h3,
        .workCard h3 {
          margin: 26px 0 12px;
          font-size: 27px;
          line-height: 1.22;
          font-weight: 680;
          letter-spacing: -.025em;
        }

        .pathCard p,
        .workCard p,
        .packageCard li,
        .objectionList p {
          color: #70675d;
          line-height: 1.82;
        }

        .pathCard em,
        .workCard strong {
          margin-top: auto;
          color: #8b6f47;
          font-style: normal;
          font-weight: 760;
        }

        .packages,
        .feature,
        .contact {
          background: #fffaf2;
          border-block: 1px solid rgba(37, 33, 28, .06);
        }

        .packageCard {
          min-height: 300px;
          padding: 24px;
        }

        .packageCard ul {
          display: grid;
          gap: 10px;
          margin: 20px 0 0;
          padding: 0;
          list-style: none;
        }

        .packageCard li:before {
          content: "— ";
          color: #8b6f47;
        }

        .feature {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 48px;
          align-items: center;
        }

        .featureCopy span,
        .contactCopy span {
          display: block;
          margin-top: 22px;
          color: #6b6258;
          font-size: 18px;
          line-height: 1.9;
        }

        .featurePanel {
          display: grid;
          gap: 14px;
        }

        .featurePanel div {
          padding: 28px;
          border-radius: 30px;
        }

        .featurePanel div:first-child {
          border: 1px solid rgba(37, 33, 28, .08);
          background: rgba(255,255,255,.7);
        }

        .featurePanel div:last-child {
          color: #fbf8f1;
          background: #25211c;
        }

        .featurePanel small {
          display: block;
          margin-bottom: 12px;
          color: #8b6f47;
          font-weight: 760;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .featurePanel div:last-child small {
          color: #d8c3a4;
        }

        .featurePanel strong {
          font-size: 25px;
          line-height: 1.55;
          font-weight: 680;
        }

        .method {
          background: #25211c;
        }

        .methodInner {
          padding: 44px;
          border-radius: 40px;
          color: #fbf8f1;
          background:
            radial-gradient(circle at 12% 0%, rgba(183, 148, 101, .22), transparent 28rem),
            #322d26;
        }

        .methodTitle p {
          color: #d8c3a4;
        }

        .methodGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-top: 38px;
        }

        .methodGrid article {
          padding: 24px;
          border: 1px solid rgba(251, 248, 241, .1);
          border-radius: 28px;
          background: rgba(255,255,255,.045);
        }

        .methodGrid span {
          color: #d8c3a4;
          font-weight: 760;
        }

        .methodGrid h3 {
          margin: 22px 0 10px;
          font-size: 23px;
          font-weight: 680;
        }

        .methodGrid p {
          margin-bottom: 0;
          color: rgba(251,248,241,.72);
          line-height: 1.85;
        }

        .objectionList {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .objectionList article {
          padding: 26px;
        }

        .objectionList h3 {
          margin-bottom: 12px;
          font-size: 24px;
          font-weight: 680;
          letter-spacing: -.025em;
        }

        .objectionList p {
          margin-bottom: 0;
        }

        .contact {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 48px;
          align-items: start;
        }

        .contactForm {
          display: grid;
          gap: 12px;
          padding: 26px;
          border: 1px solid rgba(37, 33, 28, .08);
          border-radius: 36px;
          background: rgba(255,255,255,.78);
          box-shadow: 0 24px 80px rgba(55, 48, 40, .1);
        }

        .contactForm input,
        .contactForm select,
        .contactForm textarea {
          width: 100%;
          min-height: 56px;
          border: 1px solid rgba(37, 33, 28, .12);
          border-radius: 18px;
          padding: 15px 17px;
          color: #25211c;
          background: #fff;
          outline: none;
          font: inherit;
        }

        .contactForm textarea {
          min-height: 150px;
          resize: vertical;
        }

        .contactForm button {
          border: 0;
          cursor: pointer;
          font: inherit;
        }

        .floatingCta {
          position: fixed;
          left: 22px;
          bottom: 22px;
          z-index: 70;
          box-shadow: 0 16px 40px rgba(37, 33, 28, .18);
        }

        .footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 30px 6vw;
          color: rgba(251,248,241,.68);
          background: #25211c;
        }

        .footer strong {
          color: #fbf8f1;
        }

        @media (max-width: 1120px) {
          .hero,
          .message,
          .feature,
          .contact {
            grid-template-columns: 1fr;
          }

          .pathGrid,
          .packageGrid,
          .workGrid,
          .methodGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .header {
            top: 12px;
            grid-template-columns: 1fr auto;
            border-radius: 22px;
          }

          .header nav {
            display: none;
          }

          .headerAction {
            min-height: 38px;
            padding-inline: 12px;
          }

          .hero {
            min-height: auto;
            grid-template-columns: 1fr;
            padding: 116px 20px 68px;
          }

          h1 {
            font-size: 43px;
          }

          .decisionBox {
            padding: 24px;
            border-radius: 30px;
          }

          .message {
            margin-inline: 20px;
          }

          .paths,
          .packages,
          .feature,
          .work,
          .method,
          .objections,
          .contact {
            padding: 76px 20px;
          }

          .pathGrid,
          .packageGrid,
          .workGrid,
          .methodGrid,
          .objectionList {
            grid-template-columns: 1fr;
          }

          .methodInner {
            padding: 28px;
            border-radius: 30px;
          }

          .floatingCta {
            left: 16px;
            right: 16px;
            bottom: 14px;
            width: auto;
          }

          .footer {
            flex-direction: column;
            padding: 30px 20px 84px;
          }
        }
      `}</style>
    </main>
  );
}
