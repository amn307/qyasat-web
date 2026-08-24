import Link from "next/link";
import ProductShowcase from "./ProductShowcase";

export const metadata = {
  title: "قياسات | Premium UI Direction",
  description: "تصميم معاينة مختلف جذريًا لواجهة قياسات.",
};

const services = [
  ["01", "منصات رقمية", "مواقع، بوابات، SaaS، ومتاجر تتحول إلى أنظمة قابلة للإدارة والنمو."],
  ["02", "لوحات تحكم", "إدارة محتوى، عملاء، خدمات، تقارير، صلاحيات، وتشغيل يومي واضح."],
  ["03", "أتمتة وAI", "وكلاء، رسائل، تدفقات عمل، وتحليل بيانات يختصر الجهد ويرفع الجودة."],
  ["04", "SEO ونمو", "بنية فهرسة، محتوى قابل للتوسع، بيانات منظمة، وتحسين مستمر."],
];

const systems = [
  "Barcode Platform",
  "ITQAN Workshops",
  "Presence CMS",
  "SCH Planner",
  "Merchant Intelligence",
  "PRMS",
  "MoSense",
  "ArrowMaze",
];

const method = [
  "نبدأ من تموضع المشروع والرسالة وليس من شكل السكشن.",
  "نصمم مسار قرار واضح للزائر من أول شاشة.",
  "نحوّل الواجهة إلى نظام قابل للإدارة من لوحة تحكم.",
  "نربط الأعمال، البيانات، SEO، والأتمتة في تجربة واحدة.",
];

export default function PremiumUiDirectionPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f4efe6] text-[#11100d]">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full bg-[#0b0b09] lg:w-[58%]" />
        <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-[#d8b579] lg:block" />

        <div className="relative mx-auto grid min-h-screen max-w-[1560px] gap-8 px-5 py-5 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
          <div className="order-2 flex items-center lg:order-1">
            <ProductShowcase />
          </div>

          <div className="order-1 flex min-h-[70vh] flex-col justify-between rounded-[3rem] border border-white/10 bg-[#11100d]/70 p-7 text-white backdrop-blur md:p-10 lg:order-2 lg:min-h-[calc(100vh-4rem)]">
            <header className="flex items-center justify-between gap-4">
              <Link href="/ar" className="text-2xl font-black tracking-[-0.05em]">
                قياسات
              </Link>

              <nav className="hidden items-center gap-7 text-sm font-bold text-white/55 md:flex">
                <a href="#work">الأعمال</a>
                <a href="#services">الخدمات</a>
                <a href="#method">المنهجية</a>
              </nav>

              <Link
                href="#contact"
                className="rounded-full bg-[#d8b579] px-5 py-3 text-sm font-black text-[#11100d]"
              >
                ابدأ
              </Link>
            </header>

            <div className="py-14 lg:py-0">
              <p className="mb-7 w-fit rounded-full border border-[#d8b579]/20 bg-[#d8b579]/10 px-4 py-2 text-sm font-black text-[#d8b579]">
                Luxury Software Studio
              </p>

              <h1 className="max-w-5xl text-6xl font-black leading-[0.95] tracking-[-0.075em] md:text-8xl xl:text-9xl">
                نبني أنظمة رقمية فاخرة لا صفحات عادية
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-white/62 md:text-xl">
                قياسات تحول الفكرة إلى منصة: واجهة تبيع الثقة، معرض أعمال حقيقي، لوحة تحكم، أتمتة، وSEO يخدم النمو.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#work"
                  className="rounded-full bg-white px-8 py-4 text-center text-sm font-black text-[#11100d]"
                >
                  شاهد المنتجات
                </Link>
                <Link
                  href="#services"
                  className="rounded-full border border-white/15 px-8 py-4 text-center text-sm font-black text-white"
                >
                  ماذا نبني؟
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {["Strategy", "UX", "Systems", "Growth"].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs font-black text-[#d8b579]">QY</p>
                  <p className="mt-3 text-sm font-black text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="overflow-hidden bg-[#11100d] py-10 text-white">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-4 px-4">
          {[...systems, ...systems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-2xl font-black tracking-[-0.04em] text-white/80"
            >
              {item}
            </span>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(50%); }
          }
        `}</style>
      </section>

      <section id="services" className="px-5 py-24 md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black text-[#936934]">الخدمات</p>
            <h2 className="mt-5 text-5xl font-black leading-[1.02] tracking-[-0.065em] md:text-7xl">
              نختصر العرض إلى أربع قدرات ثقيلة
            </h2>
          </div>

          <div className="divide-y divide-[#11100d]/10 border-y border-[#11100d]/10">
            {services.map(([number, title, desc]) => (
              <article key={title} className="grid gap-5 py-9 md:grid-cols-[5rem_1fr]">
                <span className="text-sm font-black text-[#936934]">{number}</span>
                <div>
                  <h3 className="text-4xl font-black tracking-[-0.055em]">{title}</h3>
                  <p className="mt-4 max-w-3xl text-lg leading-9 text-[#6b5741]">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="bg-[#d8b579] px-5 py-24 text-[#11100d] md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-black text-[#6d4b17]">المنهجية</p>
            <h2 className="mt-5 text-5xl font-black leading-[1.02] tracking-[-0.065em] md:text-7xl">
              الفخامة ليست زخرفة. الفخامة هي وضوح القرار.
            </h2>
          </div>

          <div className="space-y-4">
            {method.map((item, index) => (
              <div key={item} className="grid grid-cols-[4rem_1fr] gap-5 rounded-[2rem] bg-[#11100d] p-6 text-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8b579] text-sm font-black text-[#11100d]">
                  {index + 1}
                </span>
                <p className="text-xl font-black leading-9">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#11100d] px-5 py-24 text-white md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#d8b579]">Next</p>
          <h2 className="mt-5 max-w-5xl text-5xl font-black leading-[1.02] tracking-[-0.07em] md:text-8xl">
            هذا هو الفرق الحقيقي عن النسخ السابقة
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/60">
            لو هذا الاتجاه صار أقرب، بعدها ننقله إلى `/ar` ونربطه بلوحة التحكم بالألوان والمعرض والمحتوى.
          </p>
        </div>
      </section>
    </main>
  );
}
