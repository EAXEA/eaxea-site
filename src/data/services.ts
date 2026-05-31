export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  accent: string;
};

export const services: Service[] = [
  {
    id: "web-design",
    index: "01",
    title: "Web Design",
    tagline: "Premium, motion-first arayüzler",
    description:
      "Markanın karakterini taşıyan, cesur ama okunaklı arayüzler. Tipografi, ritim ve hareketi tek bir sinematik dile çeviririm. Sayfa değil, sahne tasarlarım.",
    deliverables: [
      "Art direction & görsel dil",
      "Design system & token mimarisi",
      "Motion & etkileşim tasarımı",
      "Responsive prototip",
    ],
    accent: "var(--color-ember)",
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
  },
  {
    id: "vibe-coding",
    index: "03",
    title: "Vibe Coding",
    tagline: "AI destekli hızlı ürün inşası",
    description:
      "Fikirden çalışan ürüne en kısa yoldan. AI destekli iş akışlarıyla prototip, MVP ve deneysel arayüzleri günler içinde sahneye çıkarırım — kalite ve kontrolü kaybetmeden.",
    deliverables: [
      "Hızlı prototip & MVP",
      "AI destekli iş akışı kurulumu",
      "Deneysel UI / WebGL denemeleri",
      "İteratif ürün geliştirme",
    ],
    accent: "var(--color-cyan)",
  },
];
