import { SITE_URL, business, images, type ImageRef } from "@/data/site";

/** Canonical route URL shared by metadata and Schema.org; avoid duplicate trailing slashes. */
export const canonicalUrl = (path: string) => {
  // Canonical and structured-data URLs identify pages, never tracking/query states.
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  return `${SITE_URL}${pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`}`;
};

type HeadInput = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>[];
  noindex?: boolean;
  image?: ImageRef;
};

/** Escape HTML-significant characters so structured data cannot terminate a script tag. */
export const serializeJsonLd = (data: Record<string, unknown>) =>
  JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (character) =>
    `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`);

/** Builds the per-page head(): unique title/description, OG/Twitter, canonical and JSON-LD. */
export function pageHead({ title, description, path, jsonLd = [], noindex, image = images.concert }: HeadInput) {
  const url = canonicalUrl(path);
  // Use the existing first-party event image (or this page's real image);
  // never fabricate a review, campaign artwork, rating or social preview.
  const imageUrl = new URL(image.src, SITE_URL).href;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: business.name },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: image.alt },
      { property: "og:image:width", content: String(image.w) },
      { property: "og:image:height", content: String(image.h) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: image.alt },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: serializeJsonLd(data),
    })),
  };
}

export const localBusinessLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  slogan: business.tagline,
  url: `${SITE_URL}/`,
  telephone: business.phoneHref.replace(/^tel:/, ""),
  email: business.email,
  foundingDate: String(business.founded),
  description: "Green Sound Music oferă DJ & MC, trupă live, sonorizare, scenotehnică, lumini și producție muzicală pentru evenimente.",
  areaServed: [
    { "@type": "City", name: "Pitești" },
    { "@type": "AdministrativeArea", name: "Județul Argeș" },
    { "@type": "Country", name: "România" },
  ],
  knowsAbout: ["DJ nuntă Pitești", "sonorizare evenimente", "lumini profesionale", "trupă live", "producție muzicală"],

  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    postalCode: business.address.postalCode,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  },
  sameAs: business.socials.map((s) => s.href),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: canonicalUrl(it.path),
  })),
});

export const serviceLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: canonicalUrl(path),
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: { "@type": "City", name: "Pitești" },
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
