/** Studio page content. */

export const capabilities = [
  "Art Direction",
  "Design Systems",
  "Motion / GSAP",
  "WebGL / R3F",
  "Next.js / TypeScript",
  "Performans & SEO",
  "Erişilebilirlik",
  "AI / Vibe Coding",
  "Video & Kurgu / Premiere",
  "Belgesel Prodüksiyon",
  "Animasyon / Blender",
];

export type Credit = { title: string; tag: string; year: string; note: string };

/** Screen/production history — proof for the Video & Film service. */
export const productionCredits: Credit[] = [
  {
    title: "Oyun",
    tag: "Belgesel dizi · HBO Max",
    year: "2022",
    note: "Video oyunlarının gelişimini konu alan yapımda kamera ve post-prodüksiyon katkısı.",
  },
  {
    title: "Duvarların Ardında",
    tag: "Belgesel · Kurgu, montaj & ses",
    year: "2022",
    note: "Ankara'daki diplomatik misyonların tarihine odaklanan belgesel; kurgu, montaj ve ses tasarımını bağımsız yürüttüm. Basında haber konusu oldu.",
  },
  {
    title: "İki Teker Özgürlük",
    tag: "Belgesel · Kurgu & montaj",
    year: "2022",
    note: "Üç kişilik ekiple üretilen bisiklet belgeseli; kurgu ve montaj bende.",
  },
  {
    title: "European Union in Turkey",
    tag: "Kurumsal video",
    year: "2021",
    note: "Suriyeli çocukların eğitimi temalı kurumsal film; kurgu, montaj ve çok dilli içerik süreci.",
  },
  {
    title: "Ceyhan Propan Terminali",
    tag: "Tanıtım filmi · CAD animasyon overlay",
    year: "2026",
    note: "Endüstriyel tanıtım filmine mühendislik ölçülerini işleyen Blender overlay animasyonları.",
  },
];

export type Principle = { t: string; d: string };

export const principles: Principle[] = [
  {
    t: "Sahne, sayfa değil",
    d: "Her proje bir deneyim olarak kurgulanır. Akış, ritim ve geçişler tek bir dile bağlanır.",
  },
  {
    t: "Cesur ama okunaklı",
    d: "Gösteri hiçbir zaman içeriğin önüne geçmez. Hareket anlamı güçlendirir, dağıtmaz.",
  },
  {
    t: "Hız bir özelliktir",
    d: "Görsel iddia ile performans birlikte gelir. Mobilde de hızlı, hafif ve sağlam.",
  },
];
