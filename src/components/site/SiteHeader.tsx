import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Phone, X, MessageCircle, Search } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { business } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

// The searchable directory is requested only when opened, not on every page load.
const FrequencyFinder = lazy(() => import("@/components/atelier/FrequencyFinder").then(module => ({ default: module.FrequencyFinder })));

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
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderActivated, setFinderActivated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const finderButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const path = useRouterState({ select: state => state.location.pathname });
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpen(false);
    setFinderOpen(false);
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
    // Keyboard focus stays inside the expanded menu until it is closed.
    const raf = window.requestAnimationFrame(() =>
      menuPanelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const focusable = Array.from(menuPanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []).filter(element => element.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return;
      const key = event.key.toLowerCase();
      const command = (event.metaKey || event.ctrlKey) && key === "k" && !event.altKey;
      const target = event.target;
      const editing = target instanceof Element &&
        Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
      const slash = key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey &&
        !editing && !document.querySelector('[role="dialog"]');
      // Never steal keystrokes from an existing dialog or a form.
      if (!slash && !command) return;
      if (!finderOpen && document.querySelector('[role="dialog"]')) return;
      event.preventDefault();
      setOpen(false);
      setFinderActivated(true);
      setFinderOpen(previous => !previous);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [finderOpen]);

  const onFinderOpenChange = (next: boolean) => {
    // Keep the dialog root mounted after first use; Radix owns close focus.
    setFinderOpen(next);
  };

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
          <button ref={finderButtonRef} type="button" className="atelier-header__finder-btn"
            aria-label="Caută servicii și evenimente" aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K" title="Caută servicii, evenimente și pagini (Ctrl+K)"
            onClick={() => { setOpen(false); setFinderActivated(true); setFinderOpen(true); }}>
            <Search className="size-5" aria-hidden />
            <span className="atelier-header__finder-hint" aria-hidden>⌘K</span>
          </button>
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
          <motion.div key="atelier-menu" ref={menuPanelRef} id="atelier-mobile-navigation" className="atelier-mobile-menu" role="dialog" aria-modal="true" aria-label="Meniu de navigare"
            initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : .2, ease: [.2, .7, .2, 1] }}>
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
      <Suspense fallback={null}>
        {finderActivated && <FrequencyFinder open={finderOpen} onOpenChange={onFinderOpenChange}
          returnFocusRef={finderButtonRef} />}
      </Suspense>
    </header>
  );
}
