import Link from "next/link";
import { AdminAuthGate } from "@/components/admin/admin-auth-gate";
import { AdminLanguageSwitch } from "@/components/admin/admin-language-switch";

const nav = [
  { href: "/admin", label: "الرئيسية" },
  { href: "/admin/theme", label: "الثيم والستايل" },
  { href: "/admin/settings", label: "الإعدادات" },
  { href: "/admin/account", label: "حساب الإدارة" },
  { href: "/admin/home", label: "نصوص الرئيسية" },
  { href: "/admin/projects", label: "المشاريع" },
  { href: "/admin/media", label: "الميديا" },
  { href: "/admin/services", label: "الخدمات" },
  { href: "/admin/blog", label: "البلوق" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/pixels", label: "Pixels" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/messages", label: "الرسائل" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main dir="rtl" data-admin-root="true" className="min-h-screen bg-slate-100 text-slate-950">
      <AdminLanguageSwitch />
      <aside className="fixed inset-y-0 right-0 hidden w-72 overflow-y-auto border-l border-slate-200 bg-white p-6 pb-40 lg:block">
        <Link href="/admin" className="block text-2xl font-black">
          قياسات
        </Link>
        <p className="mt-2 text-sm text-slate-500">لوحة التحكم</p>

        <nav className="mt-8 grid gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="fixed bottom-6 right-6 grid w-60 gap-2 bg-white pt-2">
          <Link
            href="/admin/login"
            className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-700"
          >
            تبديل الحساب
          </Link>
          <Link
            href="/admin/login?logout=1"
            className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600"
          >
            خروج
          </Link>
        </div>
      </aside>

      <section className="min-h-screen lg:mr-72">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="font-black">إدارة موقع qyasat.sa</div>
            <div className="text-xs font-bold text-slate-500">moamen</div>
          </div>
        </header>

        <AdminAuthGate>
          <div className="p-6">{children}</div>
        </AdminAuthGate>
      </section>
    </main>
  );
}
