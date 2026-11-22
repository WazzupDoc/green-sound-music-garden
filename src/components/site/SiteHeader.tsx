import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, Phone, X, MessageCircle, Search } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Logo } from "./Logo";
import stageIndexCss from "@/styles/navigation-v81.css?inline";
import liveSetlistCss from "@/styles/navigation-v189.css?inline";
import restoredNavCss from "@/styles/navigation-v215.css?inline";
import productionNavCss from "@/styles/navigation-v217.css?inline";
import { ServiceDirectoryV217 } from "./ServiceDirectoryV217";
import { business } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

// The searchable directory is requested only when opened, not on every page load.
const FrequencyFinder = lazy(() => import("@/components/atelier/FrequencyFinder").then(module => ({ default: module.FrequencyFinder })));

const navigation = [
  { to: "/", title: "Acasă", note: "Descoperă Green Sound Music" },
  { to: "/evenimente", title: "Evenimente", note: "Nunți, botezuri și producții live" },
  { to: "/servicii", title: "Servicii", note: "Muzică, sonorizare, lumini și studio" },
  { to: "/portofoliu", title: "Portofoliu", note: "Filmele și proiectele existente" },
  { to: "/studio-inregistrari", title: "Studio", note: "Înregistrări și producție audio" },
  { to: "/despre-noi", title: "Despre noi", note: "Povestea și abordarea echipei" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const [menuSelection, setMenuSelection] = useState(1);
  const menuNavigatingRef = useRef(false);
  const menuDesktopHandoffRef = useRef(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderActivated, setFinderActivated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const finderButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDialogElement>(null);
  const path = useRouterState({ select: state => state.location.pathname });

  useEffect(() => {
    menuNavigatingRef.current = true;
    setOpen(false);
    setFinderOpen(false);
    setServicesOpen(false);
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

  // A menu opened on a narrow viewport must not trap the page after rotating
  // the device or expanding the window to the desktop navigation breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        // The mobile opener becomes hidden at this breakpoint. Return focus to
        // the equivalent visible desktop link instead of a hidden control.
        menuDesktopHandoffRef.current = Boolean(menuDialogRef.current?.open);
        setOpen(false);
      }
    };
    desktop.addEventListener("change", onDesktop);
    if (desktop.matches && menuDialogRef.current?.open) {
      menuDesktopHandoffRef.current = true;
      setOpen(false);
    }
    return () => desktop.removeEventListener("change", onDesktop);
  }, []);

  // Native modal dialog manages the actual top layer, inert background,
  // Escape and keyboard focus containment. The previous role="dialog"
  // imitation did not make page content inert.
  useEffect(() => {
    const dialog = menuDialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    menuNavigatingRef.current = false;
    document.body.classList.add("atelier-menu-locked");
    return () => {
      document.body.classList.remove("atelier-menu-locked");
      if (dialog.open) dialog.close();
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
      const hasModal = Boolean(document.querySelector('dialog[open], [role="dialog"]'));
      const slash = key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey &&
        !editing && !hasModal;
      // Never steal keystrokes from an existing dialog or a form.
      if (!slash && !command) return;
      // Do not intercept native editing shortcuts (including Ctrl+K) in forms.
      if (editing) return;
      if (!finderOpen && hasModal) return;
      event.preventDefault();
      setOpen(false);
      setFinderActivated(true);
      setFinderOpen(previous => !previous);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [finderOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !servicesRef.current?.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (!servicesRef.current?.contains(document.activeElement) &&
          document.activeElement !== servicesButtonRef.current) return;
      event.preventDefault();
      setServicesOpen(false);
      servicesButtonRef.current?.focus();
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [servicesOpen]);

  // Arrow keys are optional shortcuts within the six native links; Tab and Escape remain native.
  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLOListElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>(".gsm-nav-index__link"));
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (current < 0) return;
    let next = current;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (current + 1) % links.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (current - 1 + links.length) % links.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = links.length - 1;
    else return;
    event.preventDefault();
    links[next]?.focus();
  };

  const onFinderOpenChange = (next: boolean) => {
    // Keep the dialog root mounted after first use; Radix owns close focus.
    setFinderOpen(next);
  };

  return (
    <header className={`atelier-header ${scrolled || open ? "atelier-header--scrolled" : ""}`}>
      {/* Static, first-party CSS is present during SSR; no runtime fetch and no external script. */}
      <style>{stageIndexCss}</style>
      <style>{liveSetlistCss}</style>
      <style>{restoredNavCss}</style>
      <style>{productionNavCss}</style>
      <a href="#continut" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">Sari la conținut</a>
      <div className="container-site atelier-header__inner">
        <Logo />
        <nav className="atelier-header__nav" aria-label="Navigare principală">
          {navigation.map((entry) => entry.to === "/servicii" ? (
            <div key={entry.to} ref={servicesRef} className="gs217-services-wrap"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setServicesOpen(false);
                }
              }}>
              <Link to="/servicii" className="atelier-header__link"
                activeProps={{ className: "atelier-header__link--active" }}
                onClick={() => setServicesOpen(false)}>Servicii</Link>
              <button type="button" ref={servicesButtonRef}
                className="gs217-services-toggle"
                aria-label={servicesOpen ? "Închide catalogul serviciilor" : "Deschide catalogul serviciilor"}
                aria-haspopup="true" aria-expanded={servicesOpen}
                aria-controls="gs217-service-directory"
                onClick={() => setServicesOpen(previous => !previous)}>
                <ChevronDown aria-hidden="true" size={15} />
              </button>
              {servicesOpen && <ServiceDirectoryV217 onNavigate={() => setServicesOpen(false)} />}
            </div>
          ) : (
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
            onClick={() => { setOpen(false); setServicesOpen(false); setFinderActivated(true); setFinderOpen(true); }}>
            <Search className="size-5" aria-hidden />
            <span className="gs215-search-text" aria-hidden="true">Caută</span>
            <span className="atelier-header__finder-hint" aria-hidden>⌘K</span>
          </button>
          <a href={business.phoneHref} className="atelier-header__phone" aria-label={`Sună Green Sound Music la ${business.phoneDisplay}`}>
            <Phone className="size-4" aria-hidden /> {business.phoneDisplay}
          </a>
          <Link to="/contact" className="atelier-header__quote">
            Cere ofertă <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button ref={menuButtonRef} type="button" className="atelier-header__menu-btn" aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-controls="atelier-mobile-navigation" aria-expanded={open} onClick={() => { setMenuSelection(Math.max(0, navigation.findIndex(item => item.to === path))); setOpen(value => !value); }}>
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>
      <dialog
        ref={menuDialogRef}
        id="atelier-mobile-navigation"
        className="atelier-mobile-menu"
        aria-labelledby="gsm-stage-index-title"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
          if (menuDesktopHandoffRef.current) {
            const desktopLink = document.querySelector<HTMLAnchorElement>('.atelier-header__nav .atelier-header__link--active')
              ?? document.querySelector<HTMLAnchorElement>('.atelier-header__nav a');
            desktopLink?.focus();
          } else if (!menuNavigatingRef.current) {
            menuButtonRef.current?.focus();
          }
          menuDesktopHandoffRef.current = false;
          menuNavigatingRef.current = false;
        }}
      >
        <div className="gsm-nav-index">
          <div className="gsm-nav-index__top">
            <span className="gsm-nav-index__brand">GREEN SOUND / SCENE DIRECTORY</span>
            <button
              type="button"
              autoFocus
              className="gsm-nav-index__close"
              onClick={() => setOpen(false)}
            >
              Închide
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M5 5L19 19M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className="gsm-nav-index__stage-mark" aria-hidden="true">
            <svg viewBox="0 0 280 320" fill="none">
              <g stroke="currentColor" strokeWidth="1">
                <path d="M32 34H232L264 283H4L32 34Z" />
                <path d="M58 64H210L234 258H32L58 64Z" />
                <path d="M32 34L58 64M232 34L210 64M4 283L32 258M264 283L234 258" />
                <path d="M94 64L118 258M174 64L148 258" strokeDasharray="4 11" />
                <path d="M4 283H264" />
              </g>
            </svg>
          </div>

          <div className="gsm-nav-index__layout">
            <div className="gsm-nav-index__intro">
              <p className="gsm-nav-index__eyebrow">INDEX / 01—06</p>
              <span className="gsm-nav-index__live-mark" aria-hidden="true">GS — PRODUCTION DIRECTORY / PITEȘTI</span>
              <h2 id="gsm-stage-index-title">
                Tot ce ține
                <em> scena vie.</em>
              </h2>
              <div className="gsm189-mobile-current" aria-hidden="true">
                <span>CANAL {String(menuSelection + 1).padStart(2, "0")} / 06</span>
                <strong>{navigation[menuSelection]?.note ?? navigation[0].note}</strong>
              </div>
              <p className="gsm-nav-index__note">
                Explorează evenimentele, producția și oamenii
                din spatele Green Sound Music.
              </p>
              <div className="gsm-nav-index__cue" aria-live="off" aria-hidden="true">
                <span className="gsm-nav-index__cue-label">ACUM EXPLOREZI / {String(menuSelection + 1).padStart(2, "0")}</span>
                <strong>{navigation[menuSelection]?.title ?? "Acasă"}</strong>
                <span className="gsm-nav-index__cue-rule" />
                <small>GREEN SOUND MUSIC · EVENIMENTE / PRODUCȚIE / STUDIO</small>
              </div>
            </div>

            <nav aria-label="Navigare principală mobilă" className="gsm-nav-index__navigation">
              <ol className="gsm-nav-index__list" onKeyDown={onMenuKeyDown}>
                {navigation.map((entry, index) => (
                  <li key={entry.to} className="gsm-nav-index__entry" data-preview={index === menuSelection ? "true" : "false"}>
                    <Link
                      to={entry.to}
                      onPointerEnter={() => setMenuSelection(index)}
                      onFocus={() => setMenuSelection(index)}
                      onClick={() => { menuNavigatingRef.current = true; setOpen(false); }}
                      className="gsm-nav-index__link"
                      activeOptions={{ exact: entry.to === "/" }}
                      activeProps={{ className: "gsm-nav-index__link--active" }}
                    >
                      <small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small>
                      <span>{entry.title}</span>
                      <span className="gsm189-channel" aria-hidden="true"><i /><i /><i /><i /><i /></span>
                      <svg viewBox="0 0 28 28" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                        <path d="M5 23L23 5M9 5H23V19" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="gsm-nav-index__bottom">
            <span className="gsm-nav-index__signature">CRAFTED ATMOSPHERES · PITEȘTI</span>
            <div className="gsm-nav-index__actions">
              <a href={business.phoneHref}>Sună</a>
              <a href={whatsappUrl(defaultWhatsappText)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <Link to="/contact" onClick={() => { menuNavigatingRef.current = true; setOpen(false); }}>
                Cere ofertă
                <svg viewBox="0 0 22 22" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <path d="M3 19L19 3M8 3H19V14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </dialog>
      <Suspense fallback={null}>
        {finderActivated && <FrequencyFinder open={finderOpen} onOpenChange={onFinderOpenChange}
          returnFocusRef={finderButtonRef} />}
      </Suspense>
    </header>
  );
}
