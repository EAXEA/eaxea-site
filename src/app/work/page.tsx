import type { Metadata } from "next";
import { work } from "@/data/work";
import WorkCard from "@/components/work/WorkCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "İşler",
  description:
    "Seçili işler — marka siteleri, ürün arayüzleri ve deneysel web deneyimleri.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ Seçili işler ]"
        title="İşler"
        intro="Marka siteleri, ürün arayüzleri ve deneysel web deneyimleri. Her biri kendi sahnesi olan, tasarım ve kodun birlikte düşünüldüğü projeler."
      />

      <section className="mx-auto max-w-[1400px] px-5 pb-32 md:px-8">
        <div>
          {work.map((study, i) => (
            <WorkCard key={study.slug} study={study} index={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>
    </>
  );
}
