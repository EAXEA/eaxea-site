import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type Props = {
  /** Big display lines. The second one takes the accent colour. */
  lines: string[];
  /** Small line under the brand mark, e.g. a case category. */
  eyebrow?: string;
  footerLeft: string;
  footerRight: string;
  /** Hex used for the accent line and the background wash. */
  accent?: string;
};

/**
 * The shared share-card frame. Both the site card and the per-case cards render
 * through it so a brand change never has to be made twice.
 *
 * Satori only supports a subset of CSS and no custom fonts are loaded here, so
 * everything stays on system sans and plain flex layout.
 */
export default function OgCard({
  lines,
  eyebrow,
  footerLeft,
  footerRight,
  accent = "#fd755b",
}: Props) {
  // Long case titles would overflow at the display size, so the type shrinks
  // once a line gets wide rather than running off the card.
  const longest = Math.max(...lines.map((line) => line.length));
  const fontSize = longest > 22 ? 62 : longest > 15 ? 78 : 96;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: `radial-gradient(60% 80% at 20% 10%, ${accent}22 0%, #031920 55%)`,
        color: "#efe8da",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "linear-gradient(135deg, #fd755b, #ffa387 45%, #ace9ff)",
          }}
        />
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
          {site.name}
        </div>
        {eyebrow && (
          <div style={{ fontSize: 24, color: "#8cc8df" }}>{eyebrow}</div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {lines.map((line, i) => (
          <div
            key={line}
            style={{
              fontSize,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              color: i === 1 ? accent : "#efe8da",
            }}
          >
            {/* Uppercased here, not with textTransform: the renderer has no
                language context, so CSS would turn "için" into "IÇIN" instead
                of the Turkish "İÇİN". The page itself is fine, lang="tr". */}
            {line.toLocaleUpperCase("tr")}
          </div>
        ))}
      </div>

      {/* A long positioning line used to run straight into the name on the
          right. The gap plus a bounded left column keeps them apart and lets
          the left side wrap instead of colliding. */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 40,
          fontSize: 26,
          color: "#8cc8df",
        }}
      >
        <span style={{ display: "flex", maxWidth: 760, lineHeight: 1.3 }}>
          {footerLeft}
        </span>
        <span style={{ display: "flex", flexShrink: 0 }}>{footerRight}</span>
      </div>
    </div>
  );
}
