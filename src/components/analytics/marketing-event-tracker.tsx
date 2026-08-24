"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { TrackingSettings } from "@/lib/analytics/types";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    ttq?: { page?: () => void; track?: (event: string, payload?: Record<string, unknown>) => void };
    dataLayer?: Array<Record<string, unknown> | IArguments>;
  }
}

type EventPayload = Record<string, string | number | boolean>;

const metaMap: Record<string, string> = {
  page_view: "PageView",
  scroll_depth: "ScrollDepth",
  time_on_page: "TimeOnPage",
  outbound_click: "OutboundClick",
  contact_form: "Lead",
  whatsapp_click: "Contact",
  phone_click: "Contact",
  email_click: "Contact",
  file_download: "Download",
  demo_booking: "Schedule",
};

const ga4Map: Record<string, string> = {
  page_view: "page_view",
  scroll_depth: "scroll",
  time_on_page: "user_engagement",
  outbound_click: "click",
  contact_form: "generate_lead",
  whatsapp_click: "contact",
  phone_click: "contact",
  email_click: "contact",
  file_download: "file_download",
  demo_booking: "generate_lead",
};

const tiktokMap: Record<string, string> = {
  page_view: "PageView",
  scroll_depth: "ViewContent",
  time_on_page: "ViewContent",
  outbound_click: "ClickButton",
  contact_form: "SubmitForm",
  whatsapp_click: "Contact",
  phone_click: "Contact",
  email_click: "Contact",
  file_download: "Download",
  demo_booking: "CompleteRegistration",
};

function emit(settings: TrackingSettings, event: string, payload: EventPayload = {}) {
  const common = { ...payload, page_path: location.pathname + location.search, page_title: document.title };

  if (settings.meta.enabled && settings.meta.pixelId && window.fbq) {
    const mapped = metaMap[event] || event;
    const standard = ["PageView", "Lead", "Contact", "Schedule"].includes(mapped);
    window.fbq(standard ? "track" : "trackCustom", mapped, common);
  }

  if (settings.googleMode === "ga4" && settings.ga4.enabled && settings.ga4.measurementId && window.gtag) {
    window.gtag("event", ga4Map[event] || event, common);
  }

  if (settings.googleMode === "gtm" && settings.gtm.enabled && settings.gtm.containerId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: `qyasat_${event}`, ...common });
  }

  if (settings.tiktok.enabled && settings.tiktok.pixelId && window.ttq) {
    const mapped = tiktokMap[event] || event;
    if (event === "page_view") window.ttq.page?.();
    else window.ttq.track?.(mapped, common);
  }
}

function textOf(element: Element) {
  return (element.textContent || element.getAttribute("aria-label") || "").trim().slice(0, 160);
}

export function MarketingEventTracker({ settings }: { settings: TrackingSettings }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageStartedAt = useRef(Date.now());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (settings.automaticEvents.pageViews) emit(settings, "page_view");
      pageStartedAt.current = Date.now();
    }, 700);
    return () => window.clearTimeout(timer);
  }, [pathname, searchParams, settings]);

  useEffect(() => {
    const automatic = settings.automaticEvents;
    let scroll50 = false;
    let scroll90 = false;

    const onScroll = () => {
      if (!automatic.scrollDepth) return;
      const height = document.documentElement.scrollHeight;
      if (!height) return;
      const percent = Math.round(((window.scrollY + window.innerHeight) / height) * 100);
      if (percent >= 50 && !scroll50) { scroll50 = true; emit(settings, "scroll_depth", { percent_scrolled: 50 }); }
      if (percent >= 90 && !scroll90) { scroll90 = true; emit(settings, "scroll_depth", { percent_scrolled: 90 }); }
    };

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest("a,button,[data-track-event]");
      if (!target) return;
      const anchor = target instanceof HTMLAnchorElement ? target : target.closest("a");
      const href = anchor?.getAttribute("href") || "";
      const absoluteHref = anchor?.href || href;
      const text = textOf(target);
      const lower = `${href} ${text}`.toLowerCase();
      const payload = { link_url: absoluteHref, link_text: text };

      const custom = target.getAttribute("data-track-event");
      if (custom) { emit(settings, custom, payload); return; }
      if (automatic.whatsappClicks && /wa\.me|whatsapp/.test(lower)) emit(settings, "whatsapp_click", payload);
      else if (automatic.phoneClicks && /^tel:/i.test(href)) emit(settings, "phone_click", payload);
      else if (automatic.emailClicks && /^mailto:/i.test(href)) emit(settings, "email_click", payload);
      else if (automatic.downloads && (/\.(pdf|docx?|xlsx?|pptx?|zip)(\?|#|$)/i.test(href) || target.hasAttribute("download"))) emit(settings, "file_download", payload);
      else if (automatic.demoBooking && /book|demo|schedule|appointment|consultation|ابدأ|احجز|موعد/.test(lower)) emit(settings, "demo_booking", payload);
      else if (automatic.outboundLinks && anchor && anchor.origin !== location.origin && /^https?:/i.test(anchor.href)) emit(settings, "outbound_click", payload);
    };

    const onSubmit = (event: SubmitEvent) => {
      if (!automatic.contactForm) return;
      const form = event.target as HTMLFormElement;
      const label = form.getAttribute("data-form-name") || form.getAttribute("name") || form.id || "contact_form";
      emit(settings, "contact_form", { form_name: label });
    };

    const onPageHide = () => {
      if (!automatic.timeOnPage) return;
      const seconds = Math.max(1, Math.round((Date.now() - pageStartedAt.current) / 1000));
      emit(settings, "time_on_page", { engagement_time_seconds: seconds });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [settings]);

  return null;
}
