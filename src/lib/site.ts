// Single source of truth for brand + site-wide config.
// Change `site.name` / `tagline` here and it propagates everywhere.

export const site = {
  name: "MAIA'S WORKS",
  founder: "Cihan Şenocak",
  // Legal entity behind invoices and the KVKK notice.
  // TODO: replace with the exact registered title and address before launch.
  legalName: "Maiamari",
  role: "Web tasarımı ve geliştirme",
  // Hero one-liner. Bold but readable.
  tagline:
    "İşinizi doğru anlatan siteler tasarlıyorum, baştan sona kendim kodluyorum.",
  // Positioning line used in meta + footer.
  positioning: "Landing page · Kurumsal web sitesi · Ankara",
  description:
    "MAIA'S WORKS, Cihan Şenocak'ın bağımsız web tasarım ve geliştirme çalışması. İki işe odaklanıyorum: ziyaretçiyi harekete geçiren landing page'ler ve kurumsal web siteleri. Şablon kullanmıyorum, her projeyi ihtiyacınıza göre sıfırdan yazıyorum. Hız, erişilebilirlik ve arama motorunda görünürlük sonradan eklenen değil, baştan planlanan işler.",
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
