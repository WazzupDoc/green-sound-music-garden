import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { business, navEvents, navServices } from "@/data/site";
import { Logo } from "./Logo";

/**
 * Compact studio navigation.
 * The fullscreen navigation is a proper interaction, not a decorative screenshot.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={"gs12-header " + (scrolled || open ? "is-scrolled" : "")}>
        <a href="#continut" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-[200] focus:bg-white focus:px-3 focus:py-2 focus:text-black">
          Sari la conținut
        </a>
        <div className="gs12-header__inner container-site">
          <Logo />
          <nav aria-label="Navigare principală" className="gs12-header__links">
            <Link to="/servicii" activeProps={{ className: "is-current" }}>Servicii</Link>
            <Link to="/evenimente" activeProps={{ className: "is-current" }}>Evenimente</Link>
            <Link to="/portofoliu" activeProps={{ className: "is-current" }}>Portofoliu</Link>
            <Link to="/despre-noi" activeProps={{ className: "is-current" }}>Despre noi</Link>
          </nav>
          <div className="gs12-header__actions">
            <Link to="/contact" className="gs12-header__quote">
              CERE OFERTĂ <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className={"gs12-header__toggle " + (open ? "is-open" : "")}
              aria-label={open ? "Închide meniul complet" : "Deschide meniul complet"}
              aria-expanded={open}
              aria-controls="gs12-full-menu"
              onClick={() => setOpen(value => !value)}
            >
              <span>{open ? "CLOSE" : "MENU"}</span>
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="gs12-full-menu" className="gs12-full-menu" role="dialog" aria-label="Navigare completă" aria-modal="true">
          <div className="gs12-full-menu__inner container-site">
            <div className="gs12-full-menu__top">
              <p>GREEN SOUND MUSIC / EXPLORE</p>
              <p>PITEȘTI, ROMÂNIA · EST. 2008</p>
            </div>
            <div className="gs12-full-menu__primary">
              {[
                { to: "/", label: "Acasă" },
                { to: "/servicii", label: "Servicii" },
                { to: "/evenimente", label: "Evenimente" },
                { to: "/portofoliu", label: "Portofoliu" },
                { to: "/despre-noi", label: "Despre noi" },
                { to: "/contact", label: "Contact" },
              ].map((item, index) => (
                <Link to={item.to} key={item.to} onClick={close}>
                  <span>0{index + 1}</span> {item.label} <ArrowUpRight size={23} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="gs12-full-menu__bottom">
              <div>
                <p>CE PUTEM CREA</p>
                <div>{navServices.map(item => <Link key={item.to} to={item.to} onClick={close}>{item.label}</Link>)}</div>
              </div>
              <div>
                <p>EVENIMENTE</p>
                <div>{navEvents.map(item => <Link key={item.to} to={item.to} onClick={close}>{item.label}</Link>)}</div>
              </div>
              <div>
                <p>VORBIM DESPRE PROIECT?</p>
                <a href={business.phoneHref}>{business.phoneDisplay}</a>
                <a href={"mailto:" + business.email}>{business.email}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
