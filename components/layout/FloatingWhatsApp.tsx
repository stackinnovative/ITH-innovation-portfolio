import { company, ui } from "@/content/site";
import { ChatIcon } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/links";

/** Phone-only floating WhatsApp link, bottom-right. Plain link — no JS. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(company.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.chatOnWhatsApp}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center bg-accent text-white hover:bg-accent-hover md:hidden"
    >
      <ChatIcon size={26} />
    </a>
  );
}
