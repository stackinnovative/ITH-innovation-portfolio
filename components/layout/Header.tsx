import { ui } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/links";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/** Sticky main header. Desktop nav from xl (1280px); below that, call icon + full-screen menu. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between gap-8 xl:h-[88px]">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <Button href={routes.contact} size="sm" arrow className="max-md:hidden">
            {ui.requestQuote}
          </Button>
          <MobileMenu logo={<Logo />} />
        </div>
      </Container>
    </header>
  );
}
