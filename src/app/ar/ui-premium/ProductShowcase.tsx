"use client";

import { useEffect, useState } from "react";

const products = [
  {
    title: "Barcode",
    fullTitle: "Barcode Platform",
    type: "Commerce System",
    href: "https://www.barcode.sa",
    image: "/showcase/barcode-platform.svg",
  },
  {
    title: "ITQAN",
    fullTitle: "ITQAN Workshops",
    type: "Workshops Platform",
    href: "https://itqanws.com",
    image: "/showcase/itqan-workshops.svg",
  },
  {
    title: "Presence",
    fullTitle: "Presence CMS",
    type: "Dynamic Website CMS",
    href: "https://sarah.qyasat.sa",
    image: "/showcase/presence-cms.svg",
  },
  {
    title: "SCH",
    fullTitle: "SCH Planner",
    type: "Workflow System",
    href: "https://sch.qyasat.sa",
    image: "/showcase/sch-planner.svg",
  },
  {
    title: "MI",
    fullTitle: "Merchant Intelligence",
    type: "Analytics Dashboard",
    href: "https://acc.qyasat.sa",
    image: "/showcase/merchant-intelligence.svg",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const product = products[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % products.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-full min-h-[680px] overflow-hidden rounded-[3rem] bg-[#11100d] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className="group relative block h-full overflow-hidden rounded-[2.5rem] bg-[#f4efe6]"
      >
        <img
          key={product.image}
          src={product.image}
          alt={product.fullTitle}
          className="h-full min-h-[620px] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#11100d] via-[#11100d]/20 to-transparent" />

        <div className="absolute bottom-0 right-0 left-0 p-7 text-white">
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="rounded-full bg-[#d8b579] px-4 py-2 text-xs font-black text-[#11100d]">
              {product.type}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl backdrop-blur transition group-hover:bg-white group-hover:text-[#11100d]">
              ↗
            </span>
          </div>

          <p className="text-sm font-black text-[#d8b579]">منتج تقني منجز</p>
          <h2 className="mt-2 text-5xl font-black tracking-[-0.06em]">
            {product.fullTitle}
          </h2>
        </div>
      </a>

      <div className="absolute top-7 right-7 left-7 flex items-center justify-between gap-3">
        {products.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(index)}
            className={`rounded-full px-4 py-2 text-xs font-black transition ${
              index === active
                ? "bg-[#d8b579] text-[#11100d]"
                : "bg-[#11100d]/55 text-white/70 backdrop-blur hover:bg-[#11100d]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </section>
  );
}
