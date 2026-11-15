import { Link } from "@tanstack/react-router";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { images, business } from "@/data/site";

/** Recovery paths must be actual site routes, not a simulated search or contact submission. */
export function StageFallback({ variant, onRetry }: { variant: "missing" | "error"; onRetry?: () => void }) {
  const missing = variant === "missing";
  return (
    <section className="rs-404" aria-labelledby="rs-404-title" data-variant={variant}>
      <div className="rs-404__copy">
        <p>{missing ? "404 · Pagina nu a fost găsită" : "Pagina nu s-a încărcat"}</p>
        <h1 id="rs-404-title">{missing ? "Pagina căutată nu există." : "Am pierdut legătura cu pagina."}</h1>
        <p>{missing
          ? "Adresa poate fi greșită sau pagina a fost mutată. Poți explora serviciile și evenimentele sau ne poți contacta."
          : "Reîncearcă încărcarea. Dacă problema continuă, ne poți contacta direct."}</p>
        <div className="rs-404__actions">
          {missing
            ? <Link to="/servicii" className="rs-button rs-button--chalk">Vezi serviciile <ArrowUpRight size={19} aria-hidden="true" /></Link>
            : <button type="button" onClick={onRetry} className="rs-button rs-button--chalk"><RotateCcw size={19} aria-hidden="true" /> Reîncearcă</button>}
          <Link to="/" className="rs-button rs-button--plain">Înapoi acasă</Link>
        </div>
        {missing && (
          <nav aria-label="Alte pagini utile" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-base">
            <Link to="/evenimente" className="link-underline">Tipuri de evenimente</Link>
            <Link to="/contact" hash="contact-form-title" className="link-underline">Cere o ofertă</Link>
          </nav>
        )}
        <a href={business.phoneHref} className="rs-404__phone">{business.phoneDisplay}</a>
      </div>
      <div className="rs-404__image">
        <img src={images.concert.src} alt={images.concert.alt}
          width={images.concert.w} height={images.concert.h} decoding="async" loading="lazy" />
      </div>
    </section>
  );
}
