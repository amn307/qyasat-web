import fs from "node:fs/promises";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { readCmsDocument, writeCmsDocument, requirePersistentStorage } from "@/lib/firebase/cms-store";

export type SiteTheme = {
  name: string;
  mode: "light" | "dark" | "soft";
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    muted: string;
    primary: string;
    primaryText: string;
    border: string;
    accent: string;
  };
  footer: {
    heading: string;
    text: string;
    muted: string;
    accent: string;
    border: string;
  };
  typography: {
    arabicFont: string;
    englishFont: string;
    headingFont: string;
    baseSize: string;
    headingWeight: string;
    letterSpacing: string;
  };
  radius: { card: string; button: string };
  layout: {
    maxWidth: string;
    density: "comfortable" | "compact" | "spacious";
  };
  effects: { heroGlow: string; glass: boolean };
  updatedAt?: string;
};

export const fontOptions = {
  arabic: ['"IBM Plex Sans Arabic"', '"Tajawal"', '"Cairo"', '"Almarai"', '"Noto Kufi Arabic"', '"Noto Sans Arabic"'],
  english: ['"Inter"', '"Geist"', '"Manrope"', '"Montserrat"', '"Poppins"', '"Roboto"'],
};

export const defaultTheme: SiteTheme = {
  name: "قياسات Elegant Light",
  mode: "light",
  colors: {
    background: "#f7f4ef", surface: "#ffffff", surfaceMuted: "#f0ebe3",
    text: "#151515", muted: "#6f6a63", primary: "#111111",
    primaryText: "#ffffff", border: "#ded7cb", accent: "#b68b3c",
  },
  footer: {
    heading: "#ffffff",
    text: "rgba(255, 255, 255, 0.82)",
    muted: "rgba(255, 255, 255, 0.58)",
    accent: "#25f4ff",
    border: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    arabicFont: '"IBM Plex Sans Arabic"', englishFont: '"Inter"',
    headingFont: '"IBM Plex Sans Arabic"', baseSize: "16px",
    headingWeight: "900", letterSpacing: "-0.03em",
  },
  radius: { card: "28px", button: "999px" },
  layout: { maxWidth: "1160px", density: "comfortable" },
  effects: { heroGlow: "rgba(182, 139, 60, 0.20)", glass: true },
};

const themePath = path.join(process.cwd(), "storage/private/site-theme.json");
const hex = /^#[0-9a-f]{6}$/i;
const cssSize = /^-?\d+(\.\d+)?(px|rem|em|vw|vh|%)$/i;
const rgba = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0|1|0?\.\d+))?\s*\)$/i;

function safeColor(value: unknown, fallback: string) {
  return typeof value === "string" && (hex.test(value.trim()) || rgba.test(value.trim())) ? value.trim() : fallback;
}
function safeSize(value: unknown, fallback: string) {
  return typeof value === "string" && cssSize.test(value.trim()) ? value.trim() : fallback;
}
function safeFont(value: unknown, fallback: string) {
  const allowed = [...fontOptions.arabic, ...fontOptions.english];
  return typeof value === "string" && allowed.includes(value) ? value : fallback;
}

export function mergeTheme(input: Partial<SiteTheme> = {}): SiteTheme {
  const colors: Partial<SiteTheme["colors"]> = input.colors || {};
  const typography: Partial<SiteTheme["typography"]> = input.typography || {};
  const footer: Partial<SiteTheme["footer"]> = input.footer || {};
  return {
    name: typeof input.name === "string" && input.name.trim() ? input.name.trim().slice(0, 80) : defaultTheme.name,
    mode: ["light", "dark", "soft"].includes(String(input.mode)) ? input.mode! : defaultTheme.mode,
    colors: {
      background: safeColor(colors.background, defaultTheme.colors.background),
      surface: safeColor(colors.surface, defaultTheme.colors.surface),
      surfaceMuted: safeColor(colors.surfaceMuted, defaultTheme.colors.surfaceMuted),
      text: safeColor(colors.text, defaultTheme.colors.text),
      muted: safeColor(colors.muted, defaultTheme.colors.muted),
      primary: safeColor(colors.primary, defaultTheme.colors.primary),
      primaryText: safeColor(colors.primaryText, defaultTheme.colors.primaryText),
      border: safeColor(colors.border, defaultTheme.colors.border),
      accent: safeColor(colors.accent, defaultTheme.colors.accent),
    },
    footer: {
      heading: safeColor(footer.heading, defaultTheme.footer.heading),
      text: safeColor(footer.text, defaultTheme.footer.text),
      muted: safeColor(footer.muted, defaultTheme.footer.muted),
      accent: safeColor(footer.accent, defaultTheme.footer.accent),
      border: safeColor(footer.border, defaultTheme.footer.border),
    },
    typography: {
      arabicFont: safeFont(typography.arabicFont, defaultTheme.typography.arabicFont),
      englishFont: safeFont(typography.englishFont, defaultTheme.typography.englishFont),
      headingFont: safeFont(typography.headingFont, defaultTheme.typography.headingFont),
      baseSize: safeSize(typography.baseSize, defaultTheme.typography.baseSize),
      headingWeight: ["600", "700", "800", "900"].includes(String(typography.headingWeight)) ? String(typography.headingWeight) : defaultTheme.typography.headingWeight,
      letterSpacing: safeSize(typography.letterSpacing, defaultTheme.typography.letterSpacing),
    },
    radius: {
      card: safeSize(input.radius?.card, defaultTheme.radius.card),
      button: safeSize(input.radius?.button, defaultTheme.radius.button),
    },
    layout: {
      maxWidth: safeSize(input.layout?.maxWidth, defaultTheme.layout.maxWidth),
      density: ["comfortable", "compact", "spacious"].includes(String(input.layout?.density)) ? input.layout!.density : defaultTheme.layout.density,
    },
    effects: {
      heroGlow: safeColor(input.effects?.heroGlow, defaultTheme.effects.heroGlow),
      glass: typeof input.effects?.glass === "boolean" ? input.effects.glass : defaultTheme.effects.glass,
    },
    updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : undefined,
  };
}

async function readLocalSiteTheme(): Promise<SiteTheme> {
  try { return mergeTheme(JSON.parse(await fs.readFile(themePath, "utf8"))); }
  catch { return defaultTheme; }
}

export async function readSiteTheme(): Promise<SiteTheme> {
  const local = await readLocalSiteTheme();
  if (isFirebaseAdminConfigured()) {
    try {
      const stored = await readCmsDocument<SiteTheme>("site-theme");
      if (!stored) return local;
      return mergeTheme({
        ...local,
        ...stored,
        colors: { ...local.colors, ...(stored.colors || {}) },
        footer: { ...local.footer, ...(stored.footer || {}) },
        typography: { ...local.typography, ...(stored.typography || {}) },
        radius: { ...local.radius, ...(stored.radius || {}) },
        layout: { ...local.layout, ...(stored.layout || {}) },
        effects: { ...local.effects, ...(stored.effects || {}) },
      });
    } catch (error) {
      console.error("SITE_THEME_FIREBASE_READ_FAILED", error);
      return local;
    }
  }
  return local;
}

export async function writeSiteTheme(theme: Partial<SiteTheme>) {
  const merged = mergeTheme({ ...theme, updatedAt: new Date().toISOString() });
  if (isFirebaseAdminConfigured()) return writeCmsDocument("site-theme", merged);
  requirePersistentStorage();
  await fs.mkdir(path.dirname(themePath), { recursive: true });
  await fs.writeFile(themePath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  return merged;
}

export function themeToCssVariables(theme: SiteTheme) {
  const densityGap = theme.layout.density === "compact" ? "0.82" : theme.layout.density === "spacious" ? "1.18" : "1";
  const glassBackground = theme.effects.glass
    ? "color-mix(in srgb, var(--qyasat-surface) 88%, transparent)"
    : "var(--qyasat-surface)";

  return `
:root {
  --qyasat-bg: ${theme.colors.background};
  --qyasat-surface: ${theme.colors.surface};
  --qyasat-surface-muted: ${theme.colors.surfaceMuted};
  --qyasat-text: ${theme.colors.text};
  --qyasat-muted: ${theme.colors.muted};
  --qyasat-primary: ${theme.colors.primary};
  --qyasat-primary-text: ${theme.colors.primaryText};
  --qyasat-border: ${theme.colors.border};
  --qyasat-accent: ${theme.colors.accent};
  --qyasat-footer-heading: ${theme.footer.heading};
  --qyasat-footer-text: ${theme.footer.text};
  --qyasat-footer-muted: ${theme.footer.muted};
  --qyasat-footer-accent: ${theme.footer.accent};
  --qyasat-footer-border: ${theme.footer.border};
  --qyasat-font-ar: ${theme.typography.arabicFont};
  --qyasat-font-en: ${theme.typography.englishFont};
  --qyasat-heading-font: ${theme.typography.headingFont};
  --qyasat-base-font-size: ${theme.typography.baseSize};
  --qyasat-heading-weight: ${theme.typography.headingWeight};
  --qyasat-letter-spacing: ${theme.typography.letterSpacing};
  --qyasat-card-radius: ${theme.radius.card};
  --qyasat-button-radius: ${theme.radius.button};
  --qyasat-max-width: ${theme.layout.maxWidth};
  --qyasat-hero-glow: ${theme.effects.heroGlow};
  --qyasat-density: ${densityGap};
}

/* This stylesheet is rendered after the legacy homepage stylesheet. The high
   specificity is intentional: old page CSS contains hardcoded !important rules. */
html body main.qyasat-home {
  background: var(--qyasat-bg) !important;
  color: var(--qyasat-text) !important;
  font-size: var(--qyasat-base-font-size) !important;
  padding-inline: max(18px, calc((100vw - var(--qyasat-max-width)) / 2)) !important;
}
html body main.qyasat-home[dir="rtl"] { font-family: var(--qyasat-font-ar), system-ui, sans-serif !important; }
html body main.qyasat-home[dir="ltr"] { font-family: var(--qyasat-font-en), system-ui, sans-serif !important; }
html body main.qyasat-home h1,
html body main.qyasat-home h2,
html body main.qyasat-home h3,
html body main.qyasat-home h4 {
  color: var(--qyasat-text) !important;
  font-family: var(--qyasat-heading-font), system-ui, sans-serif !important;
  font-weight: var(--qyasat-heading-weight) !important;
  letter-spacing: var(--qyasat-letter-spacing) !important;
}

/* One shared content width for navigation, every section, and footer. */
html body main.qyasat-home > header,
html body main.qyasat-home > section,
html body main.qyasat-home > footer.qyasat-site-footer {
  width: 100% !important;
  max-width: var(--qyasat-max-width) !important;
  margin-inline: auto !important;
  box-sizing: border-box !important;
}
html body main.qyasat-home > footer.qyasat-site-footer {
  margin-top: 34px !important;
}

/* Main surfaces and cards. */
html body main.qyasat-home .qyasat-nav,
html body main.qyasat-home .qyasat-trust,
html body main.qyasat-home .qyasat-card,
html body main.qyasat-home section#ai.qyasat-ai,
html body main.qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid article,
html body main.qyasat-home section#process .qyasat-process article,
html body main.qyasat-home section#work .qyasat-work-grid.work-grid article,
html body main.qyasat-home .qyasat-blog-card,
html body main.qyasat-home .qyasat-blog-empty,
html body main.qyasat-home section.qyasat-estimator,
html body main.qyasat-home section.qyasat-estimator .qyasat-estimator-box,
html body main.qyasat-home section#contact.qyasat-contact {
  background: ${glassBackground} !important;
  border-color: var(--qyasat-border) !important;
  color: var(--qyasat-text) !important;
  border-radius: var(--qyasat-card-radius) !important;
  backdrop-filter: ${theme.effects.glass ? "blur(18px)" : "none"} !important;
}
html body main.qyasat-home .qyasat-trust,
html body main.qyasat-home section#ai.qyasat-ai,
html body main.qyasat-home section.qyasat-estimator,
html body main.qyasat-home section#contact.qyasat-contact {
  background:
    radial-gradient(circle at 12% 20%, color-mix(in srgb, var(--qyasat-primary) 10%, transparent), transparent 34%),
    ${glassBackground} !important;
}
html body main.qyasat-home section#work .qyasat-work-grid.work-grid article > div,
html body main.qyasat-home .qyasat-mini-card,
html body main.qyasat-home .qyasat-code-window {
  background:
    radial-gradient(circle at 18% 18%, color-mix(in srgb, var(--qyasat-primary) 18%, transparent), transparent 38%),
    linear-gradient(135deg, var(--qyasat-surface-muted), var(--qyasat-surface)) !important;
  border-color: var(--qyasat-border) !important;
}

/* Primary CTAs everywhere. */
html body main.qyasat-home .qyasat-primary,
html body main.qyasat-home .qyasat-nav-cta,
html body main.qyasat-home .qyasat-tools a,
html body main.qyasat-home section.qyasat-estimator a,
html body main.qyasat-home .qyasat-blog-all {
  background: var(--qyasat-primary) !important;
  background-image: none !important;
  color: var(--qyasat-primary-text) !important;
  border-color: var(--qyasat-primary) !important;
  border-radius: var(--qyasat-button-radius) !important;
  box-shadow: 0 18px 44px color-mix(in srgb, var(--qyasat-primary) 24%, transparent) !important;
}
html body main.qyasat-home .qyasat-secondary {
  background: var(--qyasat-surface) !important;
  background-image: none !important;
  color: var(--qyasat-text) !important;
  border-color: var(--qyasat-border) !important;
  border-radius: var(--qyasat-button-radius) !important;
}

/* Text hierarchy. */
html body main.qyasat-home p,
html body main.qyasat-home span,
html body main.qyasat-home small,
html body main.qyasat-home section#ai.qyasat-ai > span,
html body main.qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid p,
html body main.qyasat-home section#process .qyasat-process p,
html body main.qyasat-home section#work .qyasat-work-grid.work-grid p {
  color: var(--qyasat-muted) !important;
}
html body main.qyasat-home .qyasat-badge,
html body main.qyasat-home h1 span,
html body main.qyasat-home .qyasat-section-head > div > p,
html body main.qyasat-home section#ai.qyasat-ai > p,
html body main.qyasat-home .qyasat-card > b,
html body main.qyasat-home .qyasat-card i,
html body main.qyasat-home .qyasat-blog-copy small,
html body main.qyasat-home .qyasat-blog-copy b,
html body main.qyasat-home section#work .qyasat-work-grid.work-grid article small,
html body main.qyasat-home .qyasat-footer-contact small {
  color: var(--qyasat-accent) !important;
}

/* Badges, counters, AI labels and process decorations use the primary colour. */
html body main.qyasat-home .qyasat-card i,
html body main.qyasat-home section#ai.qyasat-ai .qyasat-ai-grid.ai-grid article::before,
html body main.qyasat-home section#process .qyasat-process article::before {
  color: var(--qyasat-primary) !important;
  background: color-mix(in srgb, var(--qyasat-primary) 10%, var(--qyasat-surface)) !important;
  border-color: color-mix(in srgb, var(--qyasat-primary) 28%, var(--qyasat-border)) !important;
}
html body main.qyasat-home section#process .qyasat-process article::after {
  background: linear-gradient(90deg, var(--qyasat-primary), var(--qyasat-accent)) !important;
}
html body main.qyasat-home .qyasat-core {
  background: var(--qyasat-primary) !important;
  color: var(--qyasat-primary-text) !important;
  border-color: color-mix(in srgb, var(--qyasat-primary) 35%, transparent) !important;
}
html body main.qyasat-home .qyasat-ring {
  border-color: color-mix(in srgb, var(--qyasat-primary) 34%, transparent) !important;
}
html body main.qyasat-home .qyasat-hero {
  filter: drop-shadow(0 0 70px var(--qyasat-hero-glow)) !important;
}

/* Footer colours are controlled independently from the light page theme. */
html body main.qyasat-home footer.qyasat-site-footer {
  color: var(--qyasat-footer-text) !important;
  border-color: var(--qyasat-footer-border) !important;
}
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-brand strong,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-column h2 {
  color: var(--qyasat-footer-heading) !important;
}
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-brand small,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-brand > p,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-column a,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-contact span,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-empty,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-bottom,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-bottom a {
  color: var(--qyasat-footer-text) !important;
}
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-brand small,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-empty,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-bottom,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-bottom a {
  color: var(--qyasat-footer-muted) !important;
}
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-contact small,
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-column a:hover {
  color: var(--qyasat-footer-accent) !important;
}
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-bottom {
  border-color: var(--qyasat-footer-border) !important;
}
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-socials a > span {
  color: var(--qyasat-footer-heading) !important;
  border-color: var(--qyasat-footer-border) !important;
}
html body main.qyasat-home footer.qyasat-site-footer .qyasat-footer-mark {
  background: linear-gradient(135deg, var(--qyasat-primary), var(--qyasat-accent)) !important;
  color: var(--qyasat-primary-text) !important;
}
`;
}
