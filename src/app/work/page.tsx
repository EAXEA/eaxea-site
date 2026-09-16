import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { listedWork } from "@/data/work";
import WorkCard from "@/components/work/WorkCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata("İşler", "Seçili işler. Marka siteleri, ürün arayüzleri ve deneysel web deneyimleri.", "/work");

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
