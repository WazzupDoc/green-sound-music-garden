import { ArrowUpRight, CalendarDays, MapPin, SlidersHorizontal } from "lucide-react";
import { eventTypeOptions } from "@/lib/quote";

/**
 * Native GET form. Works before React hydration and on devices with JS disabled.
 * The destination validates all query params before pre-filling the full quote form.
 * No fake "availability" claims or automatic messages.
 */
export function QuickBrief() {
  return (
    <section className="director-brief" aria-labelledby="director-brief-title">
      <div className="container-site director-brief__inner">
        <div className="director-brief__intro">
          <span className="director-brief__tag"><SlidersHorizontal className="size-4" aria-hidden /> ÎNCEPE DE AICI</span>
          <h2 id="director-brief-title">Când are loc <em>momentul tău?</em></h2>
          <p>Trei detalii sunt suficiente ca să începem discuția.</p>
        </div>
        <form action="/contact" method="get" className="director-brief__form" aria-label="Începe cererea de ofertă">
          <div className="director-brief__field">
            <label htmlFor="brief-event">Tipul evenimentului</label>
            <select id="brief-event" name="event" defaultValue="" required>
              <option value="" disabled>Alege evenimentul</option>
              {eventTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="director-brief__field">
            <label htmlFor="brief-date"><CalendarDays className="size-3.5" aria-hidden /> Data</label>
            <input id="brief-date" name="date" type="date" aria-label="Data evenimentului, opțional" />
          </div>
          <div className="director-brief__field">
            <label htmlFor="brief-location"><MapPin className="size-3.5" aria-hidden /> Locația</label>
            <input id="brief-location" name="location" type="text" maxLength={120} autoComplete="address-level2" placeholder="Pitești, Argeș..." />
          </div>
          <button className="director-brief__submit" type="submit">
            Cere ofertă <ArrowUpRight className="size-5" aria-hidden />
          </button>
        </form>
      </div>
      <div className="director-brief__rail" aria-hidden="true">
        <span>GREEN SOUND MUSIC</span><i /> DJ / MC <i /> LIVE <i /> LIGHT DESIGN <i /> STAGE PRODUCTION <i /> PITEȘTI <i /> DIN 2008
      </div>
    </section>
  );
}
