import { Link } from "@tanstack/react-router";
import { ArrowUpRight, AudioLines } from "lucide-react";

const signature = [
  18,27,38,24,55,78,41,63,35,22,74,92,58,36,81,54,39,96,
  61,27,49,72,40,88,57,31,66,94,46,73,35,18,54,87,61,26,
] as const;

/**
 * Editorial audio waveform: original, deterministic artwork. No real sound,
 * scrolling event handler, animated layout, large SVG filters or JS timeline.
 */
export function AtmosphereInterlude() {
  return (
    <section className="gs-pulse" aria-labelledby="gs-pulse-title">
      <div className="gs-pulse__head">
        <div className="container-site gs-pulse__heading">
          <span className="gs-pulse__index"><AudioLines className="size-4" aria-hidden /> GREEN SOUND / FREQUENCY</span>
          <span className="gs-pulse__number">EST. 2008 · PITEȘTI</span>
        </div>
      </div>
      <div className="container-site gs-pulse__body">
        <div className="gs-pulse__text">
          <h2 id="gs-pulse-title">Nu doar se aude. <em>Se simte.</em></h2>
          <p>Fiecare eveniment are propriul ritm. Îl transformăm în muzică, lumină și atmosferă — iar tu alegi cum vrei să-l trăiești.</p>
          <Link to="/portofoliu" className="gs-pulse__link">
            Descoperă momente reale <ArrowUpRight className="size-5" aria-hidden />
          </Link>
        </div>
        <div className="gs-pulse__art" aria-hidden="true">
          <div className="gs-pulse__wave">
            {signature.map((height,index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="gs-pulse__art-foot">
            <span>STAGE / ENERGY / EMOTION</span>
            <span>GS — 01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
