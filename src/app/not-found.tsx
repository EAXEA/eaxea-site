import Button from "@/components/ui/Button";
import { Spark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-5 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[100px]" />
      <div className="relative flex flex-col items-center gap-6">
        <Spark className="size-12" />
        <h1 className="display text-[clamp(4rem,18vw,12rem)] uppercase leading-none">
          404
        </h1>
        <p className="max-w-sm text-muted">
          Bu sahne henüz kurulmamış. Aradığın sayfa taşınmış ya da hiç var
          olmamış olabilir.
        </p>
        <Button href="/">Ana sahneye dön</Button>
      </div>
    </section>
  );
}
