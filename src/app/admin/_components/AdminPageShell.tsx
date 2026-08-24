"use client";

import Link from "next/link";
import { ReactNode } from "react";

type AdminPageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  dir?: "rtl" | "ltr";
  compact?: boolean;
};

const navItems = [
  { href: "/admin", label: "الرئيسية", tag: "Home" },
  { href: "/admin/blog", label: "المدونة", tag: "Blog" },
  { href: "/admin/message-writer", label: "مساعد الرسائل", tag: "AI" },
  { href: "/admin/site-texts", label: "نصوص الموقع", tag: "Texts" },
  { href: "/ar", label: "الموقع", tag: "Live" },
];

export default function AdminPageShell({
  eyebrow = "Qyasat CMS Admin",
  title,
  description,
  children,
  actions,
  dir = "rtl",
  compact = false,
}: AdminPageShellProps) {
  return (
    <main dir={dir} className="min-h-screen bg-[#f7f4ee] text-[#17130f]">
      <div className="mx-auto max-w-7xl px-5 py-5 md:px-8 md:py-8 lg:px-10">
        <nav className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.8rem] border border-black/10 bg-white/70 p-3 shadow-sm backdrop-blur">
          <Link href="/admin" className="flex items-center gap-3 rounded-full px-3 py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17130f] text-sm font-black text-white">
              QY
            </span>
            <span>
              <span className="block text-sm font-black">قياسات</span>
              <span className="block text-xs font-bold text-[#6b6258]">Control Center</span>
            </span>
          </Link>

          <div className="flex max-w-full gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black text-[#3d352e] transition hover:-translate-y-0.5 hover:bg-[#17130f] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <section className="mb-6 overflow-hidden rounded-[2.5rem] bg-[#17130f] p-7 text-white shadow-2xl md:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#d9b678]" />
                {eyebrow}
              </div>

              <h1 className={`${compact ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl"} max-w-4xl font-black leading-[1.12] tracking-[-0.04em]`}>
                {title}
              </h1>

              {description ? (
                <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/60 md:text-lg">
                  {description}
                </p>
              ) : null}
            </div>

            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </section>

        {children}
      </div>
    </main>
  );
}
