import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CtaBandProps = {
  title: string;
  cta: string;
  href: string;
};

/** Closing call-to-action band, from the bottom of design/Projects.dc.html. */
export function CtaBand({ title, cta, href }: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" data-surface="dark" className="bg-ink text-white">
      <Container className="flex flex-col gap-6 py-12 md:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <h2 id="cta-title" className="m-0 max-w-[760px] font-display text-h2 font-bold uppercase lg:text-[56px]">
          {title}
        </h2>
        <Button href={href} size="lg" arrow className="max-sm:w-full">
          {cta}
        </Button>
      </Container>
    </section>
  );
}
