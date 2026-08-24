import Link from "next/link";

const quickActions = [
  {
    title: "إدارة الرئيسية",
    description: "عدّل الهيرو، الخدمات، آلية العمل، الأعمال، والتواصل من مكان واحد.",
    href: "/admin/home",
    eyebrow: "Homepage",
    icon: "01",
  },
  {
    title: "الميديا",
    description: "ارفع الشعارات والصور وملفات الواجهة واستخدم الروابط مباشرة.",
    href: "/admin/media",
    eyebrow: "Assets",
    icon: "02",
  },
  {
    title: "الخدمات",
    description: "أضف وعدّل الخدمات بالعربي والإنجليزي مع الصور والترتيب.",
    href: "/admin/services",
    eyebrow: "Services",
    icon: "03",
  },
  {
    title: "SEO و Pixels",
    description: "اضبط الظهور في البحث وأكواد التتبع والتحويلات.",
    href: "/admin/seo",
    eyebrow: "Growth",
    icon: "04",
  },
];

const systemCards = [
  {
    title: "الموقع العام",
    value: "AR / EN",
    description: "الواجهة العامة تعمل بلغتين مع محتوى مستقل لكل لغة.",
  },
  {
    title: "لوحة التحكم",
    value: "Admin",
    description: "إدارة المحتوى، الإعدادات، الرسائل، والخدمات من مكان واحد.",
  },
  {
    title: "الهوية",
    value: "Qyasat",
    description: "تنظيف بقايا MZ Code واعتماد هوية قياسات في النصوص والروابط.",
  },
];

const workFlow = [
  "راجع الصفحة الرئيسية",
  "ارفع الصور والشعار",
  "عدّل الخدمات وSEO",
  "افتح المعاينة قبل النشر",
];

export const metadata = {
  title: "Qyasat CMS Admin",
  description: "Qyasat CMS administration dashboard.",
};

export default function AdminDashboardPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f6f3ed] p-5 text-[#17130f] md:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2.4rem] border border-black/10 bg-[#111827] p-7 text-white shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-white/45">
                Qyasat CMS
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.12] tracking-[-0.04em] md:text-6xl">
                مركز تحكم مرتب لإدارة الموقع والمحتوى والنمو
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                هذه اللوحة تجمع أهم أدوات قياسات: الصفحة الرئيسية، الميديا، الخدمات، SEO، الرسائل، والهوية في واجهة واحدة واضحة.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/40">
                Quick Status
              </p>
              <div className="mt-5 grid gap-3">
                {systemCards.map((card) => (
                  <div key={card.title} className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-black text-white/70">{card.title}</span>
                      <b className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111827]">
                        {card.value}
                      </b>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/50">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#9a7848]">
                  {item.eyebrow}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17130f] text-sm font-black text-white transition group-hover:rotate-12">
                  {item.icon}
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-[-0.03em]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#5d5348]">{item.description}</p>
            </Link>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-black text-[#9a7848]">أفضل مسار الآن</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">
              ثبّت المحتوى واللغة قبل إضافة أي موديولات جديدة
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5d5348]">
              الأولوية الحالية هي تنظيف النصوص، ضبط النسخة الإنجليزية، وترتيب لوحة التحكم حتى تكون جاهزة للتوسع.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/ar" className="rounded-full bg-[#17130f] px-5 py-3 text-sm font-black text-white">
                معاينة العربي
              </Link>
              <Link href="/en" className="rounded-full border border-black/10 px-5 py-3 text-sm font-black text-[#17130f]">
                معاينة الإنجليزي
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#17130f] p-6 text-white shadow-sm">
            <p className="text-sm font-black text-white/45">خطوات التشغيل</p>
            <div className="mt-5 space-y-3">
              {workFlow.map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-black text-[#17130f]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
