import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { business, navEvents, navServices } from "@/data/site";
import { Logo } from "./Logo";

type Item = { to: string; label: string };

function Dropdown({ label, items, all }: { label: string; items: Item[]; all: Item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
      >
        {label}
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3">
          <div className="rounded-xl border border-border bg-popover p-2 shadow-card">
            {items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-popover-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
              >
                {it.label}
              </Link>
            ))}
            <Link
              to={all.to}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-lg border-t border-border px-3 py-2.5 text-sm font-semibold text-primary"
            >
              {all.label} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || mobileOpen ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Sari la conținut
      </a>
      <div className="container-site flex h-18 items-center justify-between gap-6 py-3">
        <Logo />

        <nav aria-label="Navigare principală" className="hidden items-center gap-7 lg:flex">
          <Dropdown label="Evenimente" items={navEvents} all={{ to: "/evenimente", label: "Toate evenimentele" }} />
          <Dropdown label="Servicii" items={navServices} all={{ to: "/servicii", label: "Toate serviciile" }} />
          <Link to="/portofoliu" className="text-sm font-medium text-foreground/80 hover:text-foreground" activeProps={{ className: "text-primary" }}>
            Portofoliu
          </Link>
          <Link to="/studio-inregistrari" className="text-sm font-medium text-foreground/80 hover:text-foreground" activeProps={{ className: "text-primary" }}>
            Studio
          </Link>
          <Link to="/despre-noi" className="text-sm font-medium text-foreground/80 hover:text-foreground" activeProps={{ className: "text-primary" }}>
            Despre noi
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-foreground xl:inline-flex"
          >
            <Phone className="size-4 text-primary" aria-hidden />
            {business.phoneDisplay}
          </a>
          <Button asChild variant="hero" className="hidden h-11 px-5 sm:inline-flex">
            <Link to="/contact">Cere ofertă</Link>
          </Button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-border lg:hidden"
            aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileOpen}
            aria-controls="meniu-mobil"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="meniu-mobil" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav aria-label="Navigare mobil" className="container-site grid gap-10 py-8 pb-32">
            <div>
              <p className="eyebrow mb-4">Ce sărbătorești?</p>
              <ul className="grid gap-1">
                {navEvents.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} onClick={() => setMobileOpen(false)} className="block py-2 font-display text-2xl font-semibold">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Servicii</p>
              <ul className="grid gap-1">
                {navServices.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} onClick={() => setMobileOpen(false)} className="block py-1.5 text-lg text-foreground/85">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="grid gap-1 border-t border-border pt-6">
              {[
                { to: "/portofoliu", label: "Portofoliu" },
                { to: "/despre-noi", label: "Despre noi" },
                { to: "/contact", label: "Contact" },
              ].map((it) => (
                <li key={it.to}>
                  <Link to={it.to} onClick={() => setMobileOpen(false)} className="block py-1.5 text-lg text-foreground/85">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
