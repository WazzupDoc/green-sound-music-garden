import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Phone, X, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const path = useRouterState({ select: state => state.location.pathname });
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    // Avoid dispatching React state on every scroll frame; the floating header
    // only needs to know when the 22px threshold changes.
    let aboveThreshold = window.scrollY > 22;
    setScrolled(aboveThreshold);
    const onScroll = () => {
      const next = window.scrollY > 22;
      if (next === aboveThreshold) return;
      aboveThreshold = next;
      setScrolled(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("atelier-menu-locked");
    // A navigation disclosure, not a fake modal: keyboard users enter at
    // the first real link and can Tab back into the document normally.
    const raf = window.requestAnimationFrame(() =>
      menuPanelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.cancelAnimationFrame(raf);
      document.body.classList.remove("atelier-menu-locked");
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={`atelier-header ${scrolled || open ? "atelier-header--scrolled" : ""}`}>
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
          <button ref={menuButtonRef} type="button" className="atelier-header__menu-btn" aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-controls="atelier-mobile-navigation" aria-expanded={open} onClick={() => setOpen(value => !value)}>
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="atelier-menu" ref={menuPanelRef} id="atelier-mobile-navigation" className="atelier-mobile-menu"
            initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
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
