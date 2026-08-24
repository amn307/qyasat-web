import { Cairo } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { readSiteSettings } from "@/lib/site-settings";
import { readSiteContent } from "@/lib/content/site-content";
import { PublicTracking } from "@/components/analytics/public-tracking";
import { ThemeStyle } from "@/components/theme/theme-style";

const arabicFont = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
});






export const dynamic = "force-dynamic";
export const revalidate = 0;

export const viewport = {
  themeColor: "#f7f3ea",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await readSiteSettings();
  const ogImage = settings.brand.ogImageUrl || "/brand/qyasat-logo.svg";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://qyasat.sa"),
    title: {
      default: "قياسات | Qyasat | Content Management and Measurement Platform",
      template: "%s | Qyasat",
    },
    description: "Content management and measurement platform for websites, systems, automation, and AI.",
    applicationName: "Qyasat",
    alternates: { canonical: "/" },
    icons: settings.brand.faviconUrl ? { icon: settings.brand.faviconUrl, shortcut: settings.brand.faviconUrl } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/en",
      siteName: "Qyasat",
      title: "Qyasat | Content Management and Measurement Platform",
      description: "Content management and measurement platform for websites, systems, automation, and AI.",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Qyasat | Content Management and Measurement Platform",
      description: "Content management and measurement platform for websites, systems, automation, and AI.",
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await readSiteContent();

  return (
    <html lang="en" className={arabicFont.variable}>
      <body className="min-h-full flex flex-col">
        <ThemeStyle />
        <PublicTracking settings={content.tracking} />
        {children}
      </body>
    </html>
  );
}
