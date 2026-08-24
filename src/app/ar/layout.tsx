import type { Metadata } from "next";

const title = "Qyasat | منصة إدارة وقياس محتوى";
const description =
  "منصة إدارة وقياس محتوى لتطوير المواقع، الأنظمة، الأتمتة، والذكاء الاصطناعي.";
const url = "https://qyasat.sa/ar";
const image = "https://qyasat.sa/brand/qyasat-logo.svg";

export const metadata: Metadata = {
  metadataBase: new URL("https://qyasat.sa"),
  title,
  description,
  applicationName: "Qyasat",
  alternates: {
    canonical: url
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url,
    siteName: "Qyasat",
    title,
    description,
    images: [
      {
        url: "https://qyasat.sa/brand/qyasat-logo.svg",
        secureUrl: "https://qyasat.sa/brand/qyasat-logo.svg",
        width: 1200,
        height: 630,
        alt: "Qyasat | منصة إدارة وقياس محتوى"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Qyasat | منصة إدارة وقياس محتوى",
    description: "منصة إدارة وقياس محتوى لتطوير المواقع، الأنظمة، الأتمتة، والذكاء الاصطناعي.",
    images: ["https://qyasat.sa/brand/qyasat-logo.svg"]
  },
  appleWebApp: {
    capable: true,
    title
  }
};

export default function ArabicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
