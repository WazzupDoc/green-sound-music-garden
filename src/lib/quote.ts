import { z } from "zod";
import { business, services as serviceCatalogue } from "@/data/site";

export const eventTypeOptions = [
  "Nuntă",
  "Botez",
  "Eveniment corporate",
  "Concert / festival",
  "Petrecere privată",
  "Studio înregistrări",
  "Altceva",
] as const;

export const guestOptions = ["Sub 50", "50–100", "100–200", "200–400", "Peste 400", "Nu știu încă"] as const;

/** Romanian phone: 07xx xxx xxx, optionally with +40 / 0040 prefix, spaces, dots or dashes. */
export const RO_PHONE = /^(?:\+40|0040|0)7\d{8}$/;
export const normalizePhone = (v: string) => v.replace(/[\s.\-()]/g, "");

export const ADVICE_SERVICE_LABEL = "Nu știu încă — recomandați-mi";
export const MAX_QUOTE_SERVICES = serviceCatalogue.length;

const allowedServiceLabels = new Set<string>([
  ...serviceCatalogue.map(service => service.formLabel),
  ADVICE_SERVICE_LABEL,
]);

/** Calendar-valid ISO date; blank is allowed because event dates may be undecided. */
const eventDateSchema = z.string().trim().refine((value) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return false;
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() + 1 === month &&
    parsed.getUTCDate() === day;
}, "Introdu o dată calendaristică validă.");

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Scrie-ne numele tău.").max(80, "Maximum 80 de caractere."),
  phone: z
    .string()
    .trim()
    .refine((v) => RO_PHONE.test(normalizePhone(v)), "Introdu un număr de mobil valid, ex. 0766 566 275."),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "Adresa de email nu pare corectă."),
  eventType: z.enum(eventTypeOptions, { errorMap: () => ({ message: "Alege tipul evenimentului." }) }),
  date: eventDateSchema.optional().default(""),
  location: z.string().trim().max(120, "Maximum 120 de caractere.").optional().default(""),
  guests: z.union([z.literal(""), z.enum(guestOptions)]).default(""),
  services: z.array(z.string().refine((label) => allowedServiceLabels.has(label), "Serviciu necunoscut.")).max(MAX_QUOTE_SERVICES, "Poți selecta cel mult opt servicii.").refine((labels) => new Set(labels).size === labels.length, "Elimină serviciile duplicate.").refine((labels) => !(labels.includes(ADVICE_SERVICE_LABEL) && labels.length > 1), "Alege servicii concrete sau opțiunea de recomandare, nu ambele.").default([]),
  message: z.string().trim().max(1500, "Maximum 1500 de caractere.").optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Avem nevoie de acordul tău pentru a te contacta." }) }),
  /** Honeypot: real users never see or fill this. */
  website: z.string().max(0).optional().default(""),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type Quote = z.output<typeof quoteSchema>;

const formatDate = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

export function buildQuoteMessage(q: Quote): string {
  const lines = [
    `Bună ziua! Aș dori o ofertă Green Sound Music.`,
    ``,
    `Nume: ${q.name}`,
    `Telefon: ${q.phone}`,
    q.email && `Email: ${q.email}`,
    `Eveniment: ${q.eventType}`,
    q.date && `Data: ${formatDate(q.date)}`,
    q.location && `Locația: ${q.location}`,
    q.guests && `Invitați: ${q.guests}`,
    q.services.length > 0 && `Servicii: ${q.services.join(", ")}`,
    q.message && ``,
    q.message && q.message,
  ];
  return lines.filter((l): l is string => typeof l === "string").join("\n");
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const mailtoUrl = (q: Quote, text: string) =>
  `mailto:${business.email}?subject=${encodeURIComponent(
    `Cerere ofertă — ${q.eventType}${q.date ? ` — ${formatDate(q.date)}` : ""}`,
  )}&body=${encodeURIComponent(text)}`;

export const defaultWhatsappText = "Bună ziua! Aș dori o ofertă pentru un eveniment.";
