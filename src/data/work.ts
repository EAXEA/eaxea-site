export type Metric = { label: string; value: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  role: string[];
  stack: string[];
  url?: string;
  repo?: string;
  /** live status shown as a badge — e.g. "Yayında", "Konsept", "Tasarım aşamasında" */
  status: string;
  /** one-line teaser for cards */
  summary: string;
  /** opening paragraph on the case page */
  intro: string;
  challenge: string;
  approach: string[];
  outcome: string[];
  metrics: Metric[];
  /** hex used to theme the card + scene accent */
  accent: string;
  featured?: boolean;
  /** true when a real showcase video/poster exists at /showcase/{slug}.*;
   *  when false the cards fall back to a branded GradientCover. */
  media?: boolean;
};

// Ordered proof-first: live products lead, concept/in-progress work trails.
export const work: CaseStudy[] = [
  {
    slug: "maiamari-studio",
    title: "Maiamari Studio",
    client: "Maiamari Baskı Atölyesi",
    category: "Brand Site · Web Design",
    year: "2026",
    role: ["Art Direction", "Design", "Full-Stack"],
    stack: ["Next.js 16", "Tailwind 4", "Satori OG", "Vercel"],
    url: "https://www.maiamari.art",
    repo: "https://github.com/EAXEA/maimari-studio",
    status: "Yayında",
    summary:
      "Bir baskı atölyesini galeri hissi veren editorial bir marka deneyimine çevirdik.",
    intro:
      "Maiamari, fiziksel baskı işini dijitalde de hissettirmek isteyen bir atölye. Hedef: ürünleri vitrinlemek değil, atölyenin estetik dünyasını bir sanat galerisi gibi gezdirmekti.",
    challenge:
      "El emeği bir zanaatı, ucuz görünmeden ve karmaşıklaşmadan dijitale taşımak. Görsel ağırlıklı ama hızlı ve SEO dostu bir site gerekiyordu.",
    approach: [
      "Editorial grid ve geniş beyaz alanlarla galeri ritmi kurdum",
      "next/og ile dinamik, markaya özel paylaşım görselleri ürettim",
      "Tailwind 4 token mimarisiyle tutarlı bir tipografi sistemi tasarladım",
      "Görsel yoğunluğa rağmen Core Web Vitals'ı yeşilde tuttum",
    ],
    outcome: [
      "Atölyenin premium algısını yansıtan tutarlı bir marka dili",
      "Paylaşıldığında öne çıkan otomatik OG görselleri",
      "İçerik ekleme akışını basitleştiren veri-odaklı yapı",
    ],
    metrics: [
      { label: "Lighthouse", value: "98+" },
      { label: "Build", value: "Next.js 16" },
      { label: "Teslim", value: "Production" },
    ],
    accent: "#FF5C28",
    featured: true,
    media: true,
  },
  {
    slug: "iklim-icin-ogretmenler",
    title: "İklim için Öğretmenler",
    client: "Mesleki Gelişim Programı",
    category: "Platform · Education",
    year: "2026",
    role: ["Design", "Full-Stack"],
    stack: ["Web", "Content System", "Vercel"],
    url: "https://iklimicinogret.vercel.app",
    repo: "https://github.com/EAXEA/iklimicinogret",
    status: "Yayında",
    summary:
      "İklim için değişen öğretmenler için bir mesleki gelişim programı platformu.",
    intro:
      "İklim için Değişen ve Dönüştüren Öğretmenler programı; öğretmenleri iklim okuryazarlığı etrafında bir araya getiren bir mesleki gelişim girişimi. Programın dijital evi olacak bir platform gerekiyordu.",
    challenge:
      "Eğitim içeriğini, başvuru akışını ve program kimliğini tek bir net yapıda toplamak; geniş bir kitleye erişilebilir tutmak.",
    approach: [
      "Program bilgisini açık bir bilgi mimarisinde organize ettim",
      "Başvuru ve katılım akışını sadeleştirdim",
      "Sürdürülebilir, içerik eklenebilir bir yapı kurdum",
    ],
    outcome: [
      "Programın bilinirliğini artıran tek bir merkez",
      "Erişilebilir ve mobil uyumlu deneyim",
      "Kolay güncellenebilir içerik yapısı",
    ],
    metrics: [
      { label: "Odak", value: "Erişim" },
      { label: "Tip", value: "Platform" },
      { label: "Teslim", value: "Live" },
    ],
    accent: "#34D399",
    featured: true,
    media: true,
  },
  {
    slug: "bass-assistant",
    title: "Bass Assistant",
    client: "Açık kaynak / Ürün",
    category: "Product · Chrome Extension",
    year: "2026",
    role: ["Product", "Full-Stack", "Vibe Coding"],
    stack: ["JavaScript", "Chrome Extension", "AI Workflow"],
    repo: "https://github.com/EAXEA/bass-assistant-v5.6.0",
    status: "Ürün",
    summary:
      "Müzisyenler için çok-enstrümanlı ton motoru — web-first AI araştırma akışıyla.",
    intro:
      "Bass Assistant, enstrüman tonu üzerine çalışan müzisyenler için bir tarayıcı eklentisi. ChatGPT ve NotebookLM gibi araçları tek bir akışta birleştiren, web-first bir AI araştırma asistanı.",
    challenge:
      "Dağınık AI araçlarını müzisyenin iş akışına gömülü, tek tıkla erişilebilir bir yardımcıya dönüştürmek.",
    approach: [
      "Çok-enstrümanlı bir ton motorunu modüler olarak tasarladım",
      "Web-first AI araştırma akışını eklentiye entegre ettim",
      "Sürümleri klasör-bazlı ve göç edilebilir bir yapıda yönettim",
    ],
    outcome: [
      "Müzisyenin tarayıcısında yaşayan pratik bir asistan",
      "AI araçlarını tek akışta toplayan deneyim",
      "Vibe coding ile hızlı iterasyon edilen ürün",
    ],
    metrics: [
      { label: "Platform", value: "Chrome" },
      { label: "Sürüm", value: "v5.6+" },
      { label: "Tip", value: "Product" },
    ],
    accent: "#FF2D9C",
    featured: true,
    media: true,
  },
  {
    slug: "vetvital",
    title: "VetVital",
    client: "VetVital Veteriner Kliniği",
    category: "Concept · Product Site",
    year: "2026",
    role: ["Design", "Full-Stack", "Motion"],
    stack: ["Next.js 14", "Glassmorphism", "Adaptive Dark"],
    repo: "https://github.com/EAXEA/vetvital",
    status: "Konsept · onay sürecinde",
    summary:
      "Premium bir veteriner kliniği için Apple HIG ilhamlı, güven veren bir portal konsepti.",
    intro:
      "VetVital, Çankaya'da premium bir veteriner kliniği. Bu, sahiplerine güven ve sıcaklık hissi veren, aynı zamanda teknolojik ve modern duran bir dijital yüz için hazırladığım konsept tasarım — şu an müşteri onay sürecinde.",
    challenge:
      "Tıbbi ciddiyet ile evcil hayvan sıcaklığını aynı arayüzde dengelemek; her cihazda kusursuz çalışan adaptif bir karanlık mod kurmak.",
    approach: [
      "Apple HIG prensipleriyle yumuşak, okunaklı bir hiyerarşi tasarladım",
      "Glassmorphism katmanlarıyla derinlik ve premium his ekledim",
      "Sistem temasına uyan adaptif dark mode kurdum",
      "Hizmet ve randevu akışını sade bir kullanıcı yolculuğuna indirdim",
    ],
    outcome: [
      "Markanın premium konumlandırmasını yansıtan modern bir portal yönü",
      "Cihazlar arası tutarlı, erişilebilir deneyim önerisi",
      "Randevu için net ve hızlı bir dönüşüm akışı kurgusu",
    ],
    metrics: [
      { label: "Tema", value: "Adaptive" },
      { label: "Sistem", value: "Apple HIG" },
      { label: "Durum", value: "Konsept" },
    ],
    accent: "#2FE0FF",
    featured: true,
    media: true,
  },
  {
    slug: "ancyra",
    title: "Ancyra",
    client: "Ancyra OÜ",
    category: "Studio Site · Cinematic",
    year: "2026",
    role: ["Art Direction", "Design", "Motion"],
    stack: ["Single-Page", "Scroll Motion", "Cinematic UI"],
    repo: "https://github.com/EAXEA/ancyra-site",
    status: "Tasarım aşamasında",
    summary:
      "Bir belgesel & film prodüksiyon stüdyosu için sinematik, tek sayfalık bir manifesto. (Devam eden tasarım)",
    intro:
      "Ancyra, belgesel ve film üreten bir prodüksiyon şirketi. Sitenin kendisinin de bir film fragmanı gibi hissetmesini hedefliyorum: az kelime, çok atmosfer. Proje hâlâ tasarım aşamasında.",
    challenge:
      "Görsel olmayan bir lansman aşamasında bile sinematik ve iddialı durmak; içeriği değil, tonu öne çıkarmak.",
    approach: [
      "Tek sayfada sahne sahne ilerleyen sinematik bir akış kurdum",
      "Scroll'u kamera hareketi gibi kullanan geçişler tasarladım",
      "Tipografiyi başlı başına bir görsel öğeye dönüştürdüm",
    ],
    outcome: [
      "Stüdyonun karakterini ilk saniyede veren güçlü bir izlenim",
      "Minimum içerikle maksimum atmosfer",
      "İçerik geldikçe büyüyebilen esnek bir iskelet",
    ],
    metrics: [
      { label: "Format", value: "Single-page" },
      { label: "His", value: "Cinematic" },
      { label: "Durum", value: "Tasarımda" },
    ],
    accent: "#6E5BFF",
  },
];

export const featuredWork = work.filter((w) => w.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return work.find((w) => w.slug === slug);
}

export function adjacentWork(slug: string) {
  const i = work.findIndex((w) => w.slug === slug);
  if (i === -1) return { next: work[0] };
  return { next: work[(i + 1) % work.length] };
}
