import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Phone, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { business } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

const navigation = [
  { to: "/", title: "Acasă" },
  { to: "/evenimente", title: "Evenimente" },
  { to: "/servicii", title: "Servicii" },
  { to: "/portofoliu", title: "Portofoliu" },
  { to: "/studio-inregistrari", title: "Studio" },
  { to: "/despre-noi", title: "Despre noi" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: state => state.location.pathname });
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("atelier-menu-locked");
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.classList.remove("atelier-menu-locked");
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <header className={`atelier-header ${scrolled || open ? "atelier-header--scrolled" : ""}`}>
      <a href="#continut" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">Sari la conținut</a>
      <div className="container-site atelier-header__inner">
        <Logo />
        <nav className="atelier-header__nav" aria-label="Navigare principală">
          {navigation.map((entry) => (
            <Link key={entry.to} to={entry.to} activeOptions={{ exact: entry.to === "/" }}
              activeProps={{ className: "atelier-header__link--active" }} className="atelier-header__link">
              {entry.title}
            </Link>
          ))}
        </nav>
        <div className="atelier-header__actions">
          <a href={business.phoneHref} className="atelier-header__phone" aria-label={`Sună Green Sound Music la ${business.phoneDisplay}`}>
            <Phone className="size-4" aria-hidden /> {business.phoneDisplay}
          </a>
          <Link to="/contact" className="atelier-header__quote">
            Cere ofertă <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button type="button" className="atelier-header__menu-btn" aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-controls="atelier-mobile-navigation" aria-expanded={open} onClick={() => setOpen(value => !value)}>
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="atelier-menu" id="atelier-mobile-navigation" className="atelier-mobile-menu"
            initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : .27, ease: [.16, 1, .3, 1] }}>
            <nav aria-label="Meniu mobil" className="container-site atelier-mobile-menu__body">
              {navigation.map((entry, index) => (
                <Link key={entry.to} to={entry.to} onClick={() => setOpen(false)} className="atelier-mobile-menu__link">
                  <small>0{index + 1}</small><span>{entry.title}</span><ArrowUpRight className="size-5" aria-hidden />
                </Link>
              ))}
              <div className="atelier-mobile-menu__actions">
                <a href={business.phoneHref}><Phone aria-hidden className="size-5" /> Sună</a>
                <a href={whatsappUrl(defaultWhatsappText)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden className="size-5" /> WhatsApp
                </a>
                <Link to="/contact" onClick={() => setOpen(false)}>Cere ofertă</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
