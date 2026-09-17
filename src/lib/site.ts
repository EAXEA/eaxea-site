// Single source of truth for brand + site-wide config.
// Change `site.name` / `tagline` here and it propagates everywhere.

export const site = {
  name: "MAIA'S WORKS",
  founder: "Cihan Şenocak",
  // Legal entity behind invoices and the KVKK notice.
  // TODO: replace with the exact registered title and address before launch.
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
  // Public URL — swap to the custom domain when it's purchased.
  url: "https://eaxea-site.vercel.app",
  locale: "tr_TR",
  email: "scsenocak@gmail.com",
  location: "Ankara · Remote",
  availability: "Yeni proje alımı açık",
  // Client-facing response-time promise — adjust to your real cadence.
  responseTime: "Mesajlara genelde 48 saat içinde dönüş yaparım.",
  socials: [
    // EAXEA is the founder's GitHub username, not the public brand.
    { label: "GitHub", handle: "EAXEA", href: "https://github.com/EAXEA" },
    {
      label: "Email",
      handle: "scsenocak@gmail.com",
      href: "mailto:scsenocak@gmail.com",
    },
  ],
  nav: [
    { label: "Hakkımda", href: "/hakkimda" },
    { label: "İşler", href: "/work" },
    { label: "İletişim", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
