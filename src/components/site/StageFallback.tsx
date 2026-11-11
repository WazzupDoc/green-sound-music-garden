import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Headphones, Home, Music2, RotateCcw } from "lucide-react";
import { business, images } from "@/data/site";

type StageFallbackProps = {
  variant: "missing" | "error";
  onRetry?: () => void;
};

/** A branded recovery destination, never a broken/decorative 404 cul-de-sac. */
export function StageFallback({ variant, onRetry }: StageFallbackProps) {
  const missing = variant === "missing";

  return (
    <section className="gs-offstage" aria-labelledby="gs-offstage-title" data-variant={variant}>
      <div className="gs-offstage__ambient" aria-hidden="true">
        <span className="gs-offstage__orbit gs-offstage__orbit--a" />
        <span className="gs-offstage__orbit gs-offstage__orbit--b" />
        <span className="gs-offstage__orbit gs-offstage__orbit--c" />
      </div>
      <div className="container-site gs-offstage__layout">
        <div className="gs-offstage__copy">
          <span className="gs-offstage__index">
            <Music2 className="size-4" aria-hidden />
            GREEN SOUND MUSIC / {missing ? "PAGINĂ NEGĂSITĂ" : "PAUZĂ TEHNICĂ"}
          </span>
          <p className="gs-offstage__number" aria-hidden="true">{missing ? "404" : "OOPS"}</p>
          <h1 id="gs-offstage-title">
            {missing ? (
              <>Aici încă nu a început <em>spectacolul.</em></>
            ) : (
              <>S-a întrerupt un moment. <em>Nu și atmosfera.</em></>
            )}
          </h1>
          <p className="gs-offstage__lead">
            {missing
              ? "Pagina pe care o cauți nu se află pe scena noastră. Dar putem fi prezenți la petrecerea ta — cu muzică, sunet și lumini."
              : "Această pagină nu s-a încărcat corect. Poți încerca din nou sau ne poți contacta direct pentru evenimentul tău."}
          </p>
          <div className="gs-offstage__actions">
            {missing ? (
              <Link className="gs-offstage__primary" to="/contact">
                Hai să facem atmosfera <ArrowUpRight className="size-5" aria-hidden />
              </Link>
            ) : (
              <button className="gs-offstage__primary" type="button" onClick={onRetry}>
                <RotateCcw className="size-5" aria-hidden /> Reîncearcă încărcarea
              </button>
            )}
            <Link className="gs-offstage__secondary" to="/">
              <Home className="size-4" aria-hidden /> Înapoi acasă
            </Link>
          </div>
          <div className="gs-offstage__extra">
            <span>SAU DESCOPERĂ</span>
            <Link to="/evenimente">Experiențele noastre <ArrowRight className="size-4" aria-hidden /></Link>
            <a href={business.phoneHref}>Sună-ne direct <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
        </div>

        <div className="gs-offstage__scene" aria-hidden="true">
          <img src={images.concert.src} alt="" loading="lazy" decoding="async"
            width={images.concert.w} height={images.concert.h} />
          <div className="gs-offstage__scrim" />
          <div className="gs-offstage__frame">
            <span>GREEN SOUND / LIVE EXPERIENCES</span>
            <Headphones className="size-6" />
          </div>
          <div className="gs-offstage__stage-title">
            <span className="gs-offstage__line">THE NEXT</span>
            <strong>SHOW IS <i>YOURS.</i></strong>
          </div>
          <div className="gs-offstage__wave">
            <div className="gs-offstage__wave-bars">
              {[24,48,73,37,88,56,30,64,100,72,43,91,54,35,76,48,99,58,32,66,85,47,24].map((n,i) => (
                <span key={i} style={{ height: `${n}%` }} />
              ))}
            </div>
            <div className="gs-offstage__wave-caption">
              <span>NO TRACK FOUND</span><span>READY / WHEN YOU ARE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
