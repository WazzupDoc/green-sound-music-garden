import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { videos, images, type ImageRef, type Video } from "@/data/site";
import { VideoLite } from "@/components/site/VideoLite";

const gallery: { image: ImageRef; label: string; overline: string }[] = [
  { image: images.dj, label: "În mijlocul petrecerii", overline: "01 / DJ & MC" },
  { image: images.scena, label: "Lumina e parte din show", overline: "02 / PRODUCTION" },
  { image: images.ursitoare2, label: "Momente cu poveste", overline: "03 / EVENTS" },
];
const film: Video = videos.nuntaRamada;

export function EditorialPortfolio() {
  return (
    <section className="crafted-portfolio section" aria-labelledby="crafted-portfolio-title">
      <div className="container-site">
        <div className="crafted-section-intro">
          <span className="crafted-index">03 / ÎN ACȚIUNE</span>
          <div>
            <h2 id="crafted-portfolio-title" className="crafted-heading">Nicio atmosferă nu seamănă <em>cu alta.</em></h2>
            <p className="crafted-section-intro__copy">Momente reale, documentate din evenimente și producții. Nu imagini de catalog.</p>
          </div>
        </div>
        <div className="crafted-portfolio__grid">
          {gallery.map((item, index) => (
            <figure key={item.image.src} className={`crafted-portfolio__piece crafted-portfolio__piece--${index + 1}`}>
              <img src={item.image.src} alt={item.image.alt} width={item.image.w} height={item.image.h}
                loading="lazy" decoding="async" />
              <figcaption>
                <span className="label-tech">{item.overline}</span>
                <strong>{item.label}</strong>
              </figcaption>
            </figure>
          ))}
          <div className="crafted-portfolio__film">
            <span className="label-tech crafted-portfolio__film-label"><Play aria-hidden className="size-4" /> VIDEO REAL / NUNTĂ</span>
            <VideoLite video={film} />
          </div>
        </div>
        <div className="crafted-portfolio__footer">
          <p>O selecție din evenimentele Green Sound Music. Filmările pornesc doar când alegi să le vezi.</p>
          <Link to="/portofoliu" className="crafted-text-link inline-flex items-center gap-2">
            Explorează portofoliul <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
