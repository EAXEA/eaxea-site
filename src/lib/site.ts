// Single source of truth for brand + site-wide config.
// Change `site.name` / `tagline` here and it propagates everywhere.

export const site = {
  name: "EAXEA",
  founder: "Cihan Şenocak",
  role: "Creative Developer",
  // Hero one-liner. Bold but readable.
  tagline:
    "Dijital deneyimleri tasarlayan, kodlayan ve kurgulayan bağımsız creative developer.",
  // Positioning line used in meta + footer.
  positioning: "Web design · Full-stack · Video & film · Vibe coding",
  description:
    "EAXEA, premium ve motion-first dijital deneyimler üreten bağımsız bir creative development stüdyosu. Web tasarımı, full-stack geliştirme, AI destekli vibe coding ve belgeselden kurumsal filme uzanan video prodüksiyonu tek elde birleşir.",
  // Public URL — update when the domain is live.
  url: "https://eaxea.studio",
  locale: "tr_TR",
  email: "eaxeadesign@gmail.com",
  location: "Ankara · Remote / Worldwide",
  availability: "2026 için yeni proje alımı açık",
  // Client-facing response-time promise — adjust to your real cadence.
  responseTime: "Mesajlara genelde 48 saat içinde dönüş yaparım.",
  socials: [
    { label: "GitHub", handle: "EAXEA", href: "https://github.com/EAXEA" },
    {
      label: "Instagram",
      handle: "@eaxea",
      href: "https://instagram.com/",
    },
    { label: "Email", handle: "eaxeadesign@gmail.com", href: "mailto:eaxeadesign@gmail.com" },
  ],
  nav: [
    { label: "Stüdyo", href: "/studio" },
    { label: "İşler", href: "/work" },
    { label: "İletişim", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
