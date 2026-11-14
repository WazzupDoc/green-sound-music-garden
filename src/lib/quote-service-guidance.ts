import { events, services } from "@/data/site";
import { ADVICE_SERVICE_LABEL, MAX_QUOTE_SERVICES } from "@/lib/quote";

/**
 * Real catalogue-driven suggestions. These are editorial recommendations only,
 * never availability/price claims and never automatically selected.
 */
export function quoteRecommendations(eventType?: string) {
  const event = events.find(item => item.formLabel === eventType);
  if (!event) return [];
  return event.recommended
    .map(({ slug, why }) => {
      const service = services.find(item => item.slug === slug);
      return service ? { slug, label: service.formLabel, name: service.name, why } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .slice(0, 4);
}

/**
 * Prevent contradictory choices: "recommend for me" is a standalone state.
 * Bounded real-service selection always stays inside quoteSchema's limit.
 * No dates, contact details, clicks or device data are persisted or transmitted.
 */
export function toggleQuoteService(current: readonly string[], label: string): string[] {
  const allowed = new Set<string>(services.map(service => service.formLabel));
  const selected = [...new Set(current)].filter(value => value === ADVICE_SERVICE_LABEL || allowed.has(value));
  if (label === ADVICE_SERVICE_LABEL)
    return selected.includes(label) ? [] : [label];
  if (!allowed.has(label)) return selected;
  if (selected.includes(label)) return selected.filter(value => value !== label);
  const actual = selected.filter(value => value !== ADVICE_SERVICE_LABEL);
  return actual.length < MAX_QUOTE_SERVICES ? [...actual, label] : actual;
}
