import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

/** Sticky conversion bar on phones: call, WhatsApp, quote. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden">
      <div className="grid grid-cols-3">
        <a href={business.phoneHref} className="flex flex-col items-center gap-1 py-3 text-xs font-medium">
          <Phone className="size-5 text-primary" aria-hidden />
          Sună
        </a>
        <a
          href={whatsappUrl(defaultWhatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-border py-3 text-xs font-medium"
        >
          <MessageCircle className="size-5 text-primary" aria-hidden />
          WhatsApp
        </a>
        <Link to="/contact" className="flex flex-col items-center gap-1 bg-primary py-3 text-xs font-semibold text-primary-foreground">
          <FileText className="size-5" aria-hidden />
          Cere ofertă
        </Link>
      </div>
    </div>
  );
}
