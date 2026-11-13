import { Link } from "@tanstack/react-router";
import { business, navEvents, navServices } from "@/data/site";
import { Logo } from "./Logo";
import { LightDesk } from "./LightDesk";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain border-t border-border bg-ink pb-24 sm:pb-0">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
            Muzică, sunet, lumini și efecte pentru evenimente. Firmă din Pitești, activă din {business.founded}.
          </p>
          <address className="space-y-1 text-base not-italic text-foreground/85">
            <p>
              {business.address.street}, {business.address.city} {business.address.postalCode}, jud. {business.address.region}
            </p>
            <p>
              <a href={business.phoneHref} className="link-underline font-semibold">
                {business.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${business.email}`} className="link-underline">
                {business.email}
              </a>
            </p>
          </address>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Evenimente</h2>
          <ul className="space-y-2.5 text-sm">
            {navEvents.map((it) => (
              <li key={it.to}>
                <Link to={it.to} className="link-underline text-foreground/80 hover:text-foreground">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Servicii</h2>
          <ul className="space-y-2.5 text-sm">
            {navServices.map((it) => (
              <li key={it.to}>
                <Link to={it.to} className="link-underline text-foreground/80 hover:text-foreground">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Green Sound</h2>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/portofoliu" className="link-underline text-foreground/80 hover:text-foreground">Portofoliu</Link></li>
            <li><Link to="/despre-noi" className="link-underline text-foreground/80 hover:text-foreground">Despre noi</Link></li>
            <li><Link to="/contact" className="link-underline text-foreground/80 hover:text-foreground">Contact & ofertă</Link></li>
            <li><Link to="/confidentialitate" className="link-underline text-foreground/80 hover:text-foreground">Confidențialitate</Link></li>
          </ul>
          <h2 className="eyebrow mb-4 mt-8">Urmărește-ne</h2>
          <ul className="flex flex-wrap gap-2">
            {business.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-border px-3 py-1.5 text-base text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-site gs-global-light-wrap">
        <LightDesk />
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-base text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} Green Sound Music. Toate drepturile rezervate.</p>
          <p className="text-base text-[#F3F0E9]">{business.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
