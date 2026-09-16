/** Studio page content. */

export const capabilities = [
  "Art Direction",
  "Design Systems",
  "Motion / GSAP",
  "WebGL / R3F",
  "Next.js / TypeScript",
  "Performans & SEO",
  "Erişilebilirlik",
  "Yapay Zeka Destekli Geliştirme",
  "Video & Kurgu / Premiere",
  "Belgesel Prodüksiyon",
  "Animasyon / Blender",
];

export type Credit = {
  title: string;
  tag: string;
  year: string;
  note: string;
  /** public link that verifies the credit (watch page / trailer) */
  href?: string;
};

/** Screen/production history — proof for the Video & Film service. */
export const productionCredits: Credit[] = [
  {
    title: "Oyun",
    tag: "Belgesel dizi · HBO Max",
    year: "2022",
    note: "Video oyunlarının gelişimini konu alan belgesel dizide kamera ve post-prodüksiyon katkısı sağladım.",
    href: "https://youtu.be/XOHLhHddhSE",
  },
  {
    title: "Duvarların Ardında",
    tag: "Belgesel · Kurgu asistanı",
    year: "2022",
    note: "Ankara'daki diplomatik misyonların kuruluş tarihine odaklanan belgeselde kurgu asistanı olarak görev aldım; kurgunun bir bölümü ve ses efektleri bendeydi. Film, sahneden.net tarafından 27 Kasım 2023'te haber konusu yapıldı.",
    href: "https://www.youtube.com/watch?v=6IHz2gKnA7U",
  },
  {
    title: "İki Teker Özgürlük",
    tag: "Belgesel · Kurgu & montaj",
    year: "2022",
    note: "Radyo Televizyon Sinema bitirme projesi olarak çekilen bisiklet belgeseli; üç kişilik ekipte kurgu ve montajı üstlendim.",
    href: "https://www.youtube.com/watch?v=Ue3SB1CwMcQ",
  },
  {
    title: "European Union in Turkey",
    tag: "Kurumsal video",
    year: "2021",
    note: "Suriyeli çocukların eğitimi temalı kurumsal videoda kurgu, montaj ve çok dilli içerik süreçlerinde görev aldım.",
    href: "https://fb.watch/7GEahUMqLo",
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
  {
    t: "Şablon değil, özel kod",
    d: "Hazır tema veya site kurucu yok. Her proje sıfırdan, sana özel yazılan kodla kurulur. Sahibi, hızı ve sınırları senin olur.",
  },
];
