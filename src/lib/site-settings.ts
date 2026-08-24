import fs from "node:fs";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { readCmsDocument, writeCmsDocument, requirePersistentStorage } from "@/lib/firebase/cms-store";

export type SiteSettings = {
  brand: {
    logoUrl: string;
    logoAlt: string;
    faviconUrl: string;
    ogImageUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    addressAr: string;
    addressEn: string;
  };
  social: {
    instagram: string;
    x: string;
    linkedin: string;
    github: string;
    tiktok: string;
  };
};

const dataFile = runtimeStoragePath("data", "site-settings.json");

export const defaultSiteSettings: SiteSettings = {
  brand: {
    logoUrl: "",
    logoAlt: "Qyasat",
    faviconUrl: "/brand/qyasat-favicon-20260704d.ico",
    ogImageUrl: "/brand/qyasat-logo.svg",
  },
  contact: {
    email: "moamen.fz@gmail.com",
    phone: "",
    whatsapp: "",
    addressAr: "",
    addressEn: "",
  },
  social: {
    instagram: "",
    x: "",
    linkedin: "",
    github: "",
    tiktok: "",
  },
};

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function normalizeSiteSettings(value: unknown): SiteSettings {
  const root = object(value);
  const brand = object(root.brand);
  const contact = object(root.contact);
  const social = object(root.social);

  return {
    brand: {
      logoUrl: text(brand.logoUrl, defaultSiteSettings.brand.logoUrl),
      logoAlt: text(brand.logoAlt, defaultSiteSettings.brand.logoAlt),
      faviconUrl: text(brand.faviconUrl, defaultSiteSettings.brand.faviconUrl),
      ogImageUrl: text(brand.ogImageUrl, defaultSiteSettings.brand.ogImageUrl),
    },
    contact: {
      email: text(contact.email, defaultSiteSettings.contact.email),
      phone: text(contact.phone),
      whatsapp: text(contact.whatsapp),
      addressAr: text(contact.addressAr),
      addressEn: text(contact.addressEn),
    },
    social: {
      instagram: text(social.instagram),
      x: text(social.x),
      linkedin: text(social.linkedin),
      github: text(social.github),
      tiktok: text(social.tiktok),
    },
  };
}

function readLocalSiteSettings(): SiteSettings {
  try {
    return normalizeSiteSettings(JSON.parse(fs.readFileSync(dataFile, "utf8")));
  } catch {
    return defaultSiteSettings;
  }
}

function mergeSiteSettings(base: SiteSettings, override: unknown): SiteSettings {
  const root = object(override);
  return normalizeSiteSettings({
    brand: { ...base.brand, ...object(root.brand) },
    contact: { ...base.contact, ...object(root.contact) },
    social: { ...base.social, ...object(root.social) },
  });
}

export async function readSiteSettings(): Promise<SiteSettings> {
  const local = readLocalSiteSettings();
  if (isFirebaseAdminConfigured()) {
    try {
      const stored = await readCmsDocument<SiteSettings>("site-settings");
      return stored ? mergeSiteSettings(local, stored) : local;
    } catch (error) {
      console.error("SITE_SETTINGS_FIREBASE_READ_FAILED", error);
      return local;
    }
  }
  return local;
}

export async function saveSiteSettings(value: unknown): Promise<SiteSettings> {
  const settings = normalizeSiteSettings(value);
  if (isFirebaseAdminConfigured()) return writeCmsDocument("site-settings", settings);
  requirePersistentStorage();
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(settings, null, 2), "utf8");
  return settings;
}
