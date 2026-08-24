import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qyasat | منصة إدارة وقياس محتوى",
    short_name: "Qyasat",
    description: "منصة إدارة وقياس محتوى لتطوير المواقع، الأنظمة، الأتمتة، والذكاء الاصطناعي.",
    start_url: "/ar",
    scope: "/",
    display: "standalone",
    background_color: "#0B0B09",
    theme_color: "#0B0B09",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "technology"],
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/brand/qyasat-favicon-20260704d.png",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/brand/qyasat-favicon-20260704d.png",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
