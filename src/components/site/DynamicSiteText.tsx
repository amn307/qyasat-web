"use client";

import { type ElementType, useEffect, useMemo, useState } from "react";

type DynamicSiteTextProps = {
  textKey: string;
  fallback: string;
  locale?: "ar" | "en";
  as?: ElementType;
  className?: string;
};

const dictionaryCache: Record<string, Record<string, string>> = {};

function getBrowserLocale() {
  if (typeof window === "undefined") return "ar";
  return window.location.pathname.startsWith("/en") ? "en" : "ar";
}

export default function DynamicSiteText({
  textKey,
  fallback,
  locale,
  as,
  className,
}: DynamicSiteTextProps) {
  const resolvedLocale = useMemo(() => locale || getBrowserLocale(), [locale]);
  const [value, setValue] = useState(fallback);
  const Tag = (as || "span") as ElementType;

  useEffect(() => {
    let active = true;

    async function loadText() {
      try {
        if (dictionaryCache[resolvedLocale]) {
          if (active) setValue(dictionaryCache[resolvedLocale][textKey] || fallback);
          return;
        }

        const response = await fetch(`/api/site-texts?locale=${resolvedLocale}`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (data?.ok && data.dictionary) {
          dictionaryCache[resolvedLocale] = data.dictionary;
          if (active) setValue(data.dictionary[textKey] || fallback);
        }
      } catch {
        if (active) setValue(fallback);
      }
    }

    loadText();

    return () => {
      active = false;
    };
  }, [fallback, resolvedLocale, textKey]);

  return (
    <Tag className={className} data-site-text={textKey} suppressHydrationWarning>
      {value}
    </Tag>
  );
}
