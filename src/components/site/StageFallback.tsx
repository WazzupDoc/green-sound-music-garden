import { Link } from "@tanstack/react-router";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { images, business } from "@/data/site";
export function StageFallback({variant,onRetry}:{variant:"missing"|"error";onRetry?:()=>void}){
  const missing=variant==="missing";
  return <section className="rs-404" aria-labelledby="rs-404-title" data-variant={variant}>
    <div className="rs-404__copy">
      <p>{missing?"404 · Pagina nu există":"Pagina nu s-a încărcat"}</p>
      <h1 id="rs-404-title">{missing
        ?"Aici nu a apărut nimic încă. Noi putem apărea la petrecerea ta."
        :"Am pierdut legătura cu pagina."}</h1>
      <p>{missing
        ?"Poți reveni la pagina principală sau ne poți spune ce eveniment pregătești."
        :"Reîncearcă încărcarea. Dacă problema continuă, ne poți contacta direct."}</p>
      <div className="rs-404__actions">
        {missing
          ?<Link to="/contact" className="rs-button rs-button--chalk">Discută cu noi <ArrowUpRight size={19} aria-hidden /></Link>
          :<button type="button" onClick={onRetry} className="rs-button rs-button--chalk"><RotateCcw size={19} aria-hidden /> Reîncearcă</button>}
        <Link to="/" className="rs-button rs-button--plain">Înapoi acasă</Link>
      </div>
      <a href={business.phoneHref} className="rs-404__phone">{business.phoneDisplay}</a>
    </div>
    <div className="rs-404__image">
      <img src={images.concert.src} alt={images.concert.alt}
        width={images.concert.w} height={images.concert.h} decoding="async" loading="lazy" />
    </div>
  </section>;
}
