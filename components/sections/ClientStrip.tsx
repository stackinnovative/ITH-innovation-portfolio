import { clientStrip, home } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function ClientStrip() {
  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-ground">
      <Container className="flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-12 md:py-9">
        <h2
          id="clients-title"
          className="m-0 font-mono text-xs font-medium tracking-eyebrow text-muted uppercase md:w-40 md:shrink-0"
        >
          {home.clientStripLabel}
        </h2>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-display text-lg font-semibold tracking-[0.02em] text-body uppercase md:gap-x-10 md:gap-y-3.5 md:text-[22px]">
          {clientStrip.map((client) => (
            <li key={client}>{client}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
