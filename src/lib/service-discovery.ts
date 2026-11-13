import { getService, services, type ImageRef, type Service, type ServiceSlug } from "@/data/site";

type Connection = { slug: ServiceSlug; why: string };

/**
 * Deliberate editorial pairings across the verified eight-service catalogue.
 * These are optional combinations, not fixed bundles, discounts or bookings.
 * Keeping the choices explicit avoids repeating the first three services
 * on every page regardless of context.
 */
const companions: Record<ServiceSlug, readonly Connection[]> = {
  "dj-mc": [
    { slug: "echipamente-de-sunet-si-lumini", why: "Sonorizare și un design de lumini potrivit ritmului serii." },
    { slug: "trupa", why: "Alternanță între DJ și muzică live pentru momente diferite." },
    { slug: "masina-fum-greu-cu-gheata-carbonica", why: "Un efect vizual pentru dansul mirilor sau momentul tortului." },
  ],
  "trupa": [
    { slug: "echipamente-de-sunet-si-lumini", why: "Sunet, lumini și scenotehnică adaptate unui show live." },
    { slug: "dj-mc", why: "Muzică între seturile trupei și prezentarea momentelor-cheie." },
    { slug: "hostess", why: "Primirea și orientarea invitaților la evenimente." },
  ],
  "echipamente-de-sunet-si-lumini": [
    { slug: "dj-mc", why: "Muzică și MC pentru o producție cu ring de dans." },
    { slug: "trupa", why: "Un show live completat de echipamentele de scenă." },
    { slug: "masina-fum-greu-cu-gheata-carbonica", why: "Efecte vizuale care se pot combina cu iluminatul." },
  ],
  "masina-fum-greu-cu-gheata-carbonica": [
    { slug: "echipamente-de-sunet-si-lumini", why: "Lumina pune în valoare efectul de fum greu." },
    { slug: "dj-mc", why: "Muzică și prezentare pentru momentul special." },
    { slug: "hostess", why: "Primirea invitaților, înainte de momentele spectaculoase." },
  ],
  "studio-inregistrari": [
    { slug: "trupa", why: "De la producție muzicală la interpretare live." },
    { slug: "dj-mc", why: "O altă direcție a serviciilor noastre muzicale." },
    { slug: "echipamente-de-sunet-si-lumini", why: "Soluții tehnice atunci când muzica ajunge pe scenă." },
  ],
  "hostess": [
    { slug: "echipamente-de-sunet-si-lumini", why: "Suport tehnic pentru lansări, conferințe și prezentări." },
    { slug: "dj-mc", why: "Atmosferă muzicală după primirea invitaților." },
    { slug: "start-veselia", why: "Activități și spectacol pentru evenimentele cu copii." },
  ],
  "ursitoare-botez": [
    { slug: "start-veselia", why: "Animație și momente pentru copiii invitați." },
    { slug: "dj-mc", why: "Muzică și coordonarea momentelor de botez." },
    { slug: "hostess", why: "Întâmpinarea și orientarea invitaților." },
  ],
  "start-veselia": [
    { slug: "ursitoare-botez", why: "Un moment cu poveste, potrivit unui botez." },
    { slug: "dj-mc", why: "Muzică și prezentare pentru restul petrecerii." },
    { slug: "echipamente-de-sunet-si-lumini", why: "Sunet și lumini pentru un spectacol pe scenă." },
  ],
};

export function serviceCompanions(slug: ServiceSlug) {
  return companions[slug].map(({ slug: relatedSlug, why }) => ({
    service: getService(relatedSlug),
    why,
  }));
}

/**
 * Treat the page hero as a full photographic appearance. Do not repeat
 * the exact same asset immediately in the detail sidebar or in the gallery.
 * Real videos are already shown in the sidebar, so photos follow below.
 */
export function uniqueServiceGallery(service: Service): { side: ImageRef[]; after: ImageRef[] } {
  const seen = new Set<string>([service.image.src]);
  const otherPhotos = (service.gallery ?? []).filter(image => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
  const side = service.videos.length > 0 ? [] : otherPhotos.slice(0, 2);
  const after = service.videos.length > 0 ? otherPhotos : otherPhotos.slice(2);
  return { side, after };
}

/** Metadata sanity for a future product/content audit; never print customer data. */
export const actualServiceSlugs = services.map(service => service.slug);
