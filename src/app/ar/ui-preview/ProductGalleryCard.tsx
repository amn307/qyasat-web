"use client";

import { useEffect, useState } from "react";

const products = [
  {
    title: "Barcode Platform",
    subtitle: "منصة طلبات، نقاط، دفع، ولوحة إدارة",
    href: "https://www.barcode.sa",
    image: "/showcase/barcode-platform.svg",
    tag: "Commerce",
  },
  {
    title: "ITQAN Workshops",
    subtitle: "منصة ورش، تسجيل، محتوى، وتجربة مستخدم",
    href: "https://itqanws.com",
    image: "/showcase/itqan-workshops.svg",
    tag: "Workshops",
  },
  {
    title: "Presence CMS",
    subtitle: "موقع شخصي ديناميكي ولوحة تحكم للمحتوى",
    href: "https://sarah.qyasat.sa",
    image: "/showcase/presence-cms.svg",
    tag: "CMS",
  },
  {
    title: "SCH Planner",
    subtitle: "إدارة محتوى، مراحل عمل، واعتمادات",
    href: "https://sch.qyasat.sa",
    image: "/showcase/sch-planner.svg",
    tag: "Operations",
  },
];

export default function ProductGalleryCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <a
        href={activeProduct.href}
        target="_blank"
        rel="noreferrer"
        className="group block overflow-hidden rounded-[2.5rem] border border-[#17120c]/10 bg-[#17120c] p-4 text-white shadow-2xl transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(23,18,12,0.28)]"
        aria-label={`فتح مشروع ${activeProduct.title}`}
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-[#f6f0e7]">
          <img
            key={activeProduct.image}
            src={activeProduct.image}
            alt={activeProduct.title}
            className="aspect-[1.42] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#17120c]/85 px-4 py-2 text-xs font-black text-white backdrop-blur">
              {activeProduct.tag}
            </span>
            <span className="rounded-full bg-[#d8b579] px-4 py-2 text-xs font-black text-[#17120c]">
              عرض المشروع
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black text-[#d8b579]">منتج تقني منجز</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.035em]">
                {activeProduct.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/55">
                {activeProduct.subtitle}
              </p>
            </div>

            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-xl transition group-hover:bg-white group-hover:text-[#17120c] sm:flex">
              ↗
            </span>
          </div>
        </div>
      </a>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {products.map((product, index) => (
          <button
            key={product.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition ${
              index === activeIndex ? "bg-[#d8b579]" : "bg-[#17120c]/18 hover:bg-[#17120c]/35"
            }`}
            aria-label={`عرض ${product.title}`}
          />
        ))}
      </div>
    </div>
  );
}
