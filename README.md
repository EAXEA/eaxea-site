# maiamari.web

Cihan Şenocak'ın web, ürün ve video çalışmalarını bir araya getiren bağımsız stüdyo portföyü.

Marka adı **maiamari.web**. **EAXEA**, Cihan'ın GitHub kullanıcı adıdır; `https://github.com/EAXEA` bağlantısı ve mevcut repo/proje adları korunur. Alan adı ve canlı yayın adresi ayrı ayarlardır; marka değişikliği bunları otomatik değiştirmez.

## Çalıştırma

Node 24 LTS kullanın. `npm ci` ardından `npm run dev` ile http://localhost:3000 üzerinde açılır.
Üretim için `npm run build` ardından `npm run start` çalıştırın. Google fontlarının ilk derlemede indirilebilmesi için ağ erişimi gerekir.

## İçerik ve yapı

- `src/lib/site.ts`: marka, iletişim ve kanonik site adresi.
- `src/data/`: projeler, hizmetler, süreç ve film kredileri.
- `public/showcase/`: gerçek ekran videoları ve kapaklar.
- `src/app/`: ana sayfa, stüdyo, işler, dokuz proje detayı, iletişim ve SEO rotaları.
- `src/hooks/useShowcaseVideo.ts`: görünürlük ve hareket tercihine duyarlı önizlemeler.

Next.js 16.3, React 19, TypeScript, Tailwind 4, GSAP, Lenis ve React Three Fiber kullanılır.
İletişim formu e-posta taslağı hazırlar veya kopyalar; sunucu üzerinden mesaj göndermez, veritabanına kaydetmez. Kurulum için secret gerekmez.

## Doğrulama ve yayın

`npm run lint`, `npm test`, `npm run build`, `npm run typecheck`, `npm audit --omit=dev`.
Üretim sunucusu açıkken `TEST_BASE_URL` ortam değişkenini sunucu adresine ayarlayıp `npm test` çalıştırmak tüm sayfaları da doğrular.
GitHub kalite iş akışı aynı kontrolleri otomatik yürütür. Ayrıntılar ve yayın onayı sınırı: [docs/RELEASE.md](docs/RELEASE.md).
