import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Creative Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default font only (no WOFF2/variable fonts — keeps next/og happy).
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(60% 80% at 20% 10%, #2a1206 0%, #060608 55%)",
          color: "#ededf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "linear-gradient(135deg, #ff5c28, #ff2d9c 45%, #2fe0ff)",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            Dijital deneyimler
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              textTransform: "uppercase",
              color: "#ff5c28",
            }}
          >
            tasarlarım.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#8b8b9c",
          }}
        >
          <span>{site.positioning}</span>
          <span>{site.founder}</span>
        </div>
      </div>
    ),
    size
  );
}
