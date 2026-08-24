import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "قياسات - CMS, Analytics, Measurement, and Automation";
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
          background: "#17130f",
          color: "#f7f4ee",
          padding: "70px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "rgba(217,182,120,0.24)",
            top: -120,
            right: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: 999,
            background: "rgba(247,244,238,0.08)",
            bottom: -130,
            left: -80,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <div
              style={{
                width: 82,
                height: 82,
                borderRadius: 26,
                background: "#d9b678",
                color: "#17130f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              QY
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 34, fontWeight: 900 }}>قياسات</div>
              <div style={{ fontSize: 22, color: "rgba(247,244,238,0.62)" }}>Digital Platforms Ready to Scale</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 74, lineHeight: 1.02, fontWeight: 900, maxWidth: 900 }}>
              CMS, Analytics, Measurement, and Automation
            </div>
            <div style={{ fontSize: 28, color: "rgba(247,244,238,0.68)", maxWidth: 820, lineHeight: 1.35 }}>
              Premium digital systems for ambitious businesses.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {["SaaS", "Dashboards", "AI Agents", "Growth"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "14px 20px",
                  borderRadius: 999,
                  background: "rgba(247,244,238,0.1)",
                  border: "1px solid rgba(247,244,238,0.14)",
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
