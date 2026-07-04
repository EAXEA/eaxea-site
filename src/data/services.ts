export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  accent: string;
  /** live work that backs the claim — label + internal href */
  proof: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: "web-design",
    index: "01",
    title: "Web Design",
    tagline: "Premium, motion-first arayüzler",
    description:
      "Markanın karakterini taşıyan, cesur ama okunaklı arayüzler. Tipografi, ritim ve hareketi tek bir sinematik dile çeviririm.",
    deliverables: [
      "Art direction & görsel dil",
      "Design system & token mimarisi",
      "Motion & etkileşim tasarımı",
      "Responsive prototip",
    ],
    accent: "var(--color-ember)",
    proof: { label: "Canlı örnek: Maiamari Studio", href: "/work/maiamari-studio" },
  },
  {
    id: "full-stack",
    index: "02",
    title: "Full-Stack",
    tagline: "Tasarımdan production'a uçtan uca",
    description:
      "Next.js, TypeScript ve modern altyapıyla hızlı, güvenli ve sürdürülebilir ürünler. Tasarımı piksel hassasiyetinde koda döker, deploy ve performansa kadar sahiplenirim.",
    deliverables: [
      "Next.js / TypeScript geliştirme",
      "API & veri entegrasyonu",
      "SEO, performans, erişilebilirlik",
      "Deploy & bakım",
    ],
    accent: "var(--color-violet)",
    proof: { label: "Canlı örnek: Fixgo", href: "/work/fixgo" },
  },
  {
    id: "hizli-mvp",
    index: "03",
    title: "Hızlı MVP",
    tagline: "Fikirden çalışan ürüne, günler içinde",
    description:
      "Fikirden çalışan ürüne en kısa yoldan. AI destekli iş akışlarıyla (vibe coding) prototip, MVP ve deneysel arayüzleri günler içinde yayına alırım — kalite ve kontrolü kaybetmeden.",
    deliverables: [
      "Hızlı prototip & MVP",
      "AI destekli iş akışı kurulumu",
      "Deneysel UI / WebGL denemeleri",
      "İteratif ürün geliştirme",
    ],
    accent: "var(--color-cyan)",
    proof: { label: "Canlı örnek: Bass Assistant", href: "/work/bass-assistant" },
  },
  {
    id: "video-film",
    index: "04",
    title: "Video & Film",
    tagline: "Belgeselden kurumsal filme post-prodüksiyon",
    description:
      "Web'den önce kurgu masasındaydım: belgesel, kurumsal video ve tanıtım içerikleri. Adobe Premiere ile kurgu, ses ve renk; Blender ile animasyon ve teknik overlay. Hikayeyi hangi formatta olursa olsun ekrana taşırım.",
    deliverables: [
      "Belgesel & kurumsal video kurgusu",
      "Premiere post-prodüksiyon (kurgu · ses · renk)",
      "Tanıtım & reklam içerikleri",
      "Animasyon & motion overlay (Blender)",
    ],
    accent: "var(--color-magenta)",
    proof: { label: "Ekran geçmişini gör", href: "/studio#ekran-gecmisi" },
  },
];
