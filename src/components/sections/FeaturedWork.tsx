import Link from "next/link";
import { featuredWork } from "@/data/work";
import ShowcaseCard from "@/components/work/ShowcaseCard";
import AnimatedHeading from "@/components/motion/AnimatedHeading";

export default function FeaturedWork() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-5">[ Seçili işler ]</p>
          <AnimatedHeading
            as="h2"
            text="Sahnedeki işler"
            className="text-[clamp(2.2rem,6vw,4.5rem)] uppercase"
          />
        </div>
        <Link
          href="/work"
          className="hidden shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-ember md:flex"
        >
          Tümü <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4 md:gap-6">
        {featuredWork.map((study, i) => (
          <ShowcaseCard key={study.slug} study={study} index={i} />
        ))}
      </div>

      <div className="mt-10 md:hidden">
        <Link
          href="/work"
          className="flex items-center gap-2 text-sm text-ember"
        >
          Tüm işleri gör <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
