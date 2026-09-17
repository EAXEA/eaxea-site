import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { listedWork } from "@/data/work";
import WorkCard from "@/components/work/WorkCard";
import PageHeader from "@/components/ui/PageHeader";

// The count comes from the data so the description cannot go stale when a
// case is added or unlisted.
export const metadata: Metadata = pageMetadata(
  "Web ve E-Ticaret Projeleri",
  `${listedWork.length} seçili proje: e-ticaret altyapısı, eğitim platformu, landing page ve tarayıcı eklentisi. Her biri tasarımdan koda tek elden üretildi.`,
  "/work",
);

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ Seçili işler ]"
        title="İşler"
        intro="Marka siteleri, ürün arayüzleri ve içerik sistemleri. Her biri kendi karakteri olan, tasarım ve kodun birlikte düşünüldüğü projeler."
      />

      <section className="mx-auto max-w-[1400px] px-5 pb-32 md:px-8">
        <div>
          {listedWork.map((study, i) => (
            <WorkCard key={study.slug} study={study} index={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>
    </>
  );
}
