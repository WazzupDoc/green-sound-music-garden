import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, ClipboardCopy, Mail, MessageCircle, PencilLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { services } from "@/data/site";
import { quoteRecommendations, toggleQuoteService } from "@/lib/quote-service-guidance";
import {
  buildQuoteMessage,
  ADVICE_SERVICE_LABEL,
  MAX_QUOTE_SERVICES,
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
  const [discardConfirmed, setDiscardConfirmed] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const manualCopyRef = useRef<HTMLTextAreaElement>(null);
  // Ignore clipboard results from a preview that the visitor has already left.
  const copyGenerationRef = useRef(0);
  const copyPendingRef = useRef(false);
  const previewHeadingRef = useRef<HTMLHeadingElement>(null);
  const wasPreparedRef = useRef(false);

  useEffect(() => {
    if (prepared) {
      previewHeadingRef.current?.focus();
      wasPreparedRef.current = true;
    } else if (wasPreparedRef.current) {
      document.getElementById("q-name")?.focus();
      wasPreparedRef.current = false;
    }
  }, [prepared]);
  const [failedCopyAttempts, setFailedCopyAttempts] = useState(0);

  useEffect(() => {
    if (copyStatus !== "failed") return;
    // Clipboard permissions may be denied. Put keyboard users directly on
    // the selectable fallback instead of leaving focus on the failed action.
    manualCopyRef.current?.focus();
    manualCopyRef.current?.select();
  }, [copyStatus, failedCopyAttempts]);

  const copyMessage = async (message: string) => {
    if (copyPendingRef.current) return;
    copyPendingRef.current = true;
    const generation = ++copyGenerationRef.current;
    setCopyStatus("pending");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard not available");
      await navigator.clipboard.writeText(message);
      if (generation !== copyGenerationRef.current) return;
      setCopyStatus("success");
    } catch {
      if (generation !== copyGenerationRef.current) return;
      // Permissions and insecure contexts vary. Never claim the copy worked.
      // Render a keyboard-selectable alternative directly below the actions.
      setCopyStatus("failed");
      // Re-select on every denied retry, even when status is already "failed".
      setFailedCopyAttempts(attempts => attempts + 1);
    } finally {
      if (generation === copyGenerationRef.current) copyPendingRef.current = false;
    }
  };

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    control,
    setValue,
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

  const chosenServices = useWatch({ control, name: "services" }) ?? [];
  const chosenEvent = useWatch({ control, name: "eventType" });
  const suggestions = quoteRecommendations(chosenEvent);
  const selectedServiceCount = chosenServices.filter(label => label !== ADVICE_SERVICE_LABEL).length;
  const wantsAdvice = chosenServices.includes(ADVICE_SERVICE_LABEL);
  const atLimit = selectedServiceCount >= MAX_QUOTE_SERVICES;

  const toggleRecommendation = (label: string) => {
    setValue("services", toggleQuoteService(chosenServices, label),
      { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const onInvalid = (invalid: typeof errors) => {
    // Move keyboard and screen-reader users to the first actionable error.
    // The service group is controlled separately and has no registered input ref.
    const first = Object.keys(invalid).find(key => key !== "website");
    if (!first) return;
    if (first === "services") {
      document.querySelector<HTMLInputElement>(".gs-quote__choices input:not(:disabled)")?.focus();
    } else {
      setFocus(first as keyof QuoteInput);
    }
  };

  const onSubmit = (q: Quote) => {
    // Preparing the quote is not sending it. Both destination links are opened
    // only from a deliberate tap/click to avoid popup blockers and false success.
    ++copyGenerationRef.current;
    copyPendingRef.current = false;
    setCopyStatus("idle");
    setDiscardConfirmed(false);
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
        <h3 id="quote-preview-title" ref={previewHeadingRef} tabIndex={-1} className="quote-preview__title">
          Verifică mesajul înainte de trimitere.
        </h3>
        <p className="quote-preview__intro">
          Verifică detaliile și alege unde vrei să le trimiți. <strong>Nimic nu a fost transmis încă.</strong>
        </p>

        <div className="quote-preview__ticket" aria-label="Rezumatul cererii tale">
          <div className="quote-preview__ticket-top">
            <span>EVENIMENTUL TĂU / GREEN SOUND</span>
            <span>PREVIZUALIZARE</span>
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
          <div className="quote-preview__facts" aria-label="Date de contact și dimensiunea evenimentului">
            <div>
              <small>TELEFON PENTRU RĂSPUNS</small>
              <span>{prepared.phone}</span>
            </div>
            <div>
              <small>EMAIL</small>
              <span>{prepared.email || "Nespecificat"}</span>
            </div>
            <div>
              <small>INVITAȚI</small>
              <span>{prepared.guests || "Nespecificat"}</span>
            </div>
          </div>
          {prepared.services.some(service => service !== ADVICE_SERVICE_LABEL) && (
            <div className="quote-preview__services">
              <small>SERVICII SELECTATE</small>
              <div>{prepared.services.filter(service => service !== ADVICE_SERVICE_LABEL).map(service => <span key={service}>{service}</span>)}</div>
            </div>
          )}
          {prepared.services.includes(ADVICE_SERVICE_LABEL) && (
            <p className="quote-preview__identity">
              <strong>Recomandare solicitată:</strong> dorești și ajutor în alegerea serviciilor.
            </p>
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
          <button type="button" className="quote-preview__copy"
            disabled={copyStatus === "pending"} aria-busy={copyStatus === "pending"}
            onClick={() => { void copyMessage(message); }}>
            <ClipboardCopy className="size-5" aria-hidden />
            {copyStatus === "pending" ? "Se copiază…" : copyStatus === "success" ? "Mesaj copiat" : "Copiază mesajul"}
            <ArrowUpRight className="size-4" aria-hidden />
          </button>
        </div>
        <p className="quote-preview__copy-status" role="status" aria-live="polite">
          {copyStatus === "pending"
            ? "Se încearcă copierea mesajului. Nu a fost trimis automat."
            : copyStatus === "success"
            ? "Mesajul este în clipboard. Îl poți lipi în aplicația pe care o alegi; nu a fost trimis automat."
            : copyStatus === "failed"
              ? "Copierea automată nu este disponibilă în acest browser. Poți selecta și copia manual textul de mai jos."
              : "Poți copia mesajul pentru a-l trimite și prin altă aplicație."}
        </p>
        {copyStatus === "failed" && (
          <label className="quote-preview__manual">
            Selectează și copiază manual mesajul
            <textarea ref={manualCopyRef} readOnly rows={6} value={message}
              onFocus={event => event.currentTarget.select()}
              aria-label="Textul complet al cererii, selectabil pentru copiere manuală" />
          </label>
        )}
        <p className="quote-preview__notice">
          În WhatsApp sau aplicația de email, verifică destinatarul și apasă „Trimite”.
          Green Sound Music nu primește mesajul până nu îl expediezi tu.
        </p>
        <button className="quote-preview__edit" type="button" onClick={() => { ++copyGenerationRef.current; copyPendingRef.current = false; setCopyStatus("idle"); setPrepared(null); }}>
          <PencilLine className="size-4" aria-hidden /> Modifică detaliile
        </button>
        <button className="quote-preview__discard" type="button" onClick={() => {
          // Explicit privacy action: remove the visitor's details from React
          // state and RHF's retained form values, including URL-prefilled data.
          // Do not reset to the original defaults (which may contain a brief).
          ++copyGenerationRef.current;
          copyPendingRef.current = false;
          setCopyStatus("idle");
          reset({
            name: "", phone: "", email: "",
            date: "", location: "", guests: "", services: [],
            message: "", consent: undefined as unknown as true, website: "",
          });
          setPrepared(null);
          setDiscardConfirmed(true);
        }}>
          Renunță și șterge datele din formular
        </button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit, onInvalid)} onInput={() => { if (discardConfirmed) setDiscardConfirmed(false); }} noValidate className="grid gap-5 md:grid-cols-2" aria-label="Cerere de ofertă">
      <div className="gs-quote__intro md:col-span-2">
        <div className="gs-quote__stephead">
          <span>PASUL 01 / 02</span>
          <span>GREEN SOUND / DETALII EVENIMENT</span>
        </div>
        <h3>Pregătește cererea pentru evenimentul tău.</h3>
        <p>Spune-ne câteva detalii despre eveniment. Următorul pas îți arată mesajul înainte de a-l trimite.</p>
      </div>
      {discardConfirmed && (
        <p role="status" aria-live="polite" className="md:col-span-2 rounded-lg border border-primary/40 px-4 py-3 text-sm text-foreground">
          Datele introduse au fost șterse din acest formular. Nu a fost trimis niciun mesaj.
        </p>
      )}
      {Object.keys(errors).some(key => key !== "website") && (
        <p className="gs-quote__errors md:col-span-2" role="alert">
          Verifică informațiile marcate mai jos. Cererea nu a fost trimisă.
        </p>
      )}
      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div>
        <label htmlFor="q-name" className={labelCls}>Nume *</label>
        <input id="q-name" autoComplete="name" className={fieldCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "q-name-err" : undefined} {...register("name")} />
        <FieldError id="q-name-err" msg={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="q-phone" className={labelCls}>Telefon *</label>
        <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className={fieldCls} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "q-phone-err" : undefined} {...register("phone")} />
        <FieldError id="q-phone-err" msg={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="q-event" className={labelCls}>Tipul evenimentului *</label>
        <select id="q-event" className={fieldCls} aria-invalid={!!errors.eventType} aria-describedby={errors.eventType ? "q-event-err" : undefined} defaultValue={defaultEventType ?? ""} {...register("eventType")}>
          <option value="" disabled>Alege…</option>
          {eventTypeOptions.map((o) => (
            <option key={o} value={o} className="bg-popover">{o}</option>
          ))}
        </select>
        <FieldError id="q-event-err" msg={errors.eventType?.message} />
      </div>
      <div>
        <label htmlFor="q-date" className={labelCls}>Data evenimentului <span className="text-muted-foreground">(opțional)</span></label>
        <input id="q-date" type="date" className={`${fieldCls} [color-scheme:light] dark:[color-scheme:dark]`} aria-invalid={!!errors.date} aria-describedby={errors.date ? "q-date-err q-date-help" : "q-date-help"} {...register("date")} />
        <p id="q-date-help" className="mt-1.5 text-xs text-muted-foreground">Nu ai stabilit data? Lasă câmpul liber.</p>
        <FieldError id="q-date-err" msg={errors.date?.message} />
      </div>

      <div>
        <label htmlFor="q-location" className={labelCls}>Localitate / locație</label>
        <input id="q-location" placeholder="ex. Pitești, restaurantul…" className={fieldCls} aria-invalid={!!errors.location} aria-describedby={errors.location ? "q-loc-err" : undefined} {...register("location")} />
        <FieldError id="q-loc-err" msg={errors.location?.message} />
      </div>
      <div>
        <label htmlFor="q-guests" className={labelCls}>Număr aproximativ de invitați</label>
        <select id="q-guests" className={fieldCls} defaultValue="" aria-invalid={!!errors.guests} aria-describedby={errors.guests ? "q-guests-err" : undefined} {...register("guests")}>
          <option value="">Alege…</option>
          {guestOptions.map((o) => (
            <option key={o} value={o} className="bg-popover">{o}</option>
          ))}
        </select>
        <FieldError id="q-guests-err" msg={errors.guests?.message} />
      </div>

      <fieldset className="md:col-span-2 gs-quote__services" aria-describedby={errors.services ? "q-services-guide q-services-err" : "q-services-guide"}>
        <legend className={labelCls}>Ce servicii te interesează?</legend>
        <div className="gs-quote__selection-meta" id="q-services-guide">
          <span>Poți alege serviciile dorite sau ne poți cere recomandări.</span>
          <span className="gs-quote__count" role="status" aria-live="polite">
            {wantsAdvice
              ? `${selectedServiceCount} / ${MAX_QUOTE_SERVICES} SERVICII · RECOMANDARE SOLICITATĂ`
              : `${selectedServiceCount} / ${MAX_QUOTE_SERVICES} SERVICII SELECTATE`}
          </span>
        </div>
        <Controller
          control={control}
          name="services"
          render={({ field }) => (
            <div className="gs-quote__choices">
              {[...services.map((item) => item.formLabel), ADVICE_SERVICE_LABEL].map(label => {
                const checked = field.value?.includes(label) ?? false;
                const disabled = !checked && label !== ADVICE_SERVICE_LABEL &&
                  (field.value ?? []).filter(value => value !== ADVICE_SERVICE_LABEL).length >= MAX_QUOTE_SERVICES;
                return (
                  <label key={label} data-checked={checked} data-disabled={disabled}
                    className="gs-quote__choice">
                    <input type="checkbox" className="sr-only" checked={checked} disabled={disabled}
                      aria-describedby="q-services-guide" onChange={() =>
                        field.onChange(toggleQuoteService(field.value ?? [], label))} />
                    {checked ? <CheckCircle2 className="size-3.5" aria-hidden /> :
                      <span className="gs-quote__choice-plus" aria-hidden>+</span>}
                    {label}
                  </label>
                );
              })}
            </div>
          )}
        />
        <FieldError id="q-services-err" msg={errors.services?.message} />
        {atLimit && <p className="gs-quote__limit" role="status">
          Ai selectat toate cele opt servicii. Poți debifa unul pentru a modifica selecția.
        </p>}
      </fieldset>
      {suggestions.length > 0 && (
        <aside className="gs-quote__suggestions md:col-span-2" aria-labelledby="gs-quote-suggestions-title">
          <div className="gs-quote__suggestions-heading">
            <span className="gs-quote__suggestions-index">GREEN SOUND / ÎN TON CU EVENIMENTUL</span>
            <h4 id="gs-quote-suggestions-title">Idei pentru {chosenEvent?.toLowerCase()}</h4>
            <p>Servicii din oferta noastră, potrivite acestui tip de eveniment. Adaugă doar ce te interesează.</p>
          </div>
          <div className="gs-quote__suggestions-grid" role="group" aria-label="Servicii sugerate pentru eveniment">
            {suggestions.map(item => {
              const isChosen = chosenServices.includes(item.label);
              return (
                <button key={item.slug} type="button" className="gs-quote__suggestion"
                  aria-pressed={isChosen} data-selected={isChosen} disabled={!isChosen && atLimit}
                  onClick={() => toggleRecommendation(item.label)}
                  aria-label={`${isChosen ? "Elimină" : "Adaugă"} ${item.name}`}>
                  <span className="gs-quote__suggestion-icon" aria-hidden>{isChosen ? "✓" : "+"}</span>
                  <span className="gs-quote__suggestion-copy">
                    <strong>{item.name}</strong>
                    <small>{item.why}</small>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="gs-quote__suggestions-note">
            Sugestiile nu sunt pachete fixe, oferte de preț sau confirmări de disponibilitate.
          </p>
        </aside>
      )}

      <div>
        <label htmlFor="q-email" className={labelCls}>Email <span className="text-muted-foreground">(opțional)</span></label>
        <input id="q-email" type="email" autoComplete="email" className={fieldCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? "q-email-err" : undefined} {...register("email")} />
        <FieldError id="q-email-err" msg={errors.email?.message} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="q-message" className={labelCls}>Detalii <span className="text-muted-foreground">(opțional)</span></label>
        <textarea id="q-message" rows={4} placeholder="Program, momente speciale, preferințe muzicale…" className={fieldCls} aria-invalid={!!errors.message} aria-describedby={errors.message ? "q-msg-err" : undefined} {...register("message")} />
        <FieldError id="q-msg-err" msg={errors.message?.message} />
      </div>

      <div className="md:col-span-2">
        <div className="flex items-start gap-3 text-sm text-foreground/85">
          <input id="q-consent" type="checkbox" className="mt-1 size-4 shrink-0 accent-primary" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "q-consent-err" : undefined} {...register("consent")} />
          <div>
            <label htmlFor="q-consent" className="cursor-pointer">
              Sunt de acord ca Green Sound Music să folosească aceste date doar pentru a-mi răspunde la cerere.
            </label>{" "}
            Detalii în{" "}
            <Link to="/confidentialitate" className="text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">politica de confidențialitate</Link>.
          </div>
        </div>
        <FieldError id="q-consent-err" msg={errors.consent?.message} />
      </div>

      <div className="flex flex-col gap-3 md:col-span-2">
        <Button type="submit" variant="hero" size="xl" disabled={isSubmitting}
          className="w-full justify-center">
          <CheckCircle2 className="size-5" aria-hidden /> Verifică și continuă spre trimitere
          <ArrowUpRight className="size-4" aria-hidden />
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Următorul pas îți arată mesajul complet. Îl trimiți tu prin WhatsApp sau email, dacă dorești.
          Nu trimitem nimic automat.
        </p>
      </div>
    </form>
  );
}
