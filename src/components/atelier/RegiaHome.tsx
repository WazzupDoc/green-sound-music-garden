import { useState } from "react";
import { Link, useHydrated } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { events, getService, images, videos, type EventSlug } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { VideoLite } from "@/components/site/VideoLite";

const order: EventSlug[] = [
  "nunti", "botezuri", "evenimente-corporate", "concerte-festivaluri", "petreceri-private",
];
const films = [
  { video: videos.nuntaRamada, label: "Nuntă la Ramada Pitești", category: "Nuntă" },
  { video: videos.showLumini, label: "DJ, MC și show de lumini", category: "Sunet și lumini" },
  { video: videos.neatza, label: "Producție muzicală la TV", category: "Studio" },
];

export function RegiaHome() {
  const hydrated = useHydrated();
  const [selected, setSelected] = useState<EventSlug>("nunti");
  const event = events.find(item => item.slug === selected)!;
  return (
    <>
      <section className="rs-hero" aria-labelledby="rs-hero-title" data-hydrated={hydrated ? "true" : "false"}>
        <BeamPhoto image={images.concert} priority decorative className="rs-hero__photo" />
        <div className="rs-hero__veil" aria-hidden />
        <div className="container-site rs-hero__inside">
          <div className="rs-hero__copy">
            <p className="rs-hero__overline">Green Sound Music · Pitești · Din 2008</p>
            <h1 id="rs-hero-title">Seara începe <em>înainte</em> de prima piesă.</h1>
            <p>DJ & MC, muzică live, sonorizare și lumini. Pregătim scena, apoi ținem ritmul evenimentului.</p>
            <div className="rs-hero__actions">
              <a href="#alege-evenimentul" className="rs-button rs-button--chalk">
                Alege evenimentul <ArrowRight size={19} aria-hidden />
              </a>
              <Link to="/portofoliu" className="rs-button rs-button--plain">
                Privește filmările <Play size={18} aria-hidden />
              </Link>
            </div>
          </div>
          <div className="rs-hero__caption">
            <span>Din arhiva Green Sound Music</span>
            <span>Concert · scenă · public</span>
          </div>
        </div>
      </section>

      <section className="rs-programme" id="alege-evenimentul" aria-labelledby="rs-programme-title">
        <div className="container-site">
          <div className="rs-section-heading">
            <p>Evenimentul tău</p>
            <h2 id="rs-programme-title">Ce pregătim pentru seara ta</h2>
            <p>Fiecare eveniment are alt ritm. Alege-l pe al tău și vezi cum se leagă momentele.</p>
          </div>
          <div className="rs-programme__choices" role="group" aria-label="Alege tipul de eveniment">
            {order.map(slug => {
              const item = events.find(entry => entry.slug === slug)!;
              return <button type="button" key={slug} onClick={() => setSelected(slug)}
                className="rs-programme__choice" aria-pressed={selected === slug}>{item.name}</button>;
            })}
          </div>
          <div className="rs-programme__layout">
            <div className="rs-programme__intro">
              <BeamPhoto image={event.image} className="rs-programme__image" />
              <div>
                <h3>{event.name}</h3>
                <p>{event.short}</p>
                <Link to="/evenimente/$slug" params={{ slug: event.slug }} viewTransition
                  className="rs-inline-link">Detalii despre eveniment <ArrowUpRight size={18} aria-hidden /></Link>
              </div>
            </div>
            <ol className="rs-programme__timeline" aria-label={`Desfășurător propus: ${event.name}`}>
              {event.moments.map((moment, index) => {
                const service = getService(moment.service);
                return <li key={moment.title}>
                  <span className="rs-programme__number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h4>{moment.title}</h4><p>{moment.text}</p></div>
                  <Link to={`/${service.slug}`} viewTransition
                    aria-label={`Detalii despre ${service.name}`} className="rs-programme__service">
                    {service.name} <ArrowUpRight size={17} aria-hidden />
                  </Link>
                </li>;
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="rs-backstage" aria-labelledby="rs-backstage-title">
        <div className="rs-backstage__media">
          <BeamPhoto image={images.scena} className="rs-backstage__photo" />
          <p>Imagine din activitatea Green Sound Music</p>
        </div>
        <div className="rs-backstage__copy">
          <span>Din culise</span>
          <h2 id="rs-backstage-title">Înainte să intre invitații, se pregătește scena.</h2>
          <p>Montajul echipamentelor, reglajele de sunet și poziționarea luminilor fac parte din aceeași producție. Așa ajung muzica și partea tehnică să funcționeze împreună.</p>
          <Link to="/servicii" className="rs-inline-link">Vezi serviciile <ArrowUpRight size={18} aria-hidden /></Link>
        </div>
      </section>

      <section className="rs-films" aria-labelledby="rs-films-title">
        <div className="container-site">
          <div className="rs-films__top">
            <div><p>Din arhiva noastră</p><h2 id="rs-films-title">Ce se vede când începe muzica</h2></div>
            <Link to="/portofoliu" className="rs-inline-link">Tot portofoliul <ArrowUpRight size={19} aria-hidden /></Link>
          </div>
          <div className="rs-films__rail" aria-label="Filmări publicate de Green Sound Music">
            {films.map(({ video, category, label }) => (
              <article className="rs-films__item" key={video.id}>
                <VideoLite video={video} />
                <div className="rs-films__meta"><span>{category}</span><strong>{label}</strong></div>
                <Link to="/portofoliu" search={{ film: video.id }} className="rs-inline-link">
                  Filmul în arhivă <ArrowUpRight size={17} aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-closing" aria-labelledby="rs-closing-title">
        <div className="container-site rs-closing__inside">
          <div><p>Pregătești un eveniment?</p><h2 id="rs-closing-title">Spune-ne data și locația.</h2></div>
          <div><p>Îți recomandăm muzica, sunetul și luminile potrivite spațiului. Cererea se pregătește pentru WhatsApp sau email și o trimiți tu.</p>
            <Link to="/contact" className="rs-button rs-button--dark">Cere o ofertă <ArrowUpRight size={20} aria-hidden /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
