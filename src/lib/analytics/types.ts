export type GoogleTrackingMode = "ga4" | "gtm";

export type AutomaticEventSettings = {
  pageViews: boolean;
  scrollDepth: boolean;
  timeOnPage: boolean;
  outboundLinks: boolean;
  contactForm: boolean;
  whatsappClicks: boolean;
  phoneClicks: boolean;
  emailClicks: boolean;
  downloads: boolean;
  demoBooking: boolean;
};

export type TrackingSettings = {
  firstPartyAnalyticsEnabled: boolean;
  googleMode: GoogleTrackingMode;
  ga4: { enabled: boolean; measurementId: string };
  gtm: { enabled: boolean; containerId: string };
  meta: { enabled: boolean; pixelId: string };
  tiktok: { enabled: boolean; pixelId: string };
  automaticEvents: AutomaticEventSettings;
  // Kept for backward compatibility with older saved CMS data.
  clarity: { enabled: boolean; projectId: string };
  customHead: string;
  customBody: string;
};

export const defaultAutomaticEvents: AutomaticEventSettings = {
  pageViews: true,
  scrollDepth: true,
  timeOnPage: true,
  outboundLinks: true,
  contactForm: true,
  whatsappClicks: true,
  phoneClicks: true,
  emailClicks: true,
  downloads: true,
  demoBooking: true,
};

export const defaultTrackingSettings: TrackingSettings = {
  firstPartyAnalyticsEnabled: true,
  googleMode: "ga4",
  ga4: { enabled: false, measurementId: "" },
  gtm: { enabled: false, containerId: "" },
  meta: { enabled: false, pixelId: "" },
  tiktok: { enabled: false, pixelId: "" },
  automaticEvents: defaultAutomaticEvents,
  clarity: { enabled: false, projectId: "" },
  customHead: "",
  customBody: "",
};

export type AnalyticsEvent = {
  sessionId: string;
  visitorId: string;
  type: string;
  path: string;
  title?: string;
  referrer?: string;
  locale?: string;
  durationMs?: number;
  metadata?: Record<string, string | number | boolean>;
  timestamp: string;
};
