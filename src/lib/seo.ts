import { SITE_URL, business } from "@/data/site";

type HeadInput = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>[];
  noindex?: boolean;
};

/** Builds the per-page head(): unique title/description, OG/Twitter, canonical and JSON-LD. */
export function pageHead({ title, description, path, jsonLd = [], noindex }: HeadInput) {
  const url = `${SITE_URL}${path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`}`;
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

export const localBusinessLd = () => ({
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  slogan: business.tagline,
  url: `${SITE_URL}/`,
  telephone: "+40766566275",
  email: business.email,
  foundingDate: String(business.founded),
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
    item: `${SITE_URL}${it.path === "/" ? "/" : `${it.path}/`}`,
  })),
});

export const serviceLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${SITE_URL}${path}/`,
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
