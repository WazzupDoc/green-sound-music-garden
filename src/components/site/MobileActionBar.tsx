import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

/** Sticky conversion bar on phones: call, WhatsApp, quote. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-[#0A0F15] pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="grid grid-cols-3" role="group" aria-label="Contact rapid">
        <a href={business.phoneHref} aria-label="Sună Green Sound Music" className="flex min-h-12 flex-col items-center justify-center gap-1 py-3 text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary">
          <Phone className="size-5 text-primary" aria-hidden />
          Sună
        </a>
        <a
          href={whatsappUrl(defaultWhatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Deschide WhatsApp pentru Green Sound Music" className="flex min-h-12 flex-col items-center justify-center gap-1 border-x border-border py-3 text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary"
        >
          <MessageCircle className="size-5 text-primary" aria-hidden />
          WhatsApp
        </a>
        <Link to="/contact" hash="contact-form-title" className="flex min-h-12 flex-col items-center justify-center gap-1 bg-primary py-3 text-base font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary-foreground">
          <FileText className="size-5" aria-hidden />
          Cere ofertă
        </Link>
      </div>
    </div>
  );
}
