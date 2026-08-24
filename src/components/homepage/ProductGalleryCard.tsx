"use client";

import { useEffect, useState } from "react";
import type { HomepageShowcaseItem } from "../../lib/homepage-store";

export default function ProductGalleryCard({ products }: { products: HomepageShowcaseItem[] }) {
  const safeProducts = products.length > 0 ? products : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = safeProducts[activeIndex];

  useEffect(() => {
    if (safeProducts.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeProducts.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [safeProducts.length]);

  if (!activeProduct) {
    return null;
  }

  return (
    <div className="w-full">
      <a
        href={activeProduct.href}
        target="_blank"
        rel="noreferrer"
        className="group block overflow-hidden rounded-[2.5rem] p-4 shadow-2xl transition hover:-translate-y-1"
        style={{
          backgroundColor: "var(--home-dark)",
          color: "var(--home-light)",
        }}
        aria-label={`فتح مشروع ${activeProduct.title}`}
      >
        <div
          className="relative overflow-hidden rounded-[2rem]"
          style={{ backgroundColor: "var(--home-background)" }}
        >
          <img
            key={activeProduct.image}
            src={activeProduct.image}
            alt={activeProduct.title}
            className="aspect-[1.42] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <span
              className="rounded-full px-4 py-2 text-xs font-black backdrop-blur"
              style={{
                backgroundColor: "color-mix(in srgb, var(--home-dark) 85%, transparent)",
                color: "var(--home-light)",
              }}
            >
              {activeProduct.tag}
            </span>
            <span
              className="rounded-full px-4 py-2 text-xs font-black"
              style={{
                backgroundColor: "var(--home-accent)",
                color: "var(--home-dark)",
              }}
            >
              عرض المشروع
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black" style={{ color: "var(--home-accent)" }}>
                منتج تقني منجز
              </p>
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

      <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${safeProducts.length}, minmax(0, 1fr))` }}>
        {safeProducts.map((product, index) => (
          <button
            key={product.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="h-2 rounded-full transition"
            style={{
              backgroundColor: index === activeIndex ? "var(--home-accent)" : "color-mix(in srgb, var(--home-dark) 18%, transparent)",
            }}
            aria-label={`عرض ${product.title}`}
          />
        ))}
      </div>
    </div>
  );
}
