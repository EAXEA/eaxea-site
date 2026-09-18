// Single source of truth for brand + site-wide config.
// Change `site.name` / `tagline` here and it propagates everywhere.

export const site = {
  name: "MAIA'S WORKS",
  founder: "Cihan Şenocak",
  // Trade name of the business that invoices this work. Footer display only.
  // The registered title, form, address and tax office live in one place —
  // `maiamari-studio/lib/legal.ts` (SELLER) — and the KVKK notice must read the
  // exact values from there rather than restating them here.
  legalName: "Maiamari",
  role: "Tasarım, kod ve kurgu",
  // The hero H1, one entry per masked line. The share image renders the same
  // three lines, so the headline cannot drift between the page and the card.
  headline: ["Web siteleri", "tasarlar,", "kodlarım."],
  // Hero one-liner. Bold but readable.
  tagline:
    "İşinizi doğru anlatan siteler ve filmler üretiyorum, baştan sona kendim.",
  // Positioning line used in meta + footer.
  positioning: "Web tasarımı · Full-stack · Yapay zeka destekli geliştirme · Video ve film",
  description:
    "MAIA'S WORKS, Cihan Şenocak'ın bağımsız tasarım ve geliştirme çalışması. Web tarafında landing page'den kurumsal siteye, katalog platformundan tarayıcı eklentisine kadar projeyi tasarlayıp sıfırdan kodluyorum; yapay zeka destekli geliştirme sürecin standart parçası. Video tarafında belgesel kurgusu, kurumsal film ve Blender ile teknik animasyon geçmişim var. Şablon yok, her iş projeye özel.",
  // Public URL. maias.works went live 18.09.2026; the two vercel.app production
  // aliases 308 to it (see next.config.ts), so this stays the single canonical.
  url: "https://maias.works",
  locale: "tr_TR",
  // Google Workspace alias; info@maiamari.art ortak kutusuna düşer (18.09.2026).
  email: "cihan@maiamari.art",
  location: "Ankara · Remote",
  availability: "Yeni proje alımı açık",
  // Client-facing response-time promise — adjust to your real cadence.
  responseTime: "Mesajlara genelde 48 saat içinde dönüş yaparım.",
  socials: [
    // EAXEA is the founder's GitHub username, not the public brand.
    { label: "GitHub", handle: "EAXEA", href: "https://github.com/EAXEA" },
    {
      label: "Email",
      handle: "cihan@maiamari.art",
      href: "mailto:cihan@maiamari.art",
    },
  ],
  nav: [
    { label: "Hakkımda", href: "/hakkimda" },
    { label: "İşler", href: "/work" },
    { label: "İletişim", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
