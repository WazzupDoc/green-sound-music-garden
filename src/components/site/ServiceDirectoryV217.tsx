import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services, type ServiceSlug } from "@/data/site";
import { ChapterSigilV217, ServiceSigilV217 } from "./ServiceSigilV217";

const groups = [
  { code: "01", title: "Muzică", caption: "DJ, live & studio", icon: "music",
    slugs: ["dj-mc", "trupa", "studio-inregistrari"] },
  { code: "02", title: "Tehnică", caption: "Sunet, lumini & efecte", icon: "tech",
    slugs: ["echipamente-de-sunet-si-lumini", "masina-fum-greu-cu-gheata-carbonica"] },
  { code: "03", title: "Momente", caption: "Atmosferă pentru invitați", icon: "moments",
    slugs: ["hostess", "ursitoare-botez", "start-veselia"] },
] as const satisfies ReadonlyArray<{
  code: string; title: string; caption: string;
  icon: "music" | "tech" | "moments"; slugs: readonly ServiceSlug[];
}>;

// One-to-one with actual service catalogue; do not create fictional menu routes.
const allSlugs = groups.flatMap(group => group.slugs);
if (new Set(allSlugs).size !== services.length ||
    allSlugs.some(slug => !services.some(service => service.slug === slug))) {
  throw new Error("V217 navigation does not match the eight actual service routes");
}
const shortLabels: Record<ServiceSlug, string> = {
  "dj-mc": "DJ & MC",
  trupa: "Trupă live",
  "studio-inregistrari": "Studio de înregistrări",
  "echipamente-de-sunet-si-lumini": "Sonorizare, lumini & LED",
  "masina-fum-greu-cu-gheata-carbonica": "Fum greu & efecte",
  hostess: "Hostess",
  "ursitoare-botez": "Ursitoare pentru botez",
  "start-veselia": "Animație pentru copii",
};

type Props = { onNavigate: () => void; };
export function ServiceDirectoryV217({ onNavigate }: Props) {
  return (
    <div id="gs217-service-directory" className="gs217-directory"
      role="region" aria-label="Descoperă serviciile Green Sound Music">
      <header className="gs217-directory__head">
        <span><i aria-hidden="true" /> GREEN SOUND / PRODUCȚIE DE EVENIMENTE</span>
        <Link to="/servicii" onClick={onNavigate}>
          Toate serviciile <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </header>
      <div className="gs217-directory__grid">
        {groups.map(group => (
          <section key={group.code} className="gs217-directory__column" aria-labelledby={"gs217-group-" + group.code}>
            <div className="gs217-directory__chapter">
              <div className="gs217-directory__chapter-copy">
                <small>{group.code} / 03</small>
                <h2 id={"gs217-group-" + group.code}>{group.title}</h2>
                <p>{group.caption}</p>
              </div>
              <ChapterSigilV217 type={group.icon} />
            </div>
            <ul>
              {group.slugs.map(slug => (
                <li key={slug}>
                  <Link to={"/" + slug} onClick={onNavigate} className="gs217-directory__service">
                    <ServiceSigilV217 slug={slug} className="gs217-service-glyph" />
                    <span>{shortLabels[slug]}</span>
                    <ArrowUpRight className="gs217-directory__arrow" size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <footer className="gs217-directory__foot">
        <p>Ai în minte un eveniment? Stabilim împreună ce ai nevoie.</p>
        <Link to="/contact" onClick={onNavigate}>
          Discută proiectul <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
