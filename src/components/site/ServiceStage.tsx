import { ArrowDownRight, ArrowUpRight, Headphones, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { business, services, type Service } from "@/data/site";
import { Breadcrumbs } from "@/components/site/blocks";
import stageCss from "@/styles/service-stage-v92.css?inline";

/**
 * V92: a true production-studio opening for ALL eight detail pages.
 * Each page uses its actual first-party catalogue photo and verified copy.
 * There are no simulated hardware readouts, mock performers or auto-playing
 * sound/video. The offer CTA reaches the existing service-prefilled QuoteForm.
 */
export function ServiceStage({ service }: { service: Service }) {
  const order = services.findIndex(item => item.slug === service.slug) + 1;
  const chapter = ["dj-mc","trupa","studio-inregistrari"].includes(service.slug)
    ? "music"
    : ["echipamente-de-sunet-si-lumini","masina-fum-greu-cu-gheata-carbonica"].includes(service.slug)
      ? "technical" : "people";
  const serial = String(order).padStart(2, "0");
  const titleDensity = service.h1.length > 74 ? "long" : "regular";

  return (
    <section className="gs-v92-stage" data-chapter={chapter}
      data-title-density={titleDensity} aria-labelledby="gs-v92-stage-title">
      <style>{stageCss}</style>
      <div className="gs-v92-stage__atmosphere" aria-hidden="true">
        <span className="gs-v92-stage__light gs-v92-stage__light--left" />
        <span className="gs-v92-stage__light gs-v92-stage__light--right" />
        <span className="gs-v92-stage__grid" />
      </div>

      <div className="container-site gs-v92-stage__inner">
        <div className="gs-v92-stage__breadcrumb">
          <Breadcrumbs items={[
            { name: "Acasă", to: "/" },
            { name: "Servicii", to: "/servicii" },
            { name: service.name },
          ]} />
        </div>

        <div className="gs-v92-stage__main">
          <div className="gs-v92-stage__copy">
            <div className="gs-v92-stage__overline">
              <span className="gs-v92-stage__pulse" aria-hidden="true" />
              <span>GREEN SOUND MUSIC / PRODUCȚIE EVENIMENTE</span>
              <span className="gs-v92-stage__serial">SERVICIUL {serial} / 08</span>
            </div>
            <p className="gs-v92-stage__type">{service.eyebrow}</p>
            <h1 id="gs-v92-stage-title">{service.h1}</h1>
            <p className="gs-v92-stage__lead">{service.lead}</p>
            <div className="gs-v92-stage__actions">
              <a href="#oferta-titlu" className="gs-v92-stage__cta">
                Solicită ofertă pentru acest serviciu
                <ArrowUpRight size={21} aria-hidden="true" />
              </a>
              <a href="#din-culise" className="gs-v92-stage__more">
                Vezi ce pregătim <ArrowDownRight size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="gs-v92-stage__media">
            <div className="gs-v92-stage__photo">
              <img src={service.image.src} alt={service.image.alt}
                width={service.image.w} height={service.image.h}
                decoding="async" fetchPriority="high" />
            </div>
            <div className="gs-v92-stage__glass" aria-hidden="true" />
            <figcaption className="gs-v92-stage__media-label">
              <span>GREEN SOUND / ÎN ACȚIUNE</span>
              <strong>{service.name}</strong>
            </figcaption>
            <span className="gs-v92-stage__viewfinder" aria-hidden="true" />
            <div className="gs-v92-stage__frame-code" aria-hidden="true">
              <span>GS / {serial}</span>
              <span>PITEȘTI — ARGEȘ</span>
            </div>
          </figure>

          <div className="gs-v92-stage__vertical" aria-hidden="true">
            <span>{chapter === "music" ? "MUSIC / LIVE" : chapter === "technical" ? "TECH / SHOW" : "EVENT / PEOPLE"}</span>
          </div>
        </div>

        <div className="gs-v92-stage__bottom">
          <ol className="gs-v92-stage__highlights" aria-label="Puncte importante pentru acest serviciu">
            {service.highlights.slice(0,3).map((highlight,index) => (
              <li key={highlight.title}>
                <span className="gs-v92-stage__highlight-num">{String(index+1).padStart(2,"0")}</span>
                <strong>{highlight.title}</strong>
              </li>
            ))}
          </ol>
          <div className="gs-v92-stage__utility">
            <Link to="/servicii">Toate serviciile <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href={business.phoneHref} aria-label={`Sună Green Sound la ${business.phoneDisplay}`}>
              <Phone size={16} aria-hidden="true" /> <span>{business.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
      <span className="gs-v92-stage__edge-signal" aria-hidden="true"><Headphones size={14} /> GS / LIVE PRODUCTION</span>
    </section>
  );
}
