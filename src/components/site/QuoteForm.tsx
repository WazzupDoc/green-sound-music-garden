import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, Mail, MessageCircle, PencilLine } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { services } from "@/data/site";
import {
  buildQuoteMessage,
  eventTypeOptions,
  guestOptions,
  mailtoUrl,
  quoteSchema,
  whatsappUrl,
  type QuoteInput,
  type Quote,
} from "@/lib/quote";
import { Link } from "@tanstack/react-router";

type Props = {
  defaultEventType?: (typeof eventTypeOptions)[number] | undefined;
  defaultServices?: string[] | undefined;
  defaultDate?: string | undefined;
  defaultLocation?: string | undefined;
  id?: string;
};

const fieldCls =
  "w-full rounded-lg border border-input bg-foreground/[0.03] px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const labelCls = "mb-2 block text-sm font-medium text-foreground/90";

function FieldError({ id, msg }: { id: string; msg?: string | undefined }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {msg}
    </p>
  );
}

export function QuoteForm({ defaultEventType, defaultServices = [], defaultDate = "", defaultLocation = "", id = "cerere-oferta" }: Props) {
  // The visitor must explicitly choose a channel after reviewing their message.
  // Never open a popup from an asynchronous schema validation callback.
  const [prepared, setPrepared] = useState<Quote | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput, unknown, Quote>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      ...(defaultEventType ? { eventType: defaultEventType } : {}),
      date: defaultDate,
      location: defaultLocation,
      guests: "",
      services: defaultServices,
      message: "",
      consent: undefined as unknown as true,
      website: "",
    },
  });

  const onSubmit = (q: Quote) => {
    // Preparing the quote is not sending it. Both destination links are opened
    // only from a deliberate tap/click to avoid popup blockers and false success.
    setPrepared(q);
  };

  if (prepared) {
    const message = buildQuoteMessage(prepared);
    return (
      <div id={id} className="quote-preview" aria-labelledby="quote-preview-title">
        <div className="quote-preview__top" role="status">
          <CheckCircle2 className="size-5" aria-hidden />
          <span>GREEN SOUND / CERERE PREGĂTITĂ</span>
          <span className="quote-preview__step">PASUL 02 / 02</span>
        </div>
        <h3 id="quote-preview-title" className="quote-preview__title">
          Evenimentul începe <em>cu un mesaj.</em>
        </h3>
        <p className="quote-preview__intro">
          Verifică detaliile și alege unde vrei să le trimiți. <strong>Nimic nu a fost transmis încă.</strong>
        </p>

        <div className="quote-preview__ticket" aria-label="Rezumatul cererii tale">
          <div className="quote-preview__ticket-top">
            <span>YOUR EVENT / GREEN SOUND</span>
            <span>PREVIEW ONLY</span>
          </div>
          <strong className="quote-preview__event">{prepared.eventType}</strong>
          <div className="quote-preview__facts">
            <div>
              <small>DATA</small>
              <span>{prepared.date || "De stabilit"}</span>
            </div>
            <div>
              <small>LOCAȚIA</small>
              <span>{prepared.location || "De stabilit"}</span>
            </div>
          </div>
          {prepared.services.length > 0 && (
            <div className="quote-preview__services">
              <small>SERVICII SELECTATE</small>
              <div>{prepared.services.map((service) => <span key={service}>{service}</span>)}</div>
            </div>
          )}
          <p className="quote-preview__identity">Solicitat de {prepared.name}</p>
        </div>

        <details className="quote-preview__details">
          <summary>Vezi mesajul complet care va fi pregătit</summary>
          <pre>{message}</pre>
        </details>

        <div className="quote-preview__actions" aria-label="Alege cum trimiți cererea">
          <a className="quote-preview__whatsapp" href={whatsappUrl(message)}
            target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" aria-hidden />
            Deschide WhatsApp
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <a className="quote-preview__email" href={mailtoUrl(prepared, message)}>
            <Mail className="size-5" aria-hidden />
            Deschide emailul
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
        <p className="quote-preview__notice">
          În WhatsApp sau aplicația de email, verifică destinatarul și apasă „Trimite”.
          Green Sound Music nu primește mesajul până nu îl expediezi tu.
        </p>
        <button className="quote-preview__edit" type="button" onClick={() => setPrepared(null)}>
          <PencilLine className="size-4" aria-hidden /> Modifică detaliile
        </button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 md:grid-cols-2" aria-label="Cerere de ofertă">
      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div>
        <label htmlFor="q-name" className={labelCls}>Nume *</label>
        <input id="q-name" autoComplete="name" className={fieldCls} aria-invalid={!!errors.name} aria-describedby="q-name-err" {...register("name")} />
        <FieldError id="q-name-err" msg={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="q-phone" className={labelCls}>Telefon *</label>
        <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className={fieldCls} aria-invalid={!!errors.phone} aria-describedby="q-phone-err" {...register("phone")} />
        <FieldError id="q-phone-err" msg={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="q-event" className={labelCls}>Tipul evenimentului *</label>
        <select id="q-event" className={fieldCls} aria-invalid={!!errors.eventType} aria-describedby="q-event-err" defaultValue={defaultEventType ?? ""} {...register("eventType")}>
          <option value="" disabled>Alege…</option>
          {eventTypeOptions.map((o) => (
            <option key={o} value={o} className="bg-popover">{o}</option>
          ))}
        </select>
        <FieldError id="q-event-err" msg={errors.eventType?.message} />
      </div>
      <div>
        <label htmlFor="q-date" className={labelCls}>Data evenimentului</label>
        <input id="q-date" type="date" className={`${fieldCls} [color-scheme:dark]`} {...register("date")} />
      </div>

      <div>
        <label htmlFor="q-location" className={labelCls}>Localitate / locație</label>
        <input id="q-location" placeholder="ex. Pitești, restaurantul…" className={fieldCls} aria-describedby="q-loc-err" {...register("location")} />
        <FieldError id="q-loc-err" msg={errors.location?.message} />
      </div>
      <div>
        <label htmlFor="q-guests" className={labelCls}>Număr aproximativ de invitați</label>
        <select id="q-guests" className={fieldCls} defaultValue="" {...register("guests")}>
          <option value="">Alege…</option>
          {guestOptions.map((o) => (
            <option key={o} value={o} className="bg-popover">{o}</option>
          ))}
        </select>
      </div>

      <fieldset className="md:col-span-2">
        <legend className={labelCls}>Ce servicii te interesează?</legend>
        <Controller
          control={control}
          name="services"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {[...services.map((s) => s.formLabel), "Nu știu încă — recomandați-mi"].map((label) => {
                const checked = field.value?.includes(label) ?? false;
                return (
                  <label
                    key={label}
                    className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${
                      checked ? "border-primary bg-primary text-primary-foreground" : "border-input text-foreground/85 hover:border-foreground/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() =>
                        field.onChange(checked ? field.value?.filter((v) => v !== label) : [...(field.value ?? []), label])
                      }
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          )}
        />
      </fieldset>

      <div>
        <label htmlFor="q-email" className={labelCls}>Email <span className="text-muted-foreground">(opțional)</span></label>
        <input id="q-email" type="email" autoComplete="email" className={fieldCls} aria-invalid={!!errors.email} aria-describedby="q-email-err" {...register("email")} />
        <FieldError id="q-email-err" msg={errors.email?.message} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="q-message" className={labelCls}>Detalii <span className="text-muted-foreground">(opțional)</span></label>
        <textarea id="q-message" rows={4} placeholder="Program, momente speciale, preferințe muzicale…" className={fieldCls} aria-describedby="q-msg-err" {...register("message")} />
        <FieldError id="q-msg-err" msg={errors.message?.message} />
      </div>

      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm text-foreground/85">
          <input type="checkbox" className="mt-1 size-4 accent-primary" aria-describedby="q-consent-err" {...register("consent")} />
          <span>
            Sunt de acord ca Green Sound Music să folosească aceste date doar pentru a-mi răspunde la cerere. Detalii în{" "}
            <Link to="/confidentialitate" className="text-primary underline underline-offset-4">politica de confidențialitate</Link>.
          </span>
        </label>
        <FieldError id="q-consent-err" msg={errors.consent?.message} />
      </div>

      <div className="flex flex-col gap-3 md:col-span-2">
        <Button type="submit" variant="hero" size="xl" disabled={isSubmitting}
          className="w-full justify-center">
          <CheckCircle2 className="size-5" aria-hidden /> Verifică și continuă spre trimitere
          <ArrowUpRight className="size-4" aria-hidden />
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Următorul pas îți arată mesajul complet și îți oferă alegerea între WhatsApp și email.
          Nu trimitem nimic automat.
        </p>
      </div>
    </form>
  );
}
