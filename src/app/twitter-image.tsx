import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "قياسات - Digital platforms, automation, AI, and SEO";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B0B09",
          color: "#F4EFE6",
          padding: "70px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontSize: 30, color: "#D6B16E", fontWeight: 900 }}>قياسات</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 900, maxWidth: 900 }}>
            Digital platforms that sell, operate, and scale.
          </div>
          <div style={{ fontSize: 28, color: "rgba(244,239,230,0.65)" }}>
            Strategy · UX · Development · Automation · SEO
          </div>
        </div>
      </div>
    ),
    size,
  );
}
