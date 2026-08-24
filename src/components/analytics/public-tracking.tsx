"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { TrackingSettings } from "@/lib/analytics/types";
import { TrackingScripts } from "@/components/analytics/tracking-scripts";
import { VisitorTracker } from "@/components/analytics/visitor-tracker";
import { MarketingEventTracker } from "@/components/analytics/marketing-event-tracker";

export function PublicTracking({ settings: initialSettings }: { settings: TrackingSettings }) {
  const pathname = usePathname();
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    let cancelled = false;

    async function refreshTrackingSettings() {
      try {
        const response = await fetch("/api/public/tracking", {
          method: "GET",
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) return;

        const payload = (await response.json()) as {
          ok?: boolean;
          tracking?: TrackingSettings;
        };

        if (!cancelled && payload.ok && payload.tracking) {
          setSettings(payload.tracking);
        }
      } catch {
        // Keep server-provided settings when the public endpoint is unavailable.
      }
    }

    refreshTrackingSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return null;
  }

  const locale = pathname.startsWith("/ar") ? "ar" : "en";

  return (
    <>
      <TrackingScripts settings={settings} />
      <MarketingEventTracker settings={settings} />
      <VisitorTracker enabled={settings.firstPartyAnalyticsEnabled} locale={locale} />
    </>
  );
}
