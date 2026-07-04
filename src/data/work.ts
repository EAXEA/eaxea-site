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
  /** completion state — "done" = iş bitti/teslim edildi, "ongoing" = iş sürüyor */
  phase: "done" | "ongoing";
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
    category: "Brand Site · E-Commerce",
    year: "2026",
    role: ["Art Direction", "Design", "Full-Stack"],
    stack: ["Next.js 16", "Tailwind 4", "Supabase + Drizzle", "iyzico", "Vercel"],
    url: "https://www.maiamari.art",
    repo: "https://github.com/EAXEA/maimari-studio",
    status: "Yayında",
    phase: "ongoing",
    summary:
      "Bir baskı atölyesini galeri hissi veren markaya, sonra kendi mağazasına çevirdik.",
    intro:
      "Maiamari, fiziksel baskı işini dijitalde de hissettirmek isteyen bir atölye. İlk faz atölyenin estetik dünyasını bir sanat galerisi gibi gezdirmekti; ikinci fazda sitenin üstüne sepetten iyzico ödemesine ve yönetim paneline kadar kendi e-ticaret altyapısını kurduk.",
    challenge:
      "El emeği bir zanaatı, ucuz görünmeden ve karmaşıklaşmadan dijitale taşımak. Görsel ağırlıklı ama hızlı ve SEO dostu bir site; üstüne komisyoncu platformlara bağımlı olmayan bir satış kanalı gerekiyordu.",
    approach: [
      "Editorial grid ve geniş beyaz alanlarla galeri ritmi kurdum",
      "next/og ile dinamik, markaya özel paylaşım görselleri ürettim",
      "Tailwind 4 token mimarisiyle tutarlı bir tipografi sistemi tasarladım",
      "Sepet, iyzico checkout, sipariş e-postaları ve admin paneliyle tam e-ticaret katmanını ekledim",
      "RLS, bcrypt ve OWASP denetimleriyle güvenliği baştan kurdum",
    ],
    outcome: [
      "Atölyenin premium algısını yansıtan tutarlı bir marka dili",
      "Aracısız satış yapan, kendi yönetim paneline sahip bir mağaza",
      "Paylaşıldığında öne çıkan otomatik OG görselleri",
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
    phase: "done",
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
    slug: "fixgo",
    title: "Fixgo",
    client: "Fixgo Teknik Servis & Kurye",
    category: "Landing · Conversion",
    year: "2026",
    role: ["Design", "Full-Stack", "SEO & A11y"],
    stack: ["Next.js 16", "Tailwind 4", "shadcn/ui", "Framer Motion"],
    url: "https://fixgo-mu.vercel.app",
    repo: "https://github.com/06fixgo/fixgo",
    status: "Yayında",
    phase: "ongoing",
    summary:
      "Kapıdan kapıya cihaz tamiri için dönüşüm odaklı, mobil öncelikli bir landing.",
    intro:
      "Fixgo, Ankara'da telefon, tablet ve laptopu adresten alıp tamir edip 2-4 saatte geri getiren bir teknik servis girişimi. Site tek bir işe odaklanıyor: ziyaretçiyi aramaya ya da WhatsApp'a en kısa yoldan taşımak.",
    challenge:
      "Güvensizliğin norm olduğu bir sektörde ilk saniyede güven kurmak; mobil trafiğin domine ettiği bir kitlede dönüşüm sürtünmesini sıfıra indirmek.",
    approach: [
      "Tüm metin, iletişim ve CTA verisini tek içerik kaynağında topladım; işletme bilgisi tek dosyadan güncelleniyor",
      "Glassmorphism'i kurala bağladım: cam etkisi sadece hero, navbar ve güven rozetlerinde",
      "Mobilde sabit Ara/WhatsApp çubuğuyla dönüşümü her ekranda tek dokunuşa indirdim",
      "Prelaunch denetimiyle kontrastı AA'ya çektim; skip-link, form hatalarında odak yönetimi ekledim",
    ],
    outcome: [
      "İlk karede boyanan LCP ile ~144 ms ölçüm, 0.011 CLS",
      "JSON-LD, sitemap ve markalı OG görselleriyle tam SEO paketi",
      "8 bölümlük, talep formuna akan dönüşüm kurgusu",
    ],
    metrics: [
      { label: "LCP", value: "144ms" },
      { label: "CLS", value: "0.011" },
      { label: "Kurgu", value: "8 bölüm" },
    ],
    accent: "#2F7DFF",
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
    stack: ["JavaScript (MV3)", "SVG UI", "AI Workflow"],
    repo: "https://github.com/EAXEA/bass-assistant-v5.6.0",
    status: "Ürün",
    phase: "ongoing",
    summary:
      "Basçılar için ton motoru: Songsterr'den tek tıkla import, AI preset'leri ve sanal knob paneli.",
    intro:
      "Bass Assistant, basçılar için bir Chrome eklentisi: Songsterr'deki tab listesini tek tıkla içe aktarıyor, her şarkı için ChatGPT ile ton preset'i üretiyor ve tonu Sire Marcus Miller V3 MA'nın sanal knob panelinde görselleştiriyor. Sıfır bağımlılık, build adımı yok.",
    challenge:
      "Dağınık AI araçlarını müzisyenin iş akışına gömülü, tek tıkla erişilebilir bir yardımcıya dönüştürmek; fiziksel bir enstrümanın kontrol hissini tarayıcıya taşımak.",
    approach: [
      "Songsterr'den setlist import'unu tek tıka indirdim; şarkılar otomatik dedup'lanarak içe alınıyor",
      "ChatGPT web otomasyonu + manuel fallback'li iki modlu AI ton üretimi kurdum",
      "Sire Marcus Miller V3 MA knob layoutunu SVG'de birebir modelledim: drag, scroll ve merkez detent etkileşimli",
      "AI önerisiyle kullanıcı ayarını ayrı katmanlarda tutan aiTone/userTone veri modelini tasarladım",
    ],
    outcome: [
      "Müzisyenin tarayıcısında yaşayan pratik bir asistan",
      "TR/EN tam i18n, popup + side panel çift arayüz",
      "Benzer-ton keşfi ve puanlamayla büyüyen kişisel ton kütüphanesi",
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
    slug: "ayneninen",
    title: "aynen.",
    client: "@ayneninen — kendi içerik markası",
    category: "Data Brand · Content Engine",
    year: "2026",
    role: ["Design", "Data", "Motion"],
    stack: ["Node.js render motoru", "Playwright", "ffmpeg", "Fraunces + Plex Mono"],
    status: "Aktif yayın",
    phase: "ongoing",
    summary:
      "Instagram için Türkçe bir veri gazetesi: her kart ve reel koddan render ediliyor.",
    intro:
      "aynen., ekonomiden coğrafyaya kaynak atıflı veri hikayeleri anlatan bir Instagram markası. Görünen her carousel kartı ve reel, elde tasarlanmak yerine spec dosyalarından okunup kendi render motorumuzla dergi kalitesinde üretiliyor.",
    challenge:
      "Sosyal medya temposunda sürekli içerik üretirken tasarım kalitesini sabit tutmak; tasarımı bir üretim bandına çevirip tek kaynaktan yeniden üretilebilir kılmak.",
    approach: [
      "İçeriği veri olarak modelledim: post ve reel'ler birer spec dosyası, gerisini motor hallediyor",
      "Playwright ile şablonu kare kare render edip ffmpeg ile 1080×1920 MP4'e çeviren pipeline kurdum",
      "Fraunces + IBM Plex Mono ve kağıt zeminli bir 'veri gazetesi' tasarım dili tanımladım",
      "Metin taşma QA'i, sahne önizlemeleri ve kaynak atıflarını pipeline'ın içine gömdüm",
    ],
    outcome: [
      "30 carousel + 13 reel, tamamı koddan: 161 kart hiç tasarım aracı açılmadan üretildi",
      "Tek komutla tüm arşivi yeniden üretebilen içerik altyapısı",
      "Hook → reveal → data → surprise kurgusuyla kodlanmış reel formatı",
    ],
    metrics: [
      { label: "Carousel", value: "30" },
      { label: "Reel", value: "13" },
      { label: "Render kart", value: "161" },
    ],
    accent: "#F5B942",
    featured: true,
    media: true,
  },
  {
    slug: "duygu-sinan-arsivi",
    title: "Duygu Sinan Arşivi",
    client: "Duygu Sinan",
    category: "Archive · Data Pipeline",
    year: "2026",
    role: ["Data Pipeline", "Otomasyon", "Bilgi Mimarisi"],
    stack: ["Python", "Pillow + pHash", "pypdf", "Statik HTML katalog"],
    status: "Teslim edildi",
    phase: "done",
    summary:
      "13 yıllık linol baskı üretimini tek bir dijital arşive dönüştüren envanter sistemi.",
    intro:
      "Duygu Sinan'ın 2013-2026 arası linol baskı üretimi; yüzlerce sertifika PDF'i ve fotoğraf halinde dağınık duruyordu. Bunu otomatik bir Python pipeline'ıyla 56 eser / 604 baskılık, filtrelenebilir tek bir arşive dönüştürdüm.",
    challenge:
      "Bozuk tablolar ve tutarsız kaynaklar arasında güvenilir tek bir envanter kurmak; yüzlerce görseli sertifikalarla insan hatası olmadan eşleştirmek.",
    approach: [
      "701 sertifika PDF'inden metin çıkarıp duplicate'leri otomatik ayıklayarak envanteri kurdum",
      "Görsel-sertifika eşleştirmesini pHash + SHA-256 + EXIF ile otomatize ettim",
      "Ardışık serial analiziyle 604 baskıyı 56 esere, 56 eseri 8 seriye grupladım",
      "Arama ve filtre destekli tek dosyalık interaktif HTML katalog teslim ettim",
    ],
    outcome: [
      "Her baskının kendi sertifikasına linklenen eksiksiz envanter",
      "Yeni eser eklenince zincirleme script'lerle yeniden inşa edilebilen arşiv",
      "Satış ve galeri takibi için tek güvenilir kaynak",
    ],
    metrics: [
      { label: "Eser", value: "56" },
      { label: "Baskı", value: "604" },
      { label: "Seri", value: "8" },
    ],
    accent: "#D94141",
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
    phase: "ongoing",
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
    slug: "meta-medikal",
    title: "Meta Medikal",
    client: "Meta Medikal Ltd. Şti.",
    category: "Rebuild · Catalog Platform",
    year: "2026",
    role: ["Keşif & Veri", "Full-Stack", "SEO/i18n"],
    stack: ["Next.js 16", "next-intl", "Tailwind 4", "ContentSource → Payload"],
    status: "Teklif aşamasında",
    phase: "ongoing",
    summary:
      "Bir medikal distribütörün eski katalog sitesini iki dilli, CMS'e hazır bir platforma taşıyan yeniden inşa.",
    intro:
      "Meta Medikal, Ankara merkezli bir medikal cihaz distribütörü. Eski katalog sitesinin tamamını tarayıp yapılandırılmış envantere çevirdim; tek kod tabanında hem statik hem CMS'li paketi destekleyen iki dilli bir Next.js iskeleti ayağa kaldırdım. Proje şu an teklif aşamasında.",
    challenge:
      "Yıllar içinde büyümüş, ikiz slug'lı ve dağınık bir katalog sitesini SEO kaybetmeden modern bir mimariye taşımak; müşterinin paket kararından bağımsız ilerleyebilen bir teknik temel kurmak.",
    approach: [
      "Eski sitenin 118 URL'ini tarayıp 43 ürün, 10 marka ve 220 görseli yapılandırılmış envantere dönüştürdüm",
      "Frontend'i veri kaynağından soyutladım: ContentSource arayüzüyle statik JSON'dan Payload CMS'e rota kodu değişmeden geçilebiliyor",
      "TR prefix'siz / EN prefix'li lokalize URL şeması ve içerik modelinden üretilen hreflang kurdum",
      "11 rota şablonunu iki dilde ayağa kaldırıp sıfır-konsol-hatası şartlı Playwright smoke testleriyle kanıtladım",
    ],
    outcome: [
      "Keşiften 301 haritasına, envanterden seed içeriğe uçtan uca hazırlık",
      "Müşterinin paket kararından bağımsız ilerleyen tek kod tabanı",
      "JSON-LD, dinamik sitemap ve i18n ile baştan kurulmuş SEO mimarisi",
    ],
    metrics: [
      { label: "Keşif", value: "118 URL" },
      { label: "Envanter", value: "43 ürün" },
      { label: "Dil", value: "TR·EN" },
    ],
    accent: "#14B8A6",
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
    phase: "ongoing",
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
    featured: true,
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
