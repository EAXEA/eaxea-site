import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { CONTROLLER, LEGAL_UPDATED } from "@/lib/legal";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata(
  "KVKK Aydınlatma Metni",
  `${site.name} iletişim formu ve e-posta yazışmalarında kişisel verilerin nasıl işlendiği: veri sorumlusu, amaç, aktarım, saklama süresi ve haklar.`,
  "/kvkk",
);

/**
 * 6698 sayılı Kanun m.10 aydınlatma metni. Kapsam bilerek dar: bu site
 * sunucuda kişisel veri toplamaz; iletişim formu ziyaretçinin kendi posta
 * uygulamasında taslak açar ve mesaj sıradan bir e-posta olarak gelir. Metin
 * gerçek akışı anlatır, olmayan bir form backend'i veya analitik iddia etmez.
 * Şablon: maiamari-studio /legal/kvkk (Devil incelemesinden geçmiş sürüm).
 */
export default function KvkkPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ KVKK ]"
        title="Aydınlatma metni"
        intro="Bu sayfa, benimle iletişime geçtiğinde kişisel verilerinin nasıl işlendiğini anlatır. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu olarak seni bilgilendirmekle yükümlüyüm."
      />

      <section className="mx-auto max-w-[1400px] px-5 pb-32 md:px-8">
        <p className="mb-12 font-mono text-xs uppercase tracking-widest text-faint">
          Son güncelleme: {LEGAL_UPDATED}
        </p>

        <div
          className="max-w-3xl space-y-5 text-base leading-relaxed text-fg/90
            [&_h2]:display [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:text-fg
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
            [&_dl]:grid [&_dl]:gap-x-8 [&_dl]:gap-y-2 md:[&_dl]:grid-cols-[max-content_1fr]
            [&_dt]:font-mono [&_dt]:text-xs [&_dt]:uppercase [&_dt]:tracking-widest [&_dt]:text-faint md:[&_dt]:pt-1
            [&_a]:text-ember [&_a]:underline [&_a]:underline-offset-4"
        >
          <h2>Veri sorumlusu</h2>
          <dl>
            <dt>Veri sorumlusu</dt>
            <dd>
              {CONTROLLER.legalName} ({CONTROLLER.tradeName}, {CONTROLLER.formType})
            </dd>
            <dt>Marka</dt>
            <dd>
              {site.name}, {site.founder}
            </dd>
            <dt>Adres</dt>
            <dd>{CONTROLLER.address}</dd>
            <dt>E-posta</dt>
            <dd>
              <a href={`mailto:${CONTROLLER.email}`}>{CONTROLLER.email}</a>
            </dd>
          </dl>

          <h2>Hangi verilerin işlenir</h2>
          <p>
            Bu site sunucusunda kişisel veri toplamaz. İletişim formu, yazdıklarını
            kendi e-posta uygulamanda hazır bir taslak olarak açar; mesaj bana
            sıradan bir e-posta olarak ulaşır. Bu yolla işlenen veriler:
          </p>
          <ul>
            <li>Adın ve e-posta adresin.</li>
            <li>Mesajında paylaştığın proje bilgileri ve yazışma içeriği.</li>
          </ul>
          <p>
            Ayrıca sitenin barındırma altyapısı, güvenlik ve hata takibi için
            erişim kayıtları (IP adresi, tarayıcı bilgisi, istek zamanı) tutar. Site
            izleme çerezi ve analitik aracı kullanmaz; yalnızca sayfanın
            çalışması için gereken teknik kayıtlar oluşur.
          </p>

          <h2>Neden işlenir</h2>
          <ul>
            <li>Talebini anlamak ve sana dönüş yapmak.</li>
            <li>Teklif hazırlamak ve proje görüşmesini yürütmek.</li>
            <li>Sitenin güvenli ve kesintisiz çalışmasını sağlamak.</li>
          </ul>

          <h2>Hukuki sebep</h2>
          <p>
            Verilerin, Kanunun 5. maddesinde sayılan şu sebeplere dayanarak
            işlenir: iletişim ve teklif süreci için, bir sözleşmenin kurulması
            amacıyla veri işlemenin gerekli olması; teknik erişim kayıtları için,
            temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun
            meşru menfaati.
          </p>

          <h2>Kimlerle paylaşılır</h2>
          <p>
            Verilerin satılmaz, reklam amacıyla paylaşılmaz. Yalnızca hizmetin
            çalışması için gereken sağlayıcılarla ve yasal zorunluluk halinde
            paylaşılır:
          </p>
          <ul>
            <li>
              E-posta altyapısı (Google Workspace): mesajının bana ulaşması ve
              yazışmanın saklanması için.
            </li>
            <li>
              Barındırma altyapısı (Vercel): sitenin sunulması ve erişim
              kayıtları için.
            </li>
            <li>Yasal yükümlülük halinde yetkili kamu kurum ve kuruluşları.</li>
          </ul>

          <h2>Yurt dışına aktarım</h2>
          <p>
            E-posta ve barındırma sağlayıcılarının sunucuları yurt dışında
            (Avrupa Birliği ve Amerika Birleşik Devletleri) bulunur. Bu kapsamda
            verilerin Kanunun 9. maddesi çerçevesinde yurt dışına aktarılır.
            Aktarım, sağlayıcılarla akdedilen ve verilerinin yalnızca ilgili
            hizmetin sunulması amacıyla, uygun güvenlik tedbirleri altında
            işlenmesini sağlayan veri işleme sözleşmelerine dayanır.
          </p>

          <h2>Ne kadar saklanır</h2>
          <p>
            Yazışman, talebin sonuçlanmasından sonra en geç bir yıl içinde
            silinir. Bir proje sözleşmesi kurulursa yazışma, sözleşme ve fatura
            kayıtları mevzuatın öngördüğü yasal saklama süreleri boyunca tutulur.
            Teknik erişim kayıtları barındırma sağlayıcısının standart süresi
            sonunda kendiliğinden silinir.
          </p>

          <h2>Hakların</h2>
          <p>Kanunun 11. maddesi uyarınca her zaman şunları isteyebilirsin:</p>
          <ul>
            <li>Kişisel verinin işlenip işlenmediğini öğrenme.</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme.</li>
            <li>İşleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
            <li>Kanundaki şartlar çerçevesinde silinmesini veya yok edilmesini isteme.</li>
            <li>
              Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere
              bildirilmesini isteme.
            </li>
            <li>
              Yalnızca otomatik sistemlerle analiz edilerek aleyhine bir sonuç
              çıkmasına itiraz etme.
            </li>
            <li>
              Hukuka aykırı işleme nedeniyle zarara uğrarsan zararın giderilmesini
              talep etme.
            </li>
          </ul>

          <h2>Başvuru</h2>
          <p>
            Taleplerini <a href={`mailto:${CONTROLLER.email}`}>{CONTROLLER.email}</a>{" "}
            adresine e-posta ile ya da yukarıdaki adrese yazılı olarak
            iletebilirsin. Başvurun en geç 30 gün içinde sonuçlandırılır.
          </p>
        </div>
      </section>
    </>
  );
}
