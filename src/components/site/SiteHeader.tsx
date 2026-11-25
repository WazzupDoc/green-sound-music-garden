import { Link, useRouterState } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Logo } from "./Logo";
import stageIndexCss from "@/styles/navigation-v81.css?inline";
import liveSetlistCss from "@/styles/navigation-v189.css?inline";
import restoredNavCss from "@/styles/navigation-v215.css?inline";
import productionNavCss from "@/styles/navigation-v217.css?inline";
import { ServiceDirectoryV217 } from "./ServiceDirectoryV217";
import { business, images } from "@/data/site";
import cinematicNavCss from "@/styles/navigation-v295.css?inline";
import brandNavCss from "@/styles/navigation-v299.css?inline";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

// The searchable directory is requested only when opened, not on every page load.
const FrequencyFinder = lazy(() => import("@/components/atelier/FrequencyFinder").then(module => ({ default: module.FrequencyFinder })));

const navigation = [
  { to: "/", title: "Acasă", note: "Muzică, lumină și producție", photo: images.concert },
  { to: "/servicii", title: "Servicii", note: "Muzică, sonorizare, lumini și studio", photo: images.scena },
  { to: "/evenimente", title: "Evenimente", note: "Nunți, botezuri și producții live", photo: images.dj },
  { to: "/portofoliu", title: "Portofoliu", note: "Filmele și proiectele existente", photo: images.concert },
  { to: "/studio-inregistrari", title: "Studio", note: "Înregistrări și producție audio", photo: null },
  { to: "/despre-noi", title: "Despre noi", note: "Povestea și abordarea echipei", photo: images.hostess },
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

  const preview = navigation[menuSelection] ?? navigation[0];

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
      <style>{cinematicNavCss}</style>
      <style>{brandNavCss}</style>
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
              <Link to="/servicii" viewTransition className="atelier-header__link"
                activeProps={{ className: "atelier-header__link--active" }}
                onClick={() => setServicesOpen(false)}><NavGlyph route="/servicii" /><span>Servicii</span></Link>
              <button type="button" ref={servicesButtonRef}
                className="gs217-services-toggle"
                aria-label={servicesOpen ? "Închide catalogul serviciilor" : "Deschide catalogul serviciilor"}
                aria-haspopup="true" aria-expanded={servicesOpen}
                aria-controls="gs217-service-directory"
                onClick={() => setServicesOpen(previous => !previous)}>
                <SignalIcon kind="expand" />
              </button>
              {servicesOpen && <ServiceDirectoryV217 onNavigate={() => setServicesOpen(false)} />}
            </div>
          ) : (
            <Link key={entry.to} to={entry.to} viewTransition activeOptions={{ exact: entry.to === "/" }}
              activeProps={{ className: "atelier-header__link--active" }} className="atelier-header__link">
              <NavGlyph route={entry.to} /><span>{entry.title}</span>
            </Link>
          ))}
          <Link to="/contact" viewTransition className="atelier-header__link gs302-contact-link" activeProps={{className:"atelier-header__link--active"}}><NavGlyph route="/contact" /><span>Contact</span></Link>
        </nav>
        <div className="atelier-header__actions">
          <button ref={finderButtonRef} type="button" className="atelier-header__finder-btn"
            aria-label="Caută servicii și evenimente" aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K" title="Caută servicii, evenimente și pagini (Ctrl+K)"
            onClick={() => { setOpen(false); setServicesOpen(false); setFinderActivated(true); setFinderOpen(true); }}>
            <SignalIcon kind="search" />
            <span className="gs215-search-text" aria-hidden="true">Caută</span>
            <span className="atelier-header__finder-hint" aria-hidden>⌘K</span>
          </button>
          <a href={business.phoneHref} className="atelier-header__phone" aria-label={`Sună Green Sound Music la ${business.phoneDisplay}`}>
            <SignalIcon kind="phone" /> {business.phoneDisplay}
          </a>
          <Link to="/contact" viewTransition className="atelier-header__quote">
            <NavGlyph route="headset" /> Cere ofertă <SignalIcon kind="arrow" />
          </Link>
          <button ref={menuButtonRef} type="button" className="atelier-header__menu-btn" aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-controls="atelier-mobile-navigation" aria-expanded={open} onClick={() => { setMenuSelection(Math.max(0, navigation.findIndex(item => item.to === path))); setOpen(value => !value); }}>
            <SignalIcon kind={open ? "close" : "menu"} />
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
              {open && <div className="gs295-preview" aria-hidden="true" data-section={preview.title}>
                <div className="gs295-preview__media" key={preview.to}>
                  {preview.photo ? <img src={preview.photo.src} width={preview.photo.w} height={preview.photo.h} alt="" decoding="async" /> : <svg viewBox="0 0 240 150" fill="none" aria-hidden="true" className="gs295-preview__signal"><path d="M0 75h36l12-22 12 46 17-72 14 98 16-84 14 60 13-32 14 6h92" stroke="currentColor" strokeWidth="1.5"/><path d="M0 34h240M0 116h240" stroke="currentColor" strokeOpacity=".3"/></svg>}
                </div>
                <div className="gs295-preview__caption"><small>0{menuSelection + 1} / 06</small><strong>{preview.title}</strong><span>{preview.note}</span></div>
              </div>}
              <p className="gsm-nav-index__note">Muzică, producție și oameni. Din Pitești.</p>
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
                  <li key={entry.to} className="gsm-nav-index__entry" data-preview={index === menuSelection ? "true" : "false"} style={{ "--gs295-order": index } as CSSProperties}>
                    <Link
                      to={entry.to}
                      onPointerEnter={() => setMenuSelection(index)}
                      onFocus={() => setMenuSelection(index)}
                      onClick={() => { menuNavigatingRef.current = entry.to !== path; setOpen(false); }}
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

/** Original 24-unit glyph family: shared chamfered line terminals, signal/mixer references. */
function SignalIcon({ kind }: {kind: "expand" | "search" | "phone" | "arrow" | "close" | "menu"}) {
  const paths = {
    expand: "M5 9h4l3 4 3-4h4",
    search: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM15 15l6 6",
    phone: "M5 3h4l2 6-3 2 5 5 2-3 6 2v4l-3 2C10 20 4 14 3 6z",
    arrow: "M4 12h15m-6-6 6 6-6 6",
    close: "M5 5l14 14 M19 5L5 19",
    menu: "M3 5h18M3 12h18M3 19h18",
  } as const;
  return <svg className="gs299-control-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="square" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

/** V302: hand-redrawn contours of the approved reference; no imported glyphs. */
function NavGlyph({route}: {route:string}) {
  const d: Record<string,string> = {
    "/":"M2.5 11 12 2.5 21.5 11M5.5 9.3V21h4.7v-6.8h3.6V21h4.7V9.3M17 5V3h2.8v4.5",
    "/servicii":"M2 5h8m4 0h8M2 12h3m4 0h13M2 19h12m4 0h4M10 5a2 2 0 1 0 4 0 2 2 0 1 0-4 0M5 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M14 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
    "/evenimente":"M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM7 2v5m10-5v5M3 9h18M7 13h.1m5 0h.1m5 0h.1M7 17h.1m5 0h.1m5 0h.1",
    "/portofoliu":"M3 4h18v16H3zM3 8h18M8 4v4m8-4v4M10 11l5 3-5 3z",
    "/studio-inregistrari":"M2 13h3v8H2zM7.5 8h3v13h-3zM13 3h3v18h-3zM18.5 7h3v14h-3zM3.5 16h0m5.5-5h0m5.5-5h0m5.5 4h0M2 10v-2m5.5-3V3M21.5 4V2",
    "/despre-noi":"M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM1.5 21v-2a6.8 6.8 0 0 1 13.6 0v2zM16.5 3.8a3.7 3.7 0 0 1 0 7.3M16.5 13a6 6 0 0 1 6 6v2h-5",
    "/contact":"M2 5h20v14H2zM2 5l10 8L22 5M2 19l7-8m13 8-7-8",
    headset:"M4 13V10a8 8 0 0 1 16 0v3M4 12h3v8H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM20 12h-3v8h3a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z",
  };
  return <svg className="gs300-nav-glyph gs302-reference-glyph" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d[route]??d["/"]}/></svg>;
}
