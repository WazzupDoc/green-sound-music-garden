import { Link } from "@tanstack/react-router";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { business } from "@/data/site";
import recoveryCss from "@/styles/signal-recovery-v226.css?inline";

/** Recovery paths must be actual site routes, not a simulated search or contact submission. */
export function StageFallback({ variant, onRetry }: { variant: "missing" | "error"; onRetry?: () => void }) {
  const missing = variant === "missing";
  return (
    <section className="rs-404 gs-recovery" aria-labelledby="rs-404-title" data-variant={variant}>
      <style>{recoveryCss}</style>
      <div className="rs-404__copy">
        <p>{missing ? "404 · Pagina nu a fost găsită" : "Pagina nu s-a încărcat"}</p>
        <h1 id="rs-404-title">{missing ? "Pagina căutată nu există." : "Pagina nu poate fi afișată."}</h1>
        <p>{missing
          ? "Adresa poate fi greșită sau pagina a fost mutată. Poți explora serviciile și evenimentele sau ne poți contacta."
          : onRetry
            ? "Poți încerca din nou încărcarea. Dacă problema continuă, ne poți contacta direct."
            : "Pagina nu este disponibilă momentan. Poți reveni acasă sau ne poți contacta direct."}</p>
        <div className="rs-404__actions">
          {missing
            ? <Link to="/servicii" className="rs-button rs-button--chalk">Vezi serviciile <ArrowUpRight size={19} aria-hidden="true" /></Link>
            : onRetry ? <button type="button" onClick={onRetry} className="rs-button rs-button--chalk"><RotateCcw size={19} aria-hidden="true" /> Reîncearcă</button> : null}
          <Link to="/" className="rs-button rs-button--plain">Înapoi acasă</Link>
        </div>
        {!missing && (
          <nav aria-label="Contact în caz de eroare" className="mt-6 text-base">
            <Link to="/contact" hash="contact-form-title" className="link-underline">Contactează echipa Green Sound <ArrowUpRight size={16} aria-hidden="true" className="inline-block" /></Link>
          </nav>
        )}
        {missing && (
          <nav aria-label="Alte pagini utile" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-base">
            <Link to="/evenimente" className="link-underline">Tipuri de evenimente</Link>
            <Link to="/contact" hash="contact-form-title" className="link-underline">Cere o ofertă</Link>
          </nav>
        )}
        <a href={business.phoneHref} className="rs-404__phone">Sună-ne: {business.phoneDisplay}</a>
      </div>
      <div className="gs-recovery__signal" aria-hidden="true">
        <div className="gs-recovery__signal-header"><span>GREEN SOUND / SIGNAL ROUTING</span><span>{missing ? "CH 404" : "CH ERR"}</span></div>
        <svg viewBox="0 0 560 420" role="presentation" focusable="false" className="gs-recovery__diagram">
          <defs><linearGradient id="gs-recovery-wave" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#B8D5B8"/><stop offset="1" stopColor="#49B768"/></linearGradient></defs>
          <path d="M35 210H525 M280 32V388" className="gs-recovery__axis"/>
          <path d="M35 210H115L131 179L148 244L165 150L181 272L200 110L219 309L237 178L252 222" className="gs-recovery__wave"/>
          <path d="M308 210H338L355 184L370 238L388 169L406 250L424 192L441 225H525" className="gs-recovery__wave gs-recovery__wave--out"/>
          <rect x="260" y="185" width="40" height="50" rx="4" className="gs-recovery__break"/>
          <path d="M271 197L289 223M289 197L271 223" className="gs-recovery__cross"/>
          <text x="35" y="40" className="gs-recovery__label">INPUT / ROUTE</text>
          <text x="525" y="40" textAnchor="end" className="gs-recovery__label">OUTPUT / HOME</text>
          <text x="280" y="360" textAnchor="middle" className="gs-recovery__status">{missing ? "SIGNAL NOT FOUND" : "SIGNAL INTERRUPTED"}</text>
          <text x="280" y="383" textAnchor="middle" className="gs-recovery__label">RECONNECT VIA NAVIGATION</text>
        </svg>
        <div className="gs-recovery__signal-footer"><span>01 / ROUTE</span><span>02 / RECOVER</span><span>03 / CONTINUE</span></div>
      </div>
    </section>
  );
}
