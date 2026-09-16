@AGENTS.md

# maiamari.web · Creative Developer Portfolyosu

> Bu dosya, Claude'un (ve herhangi bir geliştiricinin) projeye hızlı oryante olması için
> yazıldı. Kullanıcı Türkçe yazar; aksi istenmedikçe Türkçe cevap ver.

## Ne bu?
Cihan Şenocak'ın kişisel **creative developer** portfolyosu. Sattığı hizmetler:
**web design + full-stack + yapay zeka destekli geliştirme (custom code) + video & film**. Marka adı **maiamari.web** (09.09.2026 kullanıcı kararı). **EAXEA**, Cihan'ın GitHub kullanıcı adıdır; GitHub bağlantısını, repo adını veya deploy adresini marka adıyla otomatik değiştirme. Portfolyodaki Maiamari Studio projesi ayrı kalır.
Tasarım dili: koyu sinematik zemin + neon (ember/magenta/violet/cyan) + WebGL parçacık
sahnesi + glassmorphism. Motion-first ama okunaklı, hızlı ve SEO dostu.
Referans esin: Instagram reel (web.with.ai) — "futuristic digital experience".

## Stack
- **Next.js 16.2** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind v4** — config dosyası YOK; tokenlar `src/app/globals.css` içinde `@theme`
- **GSAP + ScrollTrigger** (scroll/motion) · **Lenis** (smooth scroll)
- **React Three Fiber v9 + drei + three** (hero parçacık sahnesi)
- **next/font**: Space Grotesk (display), Inter (sans), JetBrains Mono (mono)

> ⚠️ Next 16 breaking change'ler için `AGENTS.md`'ye uy: `params` async'tir,
> kod yazmadan `node_modules/next/dist/docs/`'a bakman istenir.

## Çalıştırma
```bash
npm install        # ilk kurulum (laptopta zip'i açtıktan sonra)
npm run dev        # http://localhost:3000
npm run build      # production build (TS + statik üretim doğrulaması)
```
Node 20.19+ önerilir (20.17'de yalnızca zararsız bir EBADENGINE uyarısı çıkar).

## Mimari haritası
```
src/
  app/
    layout.tsx              # fontlar, metadata, viewport, SmoothScroll + Nav + Footer + Cursor
    page.tsx                # Home: Hero → Marquee → IntroStatement → Services → FeaturedWork → Process
    studio/page.tsx         # Hakkında + ilkeler + hizmetler + süreç
    work/page.tsx           # Tüm işler listesi
    work/[slug]/page.tsx    # Case study (SSG: generateStaticParams + async params)
    contact/page.tsx        # mailto ile çalışan form
    not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx
  lib/
    site.ts                 # ⭐ TEK CONFIG: marka adı, sahip, tagline, e-posta, nav, sosyaller
    gsap.ts                 # GSAP + ScrollTrigger register + prefersReducedMotion()
    cn.ts                   # className birleştirici
  data/
    work.ts                 # ⭐ Case study içerikleri (status alanı + accent renk)
    services.ts             # 3 hizmet
  hooks/useGSAP.ts          # gsap.context tabanlı scoped/cleanup hook
  components/
    providers/SmoothScroll.tsx   # Lenis ↔ GSAP ticker senkronu (reduced-motion'da kapanır)
    motion/                 # Reveal, AnimatedHeading, Magnetic, Marquee, Cursor
    three/                  # HeroBackground (fallback kararı) → HeroCanvas → ParticleField (shader)
    layout/                 # Nav, Footer
    ui/                     # Logo (Spark), Button, PageHeader
    work/WorkCard.tsx
    sections/               # Hero, MarqueeStrip, IntroStatement, ServicesSection, FeaturedWork, ProcessSection, ContactForm
    seo/JsonLd.tsx
```

## Önemli kararlar / kurallar
- **Marka/içerik değişikliği** → önce `src/lib/site.ts` ve `src/data/*`. UI bunları okur.
- **Em-dash (—) YASAK — site geneli**: kullanıcıya görünen hiçbir metinde (data string'leri, JSX metni, meta title/description, OG, alt-text, e-posta konusu) uzun tire kullanma. Cümle içi kalıp → nokta + ayrı cümle; başlık/etiket ayırıcı → orta nokta `·` (sitenin standart ayırıcısı). Kod yorumları bu kuralın dışında.
- **"vibe coding" ifadesi kullanılmaz**: müşteri-dönük dilde "yapay zeka destekli geliştirme" + "şablon değil, özel (custom) kod" konumlaması kullanılır.
- **3D progressive enhancement**: `HeroBackground`, reduced-motion / dokunmatik (coarse pointer) /
  `deviceMemory ≤ 4` cihazlarda CSS aurora fallback'e düşer; canvas `dynamic(ssr:false)` ile ayrı bundle.
- **Reduced motion**: tüm motion primitive'leri `prefersReducedMotion()` ile no-op olur; içerik JS'siz de görünür.
- **İş durumları dürüst etiketlenir** (`work.ts` → `status`): yayında olmayan işte canlı link/buton gösterilmez.
  Şu an: Maiamari + İklim **yayında**, VetVital **konsept/onay sürecinde**, Ancyra **tasarım aşamasında**, Bass Assistant **ürün**.
- **next/og**: `conic-gradient` desteklemez (Satori). OG görselinde linear/radial-gradient kullan.
- **Tailwind v4**: yeni renk/token `globals.css` `@theme` bloğuna eklenir, ayrı config yok.

## Güncel devir durumu (2026-09-07)
- Canlı adres `https://eaxea-site.vercel.app`. Özel domain henüz seçilmedi.
- Dokuz case study mevcut; yedisinde gerçek ekran videosu ve poster, beşinde masaüstü kapağı var.
- Medikal katalog anonim arşiv/keşif çalışması; Bass Assistant geliştirmesine ara verildi. Durumları aktif müşteri işi olarak değiştirme.
- İletişim formu kullanıcının mevcut tercihiyle mailto taslağı + kopyalama akışı. Sunucudan gönderim yapmıyor; teslim edilmiş e-posta iddiası yok.
- Next.js 16.3.4 ve uyumlu paketler kullanılıyor. Kalite kontrolleri ve yayın adımları `docs/RELEASE.md` içinde.
- Commit/push/canlı yayın için açık onay gerekir. Gerçek müşteri yorumu, showreel, özel domain ve e-posta sağlayıcısı kurulumu kullanıcıya bağlı eklerdir.

## İş akışı kuralları
- Dosya silme / destructive işlemde onay iste.
- `git push` veya canlı deploy **yalnızca açık onayla** yapılır (lokal-only varsayılan).
- Master'a push edilen her sürüm `vX.Y` semver tag'i ister (kullanıcının genel tercihi).
