export type ProcessStep = { n: string; title: string; body: string };

/** "Fikirden sahneye" — home + studio process section. */
export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Keşif",
    body: "Markayı, hedefi ve referans dilini çözümlerim. Ritim, ton ve teknik kısıtları netleştiririm.",
  },
  {
    n: "02",
    title: "Tasarım",
    body: "Önce iskelet, sonra görsel dil ve motion sistemi. Her bölüm bir sahne gibi kurgulanır.",
  },
  {
    n: "03",
    title: "Geliştirme",
    body: "Tasarımı piksel hassasiyetinde, performanslı ve erişilebilir koda dökerim. Next.js + TypeScript.",
  },
  {
    n: "04",
    title: "Lansman",
    body: "Mobilde bozulmayan, hızlı ve SEO dostu site. Deploy, ölçüm ve ince ayar dahil.",
  },
];
